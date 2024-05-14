import React from "react";
import Image from "next/image";
import images from "@/assets/wallpapers";

const Background = () => {
  // Get an array of image keys
  const imageKeys = Object.keys(images);

  // Generate a random index
  const randomIndex = Math.floor(Math.random() * imageKeys.length);

  // Get the random image key
  const randomImageKey = imageKeys[randomIndex];
  if (randomImageKey && images[randomImageKey]) {
    return (
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <Image
          alt={""}
          src={images[randomImageKey]}
          layout="fill"
          objectFit="cover"
          className="object-cover"
        />
      </div>
    );
  } else {
    return null; // Return null if no valid image
  }
};

export default Background;
