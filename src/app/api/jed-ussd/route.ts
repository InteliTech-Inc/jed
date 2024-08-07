import { NextRequest, NextResponse } from "next/server";

import {
  getNominee,
  getEventVotingPrice,
  juniPay,
} from "@/lib/server_endpoints";
import { generateToken } from "@/lib/token";
import { getVotingPeriodMessage } from "@/lib/utils";
import { format } from "date-fns";
import { getCachedData, setCachedData } from "@/lib/cache";

let userSessionData: { [key: string]: any } = {};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const token = generateToken();

  const { sessionID, userID, newSession, msisdn, userData, network } = body;

  let message = "";
  let continueSession = true;

  try {
    if (newSession) {
      userSessionData[sessionID] = {
        step: 1,
        voteCount: undefined,
        code: undefined,
        nomineeId: undefined,
        nomineeName: undefined,
        categoryName: undefined,
        eventId: undefined,
        amount: undefined,
        service: undefined,
        reference: undefined,
        votingData: undefined,
      };

      message = "Welcome to JED Platform, select an option to continue:\n";
      message += "1. Vote for a nominee\n";
      message += "2. Buy a Ticket (coming soon)\n";
    } else if (!newSession && userSessionData[sessionID]?.step === 1) {
      if (!userData || (userData !== "1" && userData !== "2")) {
        message = "Invalid selection. Please choose an option:\n";
        message += "1. Vote for a nominee\n";
        message += "2. Buy a Ticket (coming soon)\n";
        userSessionData[sessionID].step = 1; // Ensure step remains 1
      } else {
        userSessionData[sessionID].service = userData.trim();

        if (userSessionData[sessionID].service === "1") {
          message = "Please enter the nominee's code to vote for them:";
          userSessionData[sessionID].step += 1;
        } else if (userSessionData[sessionID].service === "2") {
          message = "This feature is not available yet.";
          continueSession = false;
        }
      }
    } else if (!newSession && userSessionData[sessionID]?.step === 2) {
      if (!userData) {
        message = "Invalid selection. Please enter the nominee's code:";
        userSessionData[sessionID].step = 2; // Ensure step remains 2
      } else {
        userSessionData[sessionID].code = userData.toUpperCase();

        try {
          // Check if the data is cached then we use it
          let nomineeDetails = await getCachedData(
            `nominee-${userSessionData[sessionID].code}`
          );
          if (!nomineeDetails) {
            nomineeDetails = await getNominee(userSessionData[sessionID].code);
            await setCachedData(
              `nominee-${userSessionData[sessionID].code}`,
              nomineeDetails
            );
          }

          if (nomineeDetails) {
            const isWithinOpsDate = nomineeDetails.nomineeEvent
              ?.voting_period as { start_date: string; end_date: string };

            const isVotingActive = getVotingPeriodMessage(isWithinOpsDate);

            if (
              isVotingActive?.includes("Voting has ended") ||
              isVotingActive?.includes("Voting starts tomorrow.") ||
              isVotingActive?.includes("Voting has ended") ||
              isVotingActive?.includes(
                `Voting starts on ${format(
                  new Date(isWithinOpsDate.start_date),
                  "do MMMM"
                )}.`
              )
            ) {
              message = isVotingActive as string;
              continueSession = false;
            } else {
              userSessionData[sessionID].nomineeId = nomineeDetails.nominee.id;
              userSessionData[sessionID].eventId =
                nomineeDetails.nominee.event_id;

              message = "Enter the number of votes you want to purchase:\n";
              userSessionData[sessionID].step += 1;
            }
          } else {
            message = "Invalid nominee code. Please try again.";
            continueSession = false;
          }
        } catch (error) {
          message =
            "Error retrieving nominee details. Kindly confirm the nominee code and try again.";
          continueSession = false;
        }
      }
    } else if (!newSession && userSessionData[sessionID]?.step === 3) {
      if (!userData || isNaN(Number(userData))) {
        message = "Invalid selection. Please enter a valid number of votes:";
        userSessionData[sessionID].step = 3;
      } else {
        userSessionData[sessionID].voteCount = userData.trim();

        try {
          // Check if the data is cached then we use it
          let eventDetails = await getCachedData(
            `event-${userSessionData[sessionID].eventId}`
          );

          if (!eventDetails) {
            eventDetails = await getEventVotingPrice(
              userSessionData[sessionID].eventId
            );
            await setCachedData(
              `event-${userSessionData[sessionID].eventId}`,
              eventDetails
            );
          }

          if (!eventDetails) {
            message = "Error fetching event details. Please try again.";
            continueSession = false;
          } else {
            const votePrice = eventDetails.data.amount_per_vote;
            const totalAmount =
              Number(userSessionData[sessionID].voteCount) * Number(votePrice);

            // Check if the data is cached then we use it
            let voting_response = await getCachedData(
              `nominee-${userSessionData[sessionID].code}`
            );
            if (!voting_response) {
              voting_response = await getNominee(
                userSessionData[sessionID].code
              );
              await setCachedData(
                `nominee-${userSessionData[sessionID].code}`,
                voting_response
              );
            }

            userSessionData[sessionID].nomineeName =
              voting_response.nominee.full_name;
            userSessionData[sessionID].categoryName =
              voting_response.nomineeCategory?.category_name;

            message = `You are purchasing ${userSessionData[sessionID].voteCount} votes for ${userSessionData[sessionID].nomineeName}\n`;
            message += `The cost will be ${totalAmount.toFixed(2)} GHS.\n`;
            message += "Please confirm by entering:\n";
            message += "1. Yes\n";
            message += "2. No\n";
            userSessionData[sessionID].step += 1;
          }
        } catch (error) {
          message = "Error retrieving event details. Please try again later.";
          continueSession = false;
        }
      }
    } else if (!newSession && userSessionData[sessionID]?.step === 4) {
      if (!userData || (userData !== "1" && userData !== "2")) {
        message = "Invalid selection. Please confirm by entering:\n";
        message += "1. Yes\n";
        message += "2. No\n";
        userSessionData[sessionID].step = 4;
      } else if (userData === "1") {
        try {
          // Check if the data is cached then we use it
          let eventDetails = await getCachedData(
            `event-${userSessionData[sessionID].eventId}`
          );

          if (!eventDetails) {
            eventDetails = await getEventVotingPrice(
              userSessionData[sessionID].eventId
            );
            await setCachedData(
              `event-${userSessionData[sessionID].eventId}`,
              eventDetails
            );
          }

          if (!eventDetails) {
            message = "Error fetching event details. Please try again.";
            continueSession = false;
          } else {
            const votePrice = eventDetails.data.amount_per_vote;
            const totalAmount =
              Number(userSessionData[sessionID].voteCount) * Number(votePrice);

            const final_amount = Number(totalAmount).toFixed(2);

            if (userSessionData[sessionID].service === "1") {
              const reference = `voting for ${userSessionData[sessionID].nomineeName}`;

              const voteData = {
                nominee_id: userSessionData[sessionID].nomineeId,
                event_id: userSessionData[sessionID].eventId,
                count: userSessionData[sessionID].voteCount,
                amount_payable: Number(final_amount),
              };

              await juniPay(
                totalAmount,
                totalAmount,
                network,
                msisdn,
                reference,
                token,
                voteData
              );
              message =
                "Prompt will be displayed soon to authorize payment for voting. Kindly check your approvals to authorize payment if the popup does not appear.";
            }
          }
          continueSession = false;
          delete userSessionData[sessionID];
        } catch (error) {
          message = "Error processing your vote. Please try again later.";
          continueSession = false;
        }
      } else if (userData === "2") {
        message = "Enter the nominee's code to vote for them";
        userSessionData[sessionID].step = 2;
      }
    } else {
      message = "Invalid entry, please try again later.";
      continueSession = false;
    }
  } catch (error) {
    message = "An error occurred. Please try again later.";
    continueSession = false;
  }

  const response = {
    sessionID,
    msisdn,
    userID,
    message,
    continueSession,
    network,
  };

  return NextResponse.json(response);
}
