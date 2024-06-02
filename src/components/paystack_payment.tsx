"use client";
import React from "react";
import { usePaystackPayment } from "react-paystack";
import { Button } from "./ui/button";
import { onSuccessReference } from "@/types/types";

const STATIC_PRICE = 50;
const conversionBy100 = 100;
const charge = (STATIC_PRICE * conversionBy100) / 100;
const final_rate = STATIC_PRICE * conversionBy100 + charge;

export default function PaystackPayment() {
  const config = {
    reference: new Date().getTime().toString(),
    email: "jedvotes@gmail.com",
    currency: "GHS",
    amount: final_rate,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
  };

  // you can call this function anything
  const onSuccess = (reference: onSuccessReference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const initializePayment = usePaystackPayment(config);
  return (
    <div>
      <Button
        onClick={() => {
          initializePayment({
            onSuccess,
            onClose,
          });
        }}
      >
        Send Payment
      </Button>
    </div>
  );
}
