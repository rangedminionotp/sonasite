import React from "react";
import Background from "@/app/utils/Background";
import Description from "./Description";
import data from "../../../data/data.json";
import Image from "next/image";
import { Element } from "react-scroll/modules";

const Intro = () => {
  return (
    <div id="intro" name="intro" className=" h-screen overflow-x-hidden">
      <Background />
      <div className="absolute inset-0 flex justify-center items-center">
        <Description />
      </div>
    </div>
  );
};

export default Intro;
