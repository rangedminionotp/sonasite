import React from "react";
import R from "../../../assets/abilities/Crescendo.webp";
import Image from "next/image";
import AbilitiesContext from "./SharedContext";

const UltAb = () => {
  const toggleVisibility = (divIndex) => {
    setDivVisibility((prevState) => ({
      ...prevState,
      [`div${divIndex}`]: !prevState[`div${divIndex}`],
    }));
  };
  const { divVisibility, setDivVisibility } =
    React.useContext(AbilitiesContext);

  return (
    <div className="flex space-x-6">
      <div name={`R-icon`} key={`R-icon`} className="hover:cursor-pointer">
        <Image
          src={R}
          width={80}
          height={80}
          onClick={() => toggleVisibility(3)}
          className="object-cover border border-gray-300"
        />
      </div>
    </div>
  );
};

export default UltAb;
