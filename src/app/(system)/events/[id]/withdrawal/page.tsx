import React from "react";
import WithdrawalForm from "./components/withdrawal_form";
import TotalWithdrawal from "./components/total_withdrawal";

type Props = {};

export default function WithdrawalPage({}: Props) {
  return (
    <div className="p-4">
      <div className=" mb-4 flex flex-col ">
        <h1 className=" text-4xl text-neutral-700 mb-2 font-semibold">
          Request for Payouts
        </h1>
        <p className=" text-neutral-600">
          Fill the form below to request for payouts.
        </p>
        <TotalWithdrawal />
      </div>
      <WithdrawalForm />
    </div>
  );
}
