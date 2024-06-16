"use client";

import React, { useEffect, useState } from "react";

export default function NetworkStatus() {
  // const [status, setStatus] = useState(navigator.onLine ? "online" : "offline");
  // useEffect(() => {
  //   setStatus(navigator.onLine ? "online" : "offline");
  //   const goOnline = () => setStatus("online");
  //   const goOffline = () => setStatus("offline");
  //   window.addEventListener("online", goOnline);
  //   window.addEventListener("offline", goOffline);
  //   return () => {
  //     window.removeEventListener("online", goOnline);
  //     window.removeEventListener("offline", goOffline);
  //   };
  // }, []);
  // const statusColor = {
  //   ellipse: status === "online" ? "bg-green-500 " : "bg-red-500",
  //   text: status === "online" ? "text-green-500 " : "text-red-500",
  //   container: status === "online" ? "bg-accent " : "bg-red-100",
  // };
  // return (
  //   <div
  //     className={`hidden md:flex items-center ${statusColor.container} rounded-lg justify-center space-x-2 py-1 w-fit px-4 `}
  //   >
  //     <span
  //       className={`w-2 aspect-square rounded-full ${statusColor.ellipse}`}
  //     ></span>
  //     <p className={`${statusColor.text} capitalize text-sm`}>{status}</p>
  //   </div>
  // );
}
