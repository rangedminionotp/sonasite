import React from "react";
import Image from "next/image";

const RuneRow = ({
  runes,
  selectedRune,
  setSelectedRune,
  iconWidth,
  iconHeight,
  mode,
  row,
}) => {
  const handleClick = (rune) => {
    const currIndex = rune.index;
    // if (!bool) {
    //   if (selectedRune.length < 2) {
    //     setSelectedRune([rune, ...selectedRune]);
    //   } else {
    //     setSelectedRune([rune, ...selectedRune.slice(0, 1)]);
    //   }
    //   setBool(true);
    // } else {
    //   const indexOne = selectedRune[0].index;
    //   const indexTwo = selectedRune[1].index;
    //   if (row.includes(indexOne)) {
    //     setSelectedRune([rune, ...selectedRune.slice(1)]);
    //   } else if (row.includes(indexTwo)) {
    //     setSelectedRune([rune, ...selectedRune.slice(0, 1)]);
    //   }
    // }
    if (selectedRune.length === 0) {
      setSelectedRune([rune]);
    } else if (selectedRune.length < 2) {
      const indexOne = selectedRune[0].index;
      if (row.includes(indexOne)) {
        setSelectedRune([rune, ...selectedRune.slice(1)]);
      } else {
        setSelectedRune([rune, ...selectedRune]);
      }
    } else {
      const indexOne = selectedRune[0].index;
      const indexTwo = selectedRune[1].index;
      if (row.includes(indexOne)) {
        setSelectedRune([rune, ...selectedRune.slice(1)]);
      } else if (row.includes(indexTwo)) {
        setSelectedRune([rune, ...selectedRune.slice(0, 1)]);
      } else {
        setSelectedRune([rune, ...selectedRune.slice(0, 1)]);
      }
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
