import { NextRequest, NextResponse } from "next/server";
import cache from "memory-cache";
import axios from "axios";
import {
  getNominee,
  createOrUpdateVote,
  getEventVotingPrice,
} from "@/lib/server_endpoints"; // Ensure these functions handle the DB operations

const ussdCode = "*928*121#";
let userSessionData: { [key: string]: any } = {};

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { sessionID, userID, newSession, msisdn, userData, network } = body;
  console.log("Details from JED", body);

  let message = "";
  let continueSession = true;

  try {
    if (newSession && userData === ussdCode) {
      userSessionData[sessionID] = {
        step: 1,
        voteCount: undefined,
        code: undefined,
        nomineeId: undefined,
        eventId: undefined,
        amount: undefined,
        service: undefined,
        reference: undefined,
      };

      message = "Welcome to JED Platform, What are you doing today?\n";
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
          const nomineeDetails = await getNominee(
            userSessionData[sessionID].code
          );

          if (nomineeDetails) {
            console.log(
              "Nominee Details",
              JSON.stringify(nomineeDetails, null, 2)
            );
            userSessionData[sessionID].nomineeId = nomineeDetails.nominee.id;
            userSessionData[sessionID].eventId =
              nomineeDetails.nominee.event_id;

            message = "Enter the number of votes you want to purchase:\n";
            userSessionData[sessionID].step += 1;
          } else {
            message = "Invalid nominee code. Please try again.";
            continueSession = false;
          }
        } catch (error) {
          message =
            "Error retrieving nominee details.Kindly confirm the nominee code and try again.";
          continueSession = false;
        }
      }
    } else if (!newSession && userSessionData[sessionID]?.step === 3) {
      if (!userData || isNaN(userData)) {
        message = "Invalid selection. Please enter a valid number of votes:";
        userSessionData[sessionID].step = 3;
      } else {
        userSessionData[sessionID].voteCount = userData.trim();

        try {
          const eventDetails = await getEventVotingPrice(
            userSessionData[sessionID].eventId
          );
          if (!eventDetails) {
            message = "Error fetching event details. Please try again.";
            continueSession = false;
          } else {
            const votePrice = eventDetails.data.amount_per_vote;
            const totalAmount =
              Number(userSessionData[sessionID].voteCount) * Number(votePrice);

            // returning the nominee name from the DB
            const voting_response = await getNominee(
              userSessionData[sessionID].code
            );

            console.log(
              "Voting, Response: " + JSON.stringify(voting_response, null, 2)
            );
            const nomineeName = voting_response.nominee.full_name;
            message = `You are purchasing ${userSessionData[sessionID].voteCount} votes for ${nomineeName}.\n`;
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
          const eventDetails = await getEventVotingPrice(
            userSessionData[sessionID].eventId
          );
          if (!eventDetails) {
            message = "Error fetching event details. Please try again.";
            continueSession = false;
          } else {
            const votePrice = eventDetails.data.amount_per_vote;
            const totalAmount =
              Number(userSessionData[sessionID].voteCount) * Number(votePrice);

            const voteData = {
              nominee_id: userSessionData[sessionID].nomineeId,
              event_id: userSessionData[sessionID].eventId,
              count: userSessionData[sessionID].voteCount,
              amount_payable: totalAmount,
            };

            // Create or update the vote in the voting table
            await createOrUpdateVote(voteData);

            message =
              "Prompt will be displayed soon to authorize payment for voting. Thank you!";
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
