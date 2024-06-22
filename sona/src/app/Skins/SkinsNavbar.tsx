import React from "react";
import SkinContext from "./SharedContext";
import Skeleton from "@mui/joy/Skeleton";

const SkinsNavbar = () => {
  const { skins } = React.useContext(SkinContext);
  if (!skins) {
    return (
      <div className="flex flex-wrap">
        {Array.from(new Array(4)).map((_, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/4 px-2 mb-8">
            <Skeleton variant="rectangular" height={200} className="mb-4" />
            <Skeleton variant="text" />
            <Skeleton variant="text" width="60%" />
          </div>
        ))}
      </div>
    );
  }

  const handleClick = () => {
    console.log("hi");
  };
  return (
    <div name="skins-navbar" className="flex flex-wrap">
      {skins.map((item, index) => (
        <div key={index} className="w-1/2 fle justify-center">
          <img
            src={item.imgURL}
            alt={item.name}
            onClick={handleClick}
            className={`w-full sm:w-[8vw] lg:w-[8vw] xl:w-[8vw] max-w-xs mb-4 ${
              index % 2 === 1
                ? "ml-auto scale-x-[-1] -mr-[3vw] hover:-mr-[1vw]"
                : "ml-[-3vw] hover:ml-[-1vw]"
            } hover:cursor-pointer hover:scale-105 transition-transform duration-1000`}
          />
        </div>
      ))}
    </div>
  );
};

export default SkinsNavbar;
