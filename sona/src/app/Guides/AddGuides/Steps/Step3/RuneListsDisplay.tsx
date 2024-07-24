import React from "react";
import RunePrimaryTreeSelection from "./RunePrimaryTreeSelection";
import RuneSecondaryTreeSelection from "./RuneSecondaryTreeSelection";
import PrimaryRuneList from "./PrimaryRuneList";
import SecondaryRuneList from "./SecondaryRuneList";
import FlatRunes from "./FlatRunes";
import RuneDescription from "./RuneDescription";
import { Textarea } from "@mui/material";

const RuneListsDisplay = ({
  title,
  setTitle,
  description,
  setDescription,
  runeData,
  primaryRune,
  setPrimaryRune,
  secondaryRune,
  setSecondaryRune,
  selectedRowOne,
  setSelectedRowOne,
  selectedRowTwo,
  setSelectedRowTwo,
  selectedRowThree,
  setSelectedRowThree,
  selectedRowFour,
  setSelectedRowFour,
  selectedOne,
  setSelectedOne,
  selectedRuneOne,
  setSelectedRuneOne,
  selectedRuneTwo,
  setSelectedRuneTwo,
  selectedRuneThree,
  setSelectedRuneThree,
}) => {
  return (
    <div>
      <div className="mt-5">
        <Textarea
          value={title}
          placeholder="Enter title..."
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            backgroundColor: "var(--primary-bg)",
            color: "white",
          }}
          className="  text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
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
      </div>
    </div>
  );
};

export default RuneListsDisplay;
