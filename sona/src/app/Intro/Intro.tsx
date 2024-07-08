import Background from "@/app/utils/Background";
import React from "react";
import Description from "./Description";

const Intro = () => {
  return (
    <div id="intro"  className=" h-screen w-full ">
      <Background />
      <div className="absolute inset-0 flex justify-center items-center">
        <Description />
      </div>
    </div>
  );
};

export default Intro;
