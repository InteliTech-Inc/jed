import React from "react";
import WithdrawalForm from "./components/withdrawal_form";
import TotalWithdrawal from "./components/total_withdrawal";

type Props = {};

export default function WithdrawalPage({}: Props) {
  return (
    <div className="p-4 w-full max-w-screen-md mx-auto">
      <div className="mt-6 mb-4 flex flex-col gap-4 lg:flex-row justify-between">
        <div>
          <p className="text-4xl text-neutral-700 mb-2 font-semibold">
            Request Payouts
          </p>
          <p className=" text-neutral-600">
            Fill the form below to request for payouts.
          </p>
        </div>
        <TotalWithdrawal />
      </div>
      <WithdrawalForm />
    </div>
  );
}
