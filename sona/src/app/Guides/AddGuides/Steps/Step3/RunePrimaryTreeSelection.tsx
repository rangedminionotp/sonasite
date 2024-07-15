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
    <div className="grid grid-cols-5 gap-2">
      {runeData.map((rune) => (
        <div key={rune.id}>
          <Image
            src={rune.icon}
            alt={rune.name}
            width={50}
            height={50}
            onClick={() => handleRuneSelection(rune)}
            className={`${
              rune.name === primaryRune.name
                ? "border-2 border-blue-500 rounded-full"
                : ""
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default RunePrimaryTreeSelection;
