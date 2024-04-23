import React from "react";
import Image from "next/image";
import images from "../../assets/wallpapers";

const Background = () => {
  // Get an array of image keys
  const imageKeys = Object.keys(images);

  // Generate a random index
  const randomIndex = Math.floor(Math.random() * imageKeys.length);

  // Get the random image key
  const randomImageKey = imageKeys[randomIndex];
  if (randomImageKey && images[randomImageKey]) {
    return (
      <div className="mt-[4.1rem] w-full absolute top-0 left-0 sm:overflow-hidden ">
        <Image
          src={images[randomImageKey]}
          alt={randomImageKey}
          className="object-cover w-full h-full sm:object-contain"
        />
      </div>
    );
  }
};

export default Background;
