import React from "react";
import Image from "next/image";

const RunePrimaryTreeSelection = ({
  runeData,
  primaryRune,
  setPrimaryRune,
  setSecondaryRune,
  secondaryRune,
}) => {
  const handleRuneSelection = (rune) => {
    if (secondaryRune && secondaryRune.id === rune.id) {
      setSecondaryRune(null);
    }
    setPrimaryRune(rune);
  };
  return (
    <div className="flex flex-wrap gap-1">
      {runeData.map((rune) => (
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full role-item bg-transparent ${
            rune.name === primaryRune.name ? "border-2 border-blue-500" : ""
          }`}
        >
          <Image
            src={rune.icon}
            alt={rune.name}
            width={25}
            height={25}
            onClick={() => handleRuneSelection(rune)}
          />
        </div>
      ))}
    </div>
  );
};

export default RunePrimaryTreeSelection;
