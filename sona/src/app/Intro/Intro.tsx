import React from "react";
import Background from "./Background";
import Description from "./Description";
import data from "../../../data/data.json";
import supIcon from "../../../assets/supIcon.png";
import Image from "next/image";
import { Element } from "react-scroll/modules";

const Intro = () => {
  return (
    <div id="intro" name="intro" className="w-full h-screen relative">
      <Background />
      {/* decoration */}
      <div className="absolute inset-0 flex justify-center items-center">
        {/* <div className="relative">
          <div className="absolute top-0 left-[-15em] w-[20em] h-[0.1em] bg-gray-200"></div>
          <div className="absolute top-0 left-[-15em] w-[0.1em] h-[35em] bg-gray-200"></div>
          <div className="absolute top-[10em] left-[-10em] w-[57em] h-[0.1em] bg-gray-200"></div>
        </div> */}
        <Description />
        {/* decoration */}
        {/* <div className="relative">
          <div className="absolute top-0 left-[-5em] w-[20em] h-[0.1em] bg-gray-200"></div>
          <div className="absolute top-0 left-[15em] w-[0.1em] h-[35em] bg-gray-200"></div>
          <div className="border-r border-gray-500 h-2/3"></div>
        </div>
      </div>
      <div className="relative inset-0 top-[45em] left-[18em] flex justify-center items-center">
        <p className="w-1/5 font-Consolas text-white font-bold">
          {data.bgstory}
        </p>
      </div>
      <div className="relative inset-0 top-[35em] left-[0em] flex justify-center items-center">
        <Image src={supIcon} className="w-16 h-16" />
        {data.role.map((role, index) => (
          <React.Fragment key={index}>
            <p className="w-1/4 font-Consolas font-bold text-[#FFD700]">
              {role.toUpperCase()}
            </p>
          </React.Fragment>
        ))}*/}
      </div>
    </div>
  );
};

export default Intro;
