import React from "react";
import Image from "next/image";
import images from "@/assets/wallpapers";
import { generateRandomIndex } from "./common";

const Background = () => {
  const [randomNumber, setRandomNumber] = React.useState<number | null>(null);
  const [customBg, setCustomBg] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Get an array of image keys
    const imageKeys = Object.keys(images);

    // Generate a random index
    const randomIndex = generateRandomIndex(imageKeys.length);

    // Get the random image key
    const randomImageKey = imageKeys[randomIndex];
    const savedBg = localStorage.getItem(`curr_bg`);
    const savedRandomNumber = localStorage.getItem(`bg_randomNumber`);
    const savedTimestamp = localStorage.getItem(`bg_timestamp`);
    const hours = 1;
    const hour = 60 * 60 * 1000;
    const now = new Date().getTime();
    const oneDayInMilliseconds = hours * hour;

    if (
      savedBg &&
      savedRandomNumber &&
      savedTimestamp &&
      now - parseInt(savedTimestamp, 10) < oneDayInMilliseconds
    ) {
      setCustomBg(savedBg);
      setRandomNumber(parseInt(savedRandomNumber, 10));
    } else {
      localStorage.setItem(`curr_bg`, randomImageKey);
      localStorage.setItem(`bg_randomNumber`, randomIndex.toString());
      localStorage.setItem(`bg_timestamp`, now.toString());
    }
  }, [setRandomNumber, setCustomBg]);

  if (randomNumber) {
    return (
      <div className="w-full h-screen">
        <div className="absolute top-0 left-0 flex w-full h-full">
          <Image
            alt=""
            src={customBg ? images[customBg] : images[randomImageKey]}
            // layout="fill"
            // objectFit="cover"
            priority
            className="object-cover"
          />
        </div>
      </div>
    );
  } else {
    return null; // Return null if no valid image
  }
};

export default Background;
