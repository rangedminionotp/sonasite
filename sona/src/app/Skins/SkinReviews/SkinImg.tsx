import React from "react";
import Image from "next/image";
const SkinImg = ({ imgUrl }) => {
  return (
    <div>
      <Image src={imgUrl} alt={skinName} width={100} height={100} />
    </div>
  );
};

export default SkinImg;
