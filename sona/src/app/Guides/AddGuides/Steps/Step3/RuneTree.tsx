import React, { useState } from "react";
import Image from "next/image";
import RunePrimaryTreeSelection from "./RunePrimaryTreeSelection";
import PrimaryRuneList from "./PrimaryRuneList";
import RuneSecondaryTreeSelection from "./RuneSecondaryTreeSelection";
import SecondaryRuneList from "./SecondaryRuneList";
import RunesBG from "@/assets/runeWallpaper";
import domination from "@/assets/runeWallpaper/Domination.webp";
const RuneTree = ({ runeData }) => {
  const [primaryRune, setPrimaryRune] = useState(null);
  const [secondaryRune, setSecondaryRune] = useState(null);

  const handleSelectPrimaryRune = (rune) => {
    setPrimaryRune(rune);
  };
  return (
    <div>
      <div className="steps-description-header text-gray-200">
        6. Select Runes
      </div>
      {!primaryRune ? (
        <div className="container">
          <div className="p-2">
            <div className="grid grid-cols-5 gap-4">
              {runeData &&
                runeData.map((rune, index) => (
                  <div
                    key={rune.id}
                    onClick={() => handleSelectPrimaryRune(rune)}
                    className={`mb-6 p-4 grayscale hover:filter-none hover:cursor-pointer hover:drop-shadow-lg hover:blur-lg hover:bg-opacity-[0.01]`}
                  >
                    <div className="items-center justify-center mb-4">
                      <Image
                        src={rune.icon}
                        alt={rune.name}
                        width={50}
                        height={50}
                        className="mr-4 transition-all duration-300"
                      />
                      <div className="grid grid-cols-3 items-center gap-1 mb-2 p-2 rounded">
                        {rune.slots.map((slot) =>
                          slot.rowOne.map((keystone) => (
                            <Image
                              src={keystone.icon}
                              alt={keystone.name}
                              width={50}
                              height={50}
                              className="transition-all duration-300"
                            />
                          ))
                        )}
                      </div>
                      <div className="text-lg font-semibold uppercase text-gray-400">
                        {rune.name}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex">
          <div>
            <RunePrimaryTreeSelection
              runeData={runeData}
              primaryRune={primaryRune}
              setPrimaryRune={setPrimaryRune}
              secondaryRune={secondaryRune}
              setSecondaryRune={setSecondaryRune}
            />
            <PrimaryRuneList primaryRune={primaryRune} />
          </div>
          <div>
            <RuneSecondaryTreeSelection
              runeData={runeData}
              secondaryRune={secondaryRune}
              setSecondaryRune={setSecondaryRune}
              primaryRune={primaryRune}
            />
            <SecondaryRuneList secondaryRune={secondaryRune} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RuneTree;
