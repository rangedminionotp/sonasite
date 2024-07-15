import React from "react";
import Image from "next/image";
const RuneSecondaryTreeSelection = ({
  runeData,
  secondaryRune,
  setSecondaryRune,
  primaryRune,
}) => {
  return (
    <div className="grid grid-cols-5 gap-2">
      {runeData.map((rune) =>
        rune.name === primaryRune.name ? null : (
          <div key={rune.id}>
            <Image
              src={rune.icon}
              alt={rune.name}
              width={50}
              height={50}
              onClick={() => setSecondaryRune(rune)}
              className={`${
                secondaryRune && rune.name === secondaryRune.name
                  ? "border-2 border-blue-500 rounded-full"
                  : ""
              }
              }`}
            />
          </div>
        )
      )}
    </div>
  );
};

export default RuneSecondaryTreeSelection;
