import Image from "next/image";
import React from "react";
import LogoImage from "../../public/images/logo.png";

export default function Logo() {
  return <Image src={LogoImage} alt="Logo" width={80} height={80} />;
}
