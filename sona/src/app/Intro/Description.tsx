import React from "react";
import data from "../../../data/data.json";

const Description = () => {
  return (
    <div className="text-center mt-4 max-w-[100%] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]">
      <div className="font-bold text-[#FFD700] drop-shadow-lg description-header">
        {data.name.toUpperCase()}
      </div>
      <div className="font-bold text-white italic drop-shadow-lg description-subheader">
        {data.title.toUpperCase()}
      </div>
      <div className=" text-white drop-shadow-xl text-shadow-lg mt-9 link-text">
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
