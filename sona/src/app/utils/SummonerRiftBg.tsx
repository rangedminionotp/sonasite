import React from "react";
import images from "@/assets/srWallpapers";
import Image from "next/image";
import { generateRandomIndex } from "./common";

const SummonerRiftBg = () => {
  const [randomNumber, setRandomNumber] = React.useState<number | null>(null);
  const [customBg, setCustomBg] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Get an array of image keys
    const imageKeys = Object.keys(images);

    // Generate a random index
    const randomIndex = generateRandomIndex(imageKeys.length);

    // Get the random image key
    const randomImageKey = imageKeys[randomIndex];
    const savedBg = localStorage.getItem("curr_srbg");
    const savedRandomNumber = localStorage.getItem("srbg_randomNumber");
    const savedTimestamp = localStorage.getItem("srbg_timestamp");

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
      localStorage.setItem("curr_srbg", randomImageKey);
      localStorage.setItem("srbg_randomNumber", randomIndex.toString());
      localStorage.setItem("srbg_timestamp", now.toString());
      setCustomBg(randomImageKey);
      setRandomNumber(randomIndex);
    }
  }, [setRandomNumber, setCustomBg]);

  return (
    <div className="w-full h-screen relative">
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center flex">
        {customBg && (
          <Image
            alt=""
            src={images[customBg]}
            layout="fill"
            objectFit="cover"
            priority
            className="opacity-30 backdrop-blur-lg"
          />
        )}
      </div>
    </div>
  );
};

export default SummonerRiftBg;
