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
        votePrice: undefined, // Store vote price here
        service: undefined,
        reference: undefined,
        votingData: undefined,
      };

      message =
        "Welcome to JED Event Management Platform\n \nPlease enter nominee code to vote:";
    } else if (!newSession && userSessionData[sessionID]?.step === 1) {
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
    } else if (!newSession && userSessionData[sessionID]?.step === 2) {
      if (!userData || isNaN(Number(userData))) {
        message = "Invalid selection. Please enter a valid number of votes:";
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

            // Store votePrice in session data
            userSessionData[sessionID].votePrice = votePrice;

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

            const final_amount = Number(totalAmount).toFixed(2);

            // Show the summary and ask for confirmation
            message = `SUMMARY\n
${userSessionData[sessionID].nomineeName}\n${userSessionData[sessionID].categoryName} - ${userSessionData[sessionID].code}\nNo. of votes: ${userSessionData[sessionID].voteCount}\nTotal Amount: GHS${final_amount}\n
Press\n1 Confirm payment\n2 Cancel.\n \nPowered by InteliTech Inc.`;

            userSessionData[sessionID].step = 3; // Move to the confirmation step
          }
        } catch (error) {
          message = "An error occurred. Please try again later.";
          continueSession = false;
        }
      }
    } else if (!newSession && userSessionData[sessionID]?.step === 3) {
      if (userData === "1") {
        message =
          "Kindly wait for the authorization prompt to complete payment. if it doesn't please dial *170# on MTN to complete payment.";

        // Retrieve votePrice from session data
        const votePrice = userSessionData[sessionID].votePrice;

        const totalAmount =
          Number(userSessionData[sessionID].voteCount) * Number(votePrice);

        const voteData = {
          nominee_id: userSessionData[sessionID].nomineeId,
          event_id: userSessionData[sessionID].eventId,
          count: userSessionData[sessionID].voteCount,
          amount_payable: Number(totalAmount),
        };

        const reference = `voting for ${userSessionData[sessionID].nomineeName} - ${userSessionData[sessionID].code}`;

        setTimeout(async () => {
          await juniPay(
            voteData.amount_payable,
            voteData.amount_payable,
            network,
            msisdn,
            reference,
            token,
            voteData
          );
        }, 1000);

        continueSession = false;
        delete userSessionData[sessionID];
        return NextResponse.json({
          sessionID,
          msisdn,
          userID,
          message,
          network,
          continueSession: false,
        });
      } else if (userData === "2") {
        message = "Payment canceled.\nThank you for choosing JED.";
        continueSession = false;
        delete userSessionData[sessionID];
      } else {
        message =
          "Invalid selection. Please press 1 to confirm or 2 to cancel.";
      }
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
