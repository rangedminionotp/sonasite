import React, { useState } from "react";
import Image from "next/image";
import RunePrimaryTreeSelection from "./RunePrimaryTreeSelection";
import PrimaryRuneList from "./PrimaryRuneList";
import RuneSecondaryTreeSelection from "./RuneSecondaryTreeSelection";
import SecondaryRuneList from "./SecondaryRuneList";
import RunesBG from "@/assets/runeWallpaper";
import domination from "@/assets/runeWallpaper/Domination.webp";
import FlatRunes from "./FlatRunes";
import RuneDescription from "./RuneDescription";
import { Button } from "@mui/material";
import { StepThreeContext } from "../../types";

const RuneTree = ({ runeData }) => {
  const [primaryRune, setPrimaryRune] = useState(null);
  const [secondaryRune, setSecondaryRune] = useState(null);
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

  const handleSelectPrimaryRune = (rune) => {
    setPrimaryRune(rune);
  };

  const handleAddRunes = () => {
    console.log(selectedOne);
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
          <div className="flex gap-12">
            <div>
              <RunePrimaryTreeSelection
                runeData={runeData}
                primaryRune={primaryRune}
                setPrimaryRune={setPrimaryRune}
                secondaryRune={secondaryRune}
                setSecondaryRune={setSecondaryRune}
              />
              <PrimaryRuneList
                primaryRune={primaryRune}
                selectedRowOne={selectedRowOne}
                setSelectedRowOne={setSelectedRowOne}
                selectedRowTwo={selectedRowTwo}
                setSelectedRowTwo={setSelectedRowTwo}
                selectedRowThree={selectedRowThree}
                setSelectedRowThree={setSelectedRowThree}
                selectedRowFour={selectedRowFour}
                setSelectedRowFour={setSelectedRowFour}
              />
            </div>
            <div>
              <RuneSecondaryTreeSelection
                runeData={runeData}
                secondaryRune={secondaryRune}
                setSecondaryRune={setSecondaryRune}
                primaryRune={primaryRune}
              />
              <SecondaryRuneList
                secondaryRune={secondaryRune}
                selectedOne={selectedOne}
                setSelectedOne={setSelectedOne}
              />
            </div>
            <FlatRunes
              selectedRuneOne={selectedRuneOne}
              setSelectedRuneOne={setSelectedRuneOne}
              selectedRuneTwo={selectedRuneTwo}
              setSelectedRuneTwo={setSelectedRuneTwo}
              selectedRuneThree={selectedRuneThree}
              setSelectedRuneThree={setSelectedRuneThree}
            />
          </div>
          <div className="mt-4">
            <RuneDescription
              description={description}
              setDescription={setDescription}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddRunes}
            >
              Add
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RuneTree;
