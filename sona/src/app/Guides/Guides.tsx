import React from "react";
import Background from "@/app/utils/Background";
import Description from "./Description";
import ByRoleMenu from "./ByRoleMenu";
const Guides = () => {
  return (
    <div name="guides" className="h-screen w-full relative overflow-x-hidden">
      <div className="absolute inset-0 flex justify-center items-center">
        <Description />
      </div>
      <div className="absolute inset-0 flex justify-center items-center">
        <ByRoleMenu />
      </div>
    </div>
  );
};

export default Guides;
