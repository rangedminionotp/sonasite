import React from "react";
import data from "../../../data/data.json";

const Description = () => {
  return (
    <div className="text-center mt-4 max-w-[100%] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]">
      <div className="font-bold text-[#FFD700] drop-shadow-lg text-6xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl">
        {data.name.toUpperCase()}
      </div>
      <div className="font-bold text-white italic drop-shadow-lg text-3xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-6xl">
        {data.title.toUpperCase()}
      </div>
      {/* <div className="relative">
        <div className="absolute max-w-[100%] top-[2em] left-[-5em] w-[46em] h-[0.1em] bg-gray-200"></div>
      </div> */}
      <div className="text-md text-white drop-shadow-xl text-shadow-lg mt-9 sm:text-lg md:text-xl lg:text-2xl xl:text-2xl">
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
