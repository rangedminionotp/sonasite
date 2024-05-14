import React from "react";

const AbilitiesVideo = ({ index }) => {
  const videos = [
    "https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0037/ability_0037_Q1.webm",
    "https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0037/ability_0037_W1.webm",
    "https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0037/ability_0037_E1.webm",
    "https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0037/ability_0037_R1.webm",
    "https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0037/ability_0037_P1.webm",
  ];

  return (
    <div>
      <video preload="metadata" controls loop muted autoPlay>
        <source src={videos[index]} type="video/webm" />
        {/* Add additional source elements for other video formats if necessary */}
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default AbilitiesVideo;
