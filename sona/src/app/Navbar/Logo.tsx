import React from "react";
import pic from "../../../assets/thuglife.png";
import Image from "next/image";

const Logo = () => {
  const randomNumber = Math.random();

  return <Image src={pic} alt="Logo Image" width={50} height={50} />;
};

export default Logo;
