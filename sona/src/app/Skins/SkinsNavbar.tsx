import React from "react";
import SkinContext from "./SharedContext";
import Skeleton from "@mui/joy/Skeleton";
import { Link } from "react-scroll";
import Tooltip from "@mui/joy/Tooltip";
import Image from "next/image";
const SkinsNavbar = ({ setActiveSkin }) => {
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
  return (
    <div
      name="skins-navbar"
      className="flex flex-wrap absolute w-full overflow-x-hidden"
    >
      {skins.map((item, index) => (
        <div
          key={index}
          className={`w-1/2 flex ${
            index % 2 === 0
              ? "justify-start right-[4%] hover:right-[1%]"
              : "justify-end left-[4%] hover:left-[1%]"
          } relative`}
        >
          <div onClick={() => setActiveSkin(item.info.id)}>
            <Tooltip title={item.name}>
              <Image
                src={item.imgURL}
                alt={item.name}
                width={100}
                height={100}
                className="w-[30vw] xxxs:w-[30vw] xxs:w-[30vw] xs:w-[20vw] grid sm:w-[8vw] md:w-[18vw] lg:w-[12vw] xl:w-[10vw] max-w-xs mb-1 hover:cursor-pointer hover:scale-105 transition-transform duration-1000"
              />
            </Tooltip>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkinsNavbar;
