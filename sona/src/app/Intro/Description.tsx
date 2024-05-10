import React from "react";
import data from "../../../data/data.json";

const Description = () => {
  return (
    <div className="text-center mt-4">
      <div className="text-8xl font-bold text-[#FFD700] drop-shadow-lg sm: text-md">
        {data.name.toUpperCase()}
      </div>
      <div className="text-5xl font-bold text-white italic drop-shadow-lg sm:text-md">
        {data.title.toUpperCase()}
      </div>
      <div className="relative">
        <div className="absolute top-[2em] left-[-5em] w-[46em] h-[0.1em] bg-gray-200"></div>
      </div>
      <div className="text-2xl  text-white drop-shadow-xl text-shadow-lg sm: text-md mt-9">
        <a
          href={data.wiki}
          target="_blank"
          rel="noopener noreferrer"
          className="mr-4 hover:text-[#be4db6] hover:font-bold "
        >
          Wiki
        </a>
        <a
          href={data.reddit}
          target="_blank"
          rel="noopener noreferrer"
          className="mr-4 hover:text-[#be4db6] hover:font-bold "
        >
          Reddit
        </a>
        <a
          href={data.opgg}
          target="_blank"
          rel="noopener noreferrer"
          className="mr-4 hover:text-[#be4db6] hover:font-bold"
        >
          op.gg
        </a>
        <a
          href={data.ugg}
          target="_blank"
          rel="noopener noreferrer"
          className="mr-4 hover:text-[#be4db6] hover:font-bold"
        >
          u.gg
        </a>
        <a
          href={data.probuildsnet}
          target="_blank"
          rel="noopener noreferrer"
          className="mr-4 hover:text-[#be4db6] hover:font-bold"
        >
          probuild
        </a>
        <a
          href={data.discord}
          target="_blank"
          rel="noopener noreferrer"
          className="mr-4 hover:text-[#be4db6] hover:font-bold"
        >
          Discord
        </a>
      </div>
    </div>
  );
};

export default Description;
