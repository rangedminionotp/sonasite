import React, { useContext } from "react";
import { StepThreeContext } from "../../types";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";

const AddedRuneListDisplay = () => {
  const StepThreeCtx = useContext(StepThreeContext);
  const handleDeleteRune = (index) => {
    StepThreeCtx.setRuneSets((prevRuneSets) =>
      prevRuneSets.filter((_, i) => i !== index)
    );
  };
  return (
    <div>
      {StepThreeCtx.runeSets.map((runeSet, index) => (
        <div
          key={runeSet.id}
          className="p-4 flex justify-between border backdrop-blur-lg bg-white/30 border-gray-800 shadow-md mb-4"
        >
          <div className="flex flex-wrap gap-2">
            <div className="w-[200px] h-[40px] overflow-hidden whitespace-nowrap text-ellipsis overflow-x-auto">
              {runeSet.title}
            </div>
            <div className="flex flex-wrap">
              <Image
                src={runeSet.primaryRune.icon}
                alt={runeSet.primaryRune.name}
                width={35}
                height={35}
              />
              {runeSet.primaryRunes.map((rune) => {
                return (
                  <div key={rune.id}>
                    <Image
                      src={rune.icon}
                      alt={rune.name}
                      width={35}
                      height={35}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap">
              <Image
                src={runeSet.secondaryRune.icon}
                alt={runeSet.secondaryRune.name}
                width={35}
                height={35}
              />
              {runeSet.secondaryRunes.map((rune) => {
                return (
                  <div key={rune.id}>
                    <Image
                      src={rune.icon}
                      alt={rune.name}
                      width={35}
                      height={35}
                    />
                  </div>
                );
              })}
            </div>
            <div className="hover:cursor-pointer justify-end">
              <DeleteIcon onClick={() => handleDeleteRune(index)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddedRuneListDisplay;
