import React from "react";
import Image from "next/image";
const SkinImg = ({ imgUrl }) => {
  return (
    <div className="w-full h-full relative">
      <Image
        src={imgUrl}
        alt={imgUrl}
        className="opacity-70 object-cover"
        fill
      />
    </div>
  );
};

export default SkinImg;
