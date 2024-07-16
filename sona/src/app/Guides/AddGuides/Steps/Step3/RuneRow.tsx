import React from "react";
import Image from "next/image";

const RuneRow = ({
  runes,
  selectedRune,
  setSelectedRune,
  iconWidth,
  iconHeight,
}) => {
  return (
    <div className="flex flex-wrap gap-8 mt-3">
      {runes.map((rune) => (
        <div
          key={rune.id}
          className="flex justify-center items-center"
          onClick={() => setSelectedRune(rune)}
        >
          <Image
            src={rune.icon}
            alt={rune.name}
            width={iconWidth}
            height={iconHeight}
            className={`hover:scale-110 transition-all duration-300 ${
              selectedRune && selectedRune.id !== rune.id ? "grayscale" : ""
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default RuneRow;
