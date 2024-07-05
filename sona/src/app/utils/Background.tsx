import React from "react";
import Image from "next/image";
import images from "@/assets/wallpapers";

const Background = () => {
  const [randomNumber, setRandomNumber] = React.useState<number>(0);
  const [customBg, setCustomBg] = React.useState<string>(null);

  // Get an array of image keys
  const imageKeys = Object.keys(images);

  // Generate a random index
  const randomIndex = Math.floor(Math.random() * imageKeys.length);

  // Get the random image key
  const randomImageKey = imageKeys[randomIndex];

  React.useEffect(() => {
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
  }, []);

  if (randomImageKey && images[randomImageKey]) {
    return (
      <div className="absolute top-0 left-0 bg-cover bg-center flex w-screen h-screen">
        <Image
          alt={""}
          src={customBg ? images[customBg] : images[randomImageKey]}
          layout="responsive"
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
