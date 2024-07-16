import React from "react";
import Image from "next/image";

const RuneRow = ({
  runes,
  selectedRune,
  setSelectedRune,
  iconWidth,
  iconHeight,
  mode,
}) => {
  const handleClick = (rune) => {
    const rowone = [3, 4, 5];
    const rowtwo = [6, 7, 8];
    const rowthree = [9, 10, 11];
    const rows = [rowone, rowtwo, rowthree];
    const currIndex = rune.index;

    // check if selectedrune.index and currindex is in the same row

    if (selectedRune.length < 2) {
      setSelectedRune([rune, ...selectedRune]);
    } else {
      setSelectedRune([rune, ...selectedRune.slice(0, 1)]);
    }
  };

  return mode === "primary" ? (
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
  ) : (
    <div className="flex flex-wrap gap-8 mt-3">
      {runes.map((rune) => (
        <div
          key={rune.id}
          className="flex justify-center items-center"
          onClick={() => handleClick(rune)}
        >
          <Image
            src={rune.icon}
            alt={rune.name}
            width={iconWidth}
            height={iconHeight}
            className={`hover:scale-110 transition-all duration-300 ${
              selectedRune.length >= 1 &&
              (selectedRune[0].id === rune.id ||
                (selectedRune[1] && selectedRune[1].id === rune.id))
                ? ""
                : "grayscale"
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default RuneRow;
