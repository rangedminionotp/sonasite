import React from "react";
import Image from "next/image";

const RunesList = ({ runeData }) => {
  return (
    <div>
      {runeData &&
        runeData.map((rune) => (
          <div key={rune.id} className="w-auto md:w-1/3 lg:w-1/4 p-2">
            <Image src={rune.icon} alt={rune.name} width={32} height={32} />
            <div>{rune.name}</div>
          </div>
        ))}
    </div>
  );
};

export default RunesList;
