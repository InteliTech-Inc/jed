import React, { useEffect, useState } from "react";

export default function CheckNetwork() {
  const [status, setStatus] = useState("offline");

  useEffect(() => {
    setStatus(navigator.onLine ? "online" : "offline");

    const goOnline = () => setStatus("online");
    const goOffline = () => setStatus("offline");

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  const statusColor = {
    ellipse: status === "online" ? "bg-green-500 " : "bg-red-500",
    text: status === "online" ? "text-green-500 " : "text-red-500",
    container: status === "online" ? "bg-accent " : "bg-red-100",
  };

  return (
    <div
      className={`hidden md:flex w-[7rem] items-center ${statusColor.container} rounded-full justify-center space-x-2 py-2 `}
    >
      <span className={`h-3 w-3 rounded-full ${statusColor.ellipse}`}></span>
      <p
        className={`font-bold ${statusColor.text} uppercase text-sm tracking-wider`}
      >
        {status}
      </p>
    </div>
  );
}
