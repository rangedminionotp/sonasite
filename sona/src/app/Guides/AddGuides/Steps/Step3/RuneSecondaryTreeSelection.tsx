import React from "react";
import Image from "next/image";
const RuneSecondaryTreeSelection = ({
  runeData,
  secondaryRune,
  setSecondaryRune,
  primaryRune,
}) => {
  return (
    <div className="flex flex-wrap gap-1">
      {runeData.map((rune) =>
        rune.name === primaryRune.name ? null : (
          <div
            key={rune.id}
            className={`flex items-center justify-center w-10 h-10 rounded-full role-item bg-transparent ${
              secondaryRune && rune.name === secondaryRune.name
                ? "border-2 border-blue-500"
                : ""
            }`}
          >
            <Image
              src={rune.icon}
              alt={rune.name}
              width={25}
              height={25}
              onClick={() => setSecondaryRune(rune)}
            />
          </div>
        )
      )}
    </div>
  );
};

export default RuneSecondaryTreeSelection;
