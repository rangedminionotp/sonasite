import React, { useContext, useState, useEffect } from "react";
import { StepThreeContext } from "../../types";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import RuneListsDisplay from "./RuneListsDisplay";

const AddedRuneListDisplay = ({ runeData }) => {
  const StepThreeCtx = useContext(StepThreeContext);
  const [editVisibility, setEditVisibility] = useState(false);

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

  useEffect(() => {
    if (StepThreeCtx.runeSets.length > 0) {
      setTitle(StepThreeCtx.runeSets[0].title);
      setDescription(StepThreeCtx.runeSets[0].description);
      setPrimaryRune(StepThreeCtx.runeSets[0].primaryRune);
      setSecondaryRune(StepThreeCtx.runeSets[0].secondaryRune);
      setSelectedRowOne(StepThreeCtx.runeSets[0].primaryRunes[0]);
      setSelectedRowTwo(StepThreeCtx.runeSets[0].primaryRunes[1]);
      setSelectedRowThree(StepThreeCtx.runeSets[0].primaryRunes[2]);
      setSelectedRowFour(StepThreeCtx.runeSets[0].primaryRunes[3]);
      setSelectedOne(StepThreeCtx.runeSets[0].secondaryRunes);
      setSelectedRuneOne(StepThreeCtx.runeSets[0].flatRunes[0]);
      setSelectedRuneTwo(StepThreeCtx.runeSets[0].flatRunes[1]);
      setSelectedRuneThree(StepThreeCtx.runeSets[0].flatRunes[2]);
      setSelectedRuneOne(StepThreeCtx.runeSets[0].secondaryRunes[0]);
    }
  }, [StepThreeCtx.runeSets]);

  const handleDeleteRune = (index) => {
    StepThreeCtx.setRuneSets((prevRuneSets) =>
      prevRuneSets.filter((_, i) => i !== index)
    );
  };
  const toggleEditVisibility = () => {
    if (editVisibility) {
      setEditVisibility(false);
      const EditedRuneSets = StepThreeCtx.runeSets.map((runeSet) => {
        return {
          ...runeSet,
          title: title,
          description: description,
          primaryRune: primaryRune,
          secondaryRune: secondaryRune,
          primaryRunes: [
            selectedRowOne,
            selectedRowTwo,
            selectedRowThree,
            selectedRowFour,
          ],
          secondaryRunes: selectedOne,
          flatRunes: [selectedRuneOne, selectedRuneTwo, selectedRuneThree],
        };
      });
      StepThreeCtx.setRuneSets(EditedRuneSets);
    } else {
      setEditVisibility(true);
    }
  };
  return (
    <div>
      {StepThreeCtx.runeSets.map((runeSet, index) => (
        <div>
          <div
            key={runeSet.id}
            onClick={toggleEditVisibility}
            className="p-4 flex hover:cursor-pointer justify-between border backdrop-blur-lg bg-white/30 border-gray-800 shadow-md mb-4"
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
          {editVisibility && (
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
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AddedRuneListDisplay;
