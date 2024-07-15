import React from "react";
import Image from "next/image";

const RunesList = ({ runeData }) => {
  return (
    <div className="container mx-auto w-full">
      <div className="p-2">
        <div className="steps-description-header text-gray-200">
          6. Select Runes
        </div>
        <div className="grid grid-cols-5 gap-4">
          {runeData &&
            runeData.map((rune) => (
              <div
                key={rune.id}
                className="mb-6 p-4 bg-white shadow rounded-lg"
              >
                <div className="flex items-center mb-4">
                  <Image
                    src={rune.icon}
                    alt={rune.name}
                    width={50}
                    height={50}
                    className="mr-4"
                  />
                  <div className="text-lg font-semibold">{rune.name}</div>
                </div>
                {rune.slots.map((slot) => (
                  <div
                    key={rune.id}
                    className="grid grid-cols-3 items-center gap-4 mb-2 p-2 bg-gray-100 rounded"
                  >
                    {slot.runes.map((rune) => (
                      <Image
                        src={rune.icon}
                        alt={rune.name}
                        width={50}
                        height={50}
                        className="grid grid-cols-3"
                      />
                    ))}
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RunesList;
