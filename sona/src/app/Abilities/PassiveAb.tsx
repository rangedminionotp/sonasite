import React from "react";
import passive from "../../../assets/abilities/Power_Chord.webp";
import Image from "next/image";
import AbilitiesContext from "./SharedContext";

const PassiveAb = () => {
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
      <div
        name={`passive-icon`}
        key={`passive-icon`}
        className="hover:cursor-pointer"
      >
        <Image
          width={80} // Adjust the width as needed
          height={80}
          src={passive}
          onClick={() => toggleVisibility(4)}
          className="object-cover border border-gray-300"
        />
      </div>
    </div>
  );
};

export default PassiveAb;
