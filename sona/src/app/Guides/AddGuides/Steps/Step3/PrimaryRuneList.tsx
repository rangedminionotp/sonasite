import React, { useState } from "react";
import RuneRow from "./RuneRow";

const PrimaryRuneList = ({
  selectedRowOne,
  setSelectedRowOne,
  selectedRowTwo,
  setSelectedRowTwo,
  selectedRowThree,
  setSelectedRowThree,
  selectedRowFour,
  setSelectedRowFour,
  primaryRune,
  secondaryRune,
}) => {
  return (
    <div className="flex flex-wrap gap-1">
      {primaryRune.slots.map((slot) => (
        <div>
          <RuneRow
            runes={slot.rowOne}
            selectedRune={selectedRowOne}
            setSelectedRune={setSelectedRowOne}
            iconWidth={35}
            iconHeight={35}
            mode="primary"
          />
          <RuneRow
            runes={slot.rowTwo}
            selectedRune={selectedRowTwo}
            setSelectedRune={setSelectedRowTwo}
            iconWidth={35}
            iconHeight={35}
            mode="primary"
          />
          <RuneRow
            runes={slot.rowThree}
            selectedRune={selectedRowThree}
            setSelectedRune={setSelectedRowThree}
            iconWidth={35}
            iconHeight={35}
            mode="primary"
          />
          <RuneRow
            runes={slot.rowFour}
            selectedRune={selectedRowFour}
            setSelectedRune={setSelectedRowFour}
            iconWidth={35}
            iconHeight={35}
            mode="primary"
          />
        </div>
      ))}
    </div>
  );
};

export default PrimaryRuneList;
