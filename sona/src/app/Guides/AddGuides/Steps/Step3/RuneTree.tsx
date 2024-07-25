import React, { useState, useContext } from "react";
import Image from "next/image";
import RunePrimaryTreeSelection from "./RunePrimaryTreeSelection";
import PrimaryRuneList from "./PrimaryRuneList";
import RuneSecondaryTreeSelection from "./RuneSecondaryTreeSelection";
import SecondaryRuneList from "./SecondaryRuneList";
// import RunesBG from "@/assets/runeWallpaper";
// import domination from "@/assets/runeWallpaper/Domination.webp";
import RuneListsDisplay from "./RuneListsDisplay";

import FlatRunes from "./FlatRunes";
import RuneDescription from "./RuneDescription";
import Button from "@mui/joy/Button";
import { StepThreeContext } from "../../types";
import { v4 as uuidv4 } from "uuid";

const RuneTree = ({ runeData, setAddRunes, addRunes }) => {
  const [primaryRune, setPrimaryRune] = useState(null);
  const [secondaryRune, setSecondaryRune] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // primary rune selection
  const [selectedRowOne, setSelectedRowOne] = useState(null);
  const [selectedRowTwo, setSelectedRowTwo] = useState(null);
  const [selectedRowThree, setSelectedRowThree] = useState(null);
  const [selectedRowFour, setSelectedRowFour] = useState(null);

  // secondary rune selection
  const [selectedOne, setSelectedOne] = useState<Rune[]>([]);

  // flat runes
  const [selectedRuneOne, setSelectedRuneOne] = useState<string | null>(null);
  const [selectedRuneTwo, setSelectedRuneTwo] = useState<string | null>(null);
  const [selectedRuneThree, setSelectedRuneThree] = useState<string | null>(
    null
  );

  const StepThreeCtx = useContext(StepThreeContext);
  const handleSelectPrimaryRune = (rune) => {
    setPrimaryRune(rune);
  };

  const handleAddRunes = () => {
    const runeSet: RuneSet = {
      primaryRune: primaryRune,
      secondaryRune: secondaryRune,
      description: description,
      primaryRunes: [
        selectedRowOne,
        selectedRowTwo,
        selectedRowThree,
        selectedRowFour,
      ],
      id: uuidv4(),
      title: title,
      secondaryRunes: selectedOne,
      flatRunes: [selectedRuneOne, selectedRuneTwo, selectedRuneThree],
    };
    if (!StepThreeCtx.runeSets) {
      StepThreeCtx.setRuneSets(runeSet);
    } else {
      StepThreeCtx.setRuneSets([...StepThreeCtx.runeSets, runeSet]);
    }
    setAddRunes(!addRunes);
  };

  return (
    <div>
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
                              key={keystone.id}
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
        <div>
          <RuneListsDisplay
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            runeData={runeData}
            primaryRune={primaryRune}
            setPrimaryRune={setPrimaryRune}
            secondaryRune={secondaryRune}
            setSecondaryRune={setSecondaryRune}
            selectedRowOne={selectedRowOne}
            setSelectedRowOne={setSelectedRowOne}
            selectedRowTwo={selectedRowTwo}
            setSelectedRowTwo={setSelectedRowTwo}
            selectedRowThree={selectedRowThree}
            setSelectedRowThree={setSelectedRowThree}
            selectedRowFour={selectedRowFour}
            setSelectedRowFour={setSelectedRowFour}
            selectedOne={selectedOne}
            setSelectedOne={setSelectedOne}
            selectedRuneOne={selectedRuneOne}
            setSelectedRuneOne={setSelectedRuneOne}
            selectedRuneTwo={selectedRuneTwo}
            setSelectedRuneTwo={setSelectedRuneTwo}
            selectedRuneThree={selectedRuneThree}
            setSelectedRuneThree={setSelectedRuneThree}
          />
          <Button
            onClick={handleAddRunes}
            disabled={
              !title ||
              !selectedRowOne ||
              !selectedRowTwo ||
              !selectedRowThree ||
              !selectedRowFour ||
              selectedOne.length < 2 ||
              !selectedRuneOne ||
              !selectedRuneTwo ||
              !selectedRuneThree
            }
          >
            Add
          </Button>
        </div>
      )}
    </div>
  );
};

export default RuneTree;
