import React, { useState } from "react";
import RuneRow from "./RuneRow";

const PrimaryRuneList = ({ primaryRune }) => {
  const [selectedRowOne, setSelectedRowOne] = useState(null);
  const [selectedRowTwo, setSelectedRowTwo] = useState(null);
  const [selectedRowThree, setSelectedRowThree] = useState(null);
  const [selectedRowFour, setSelectedRowFour] = useState(null);

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
          />
          <RuneRow
            runes={slot.rowTwo}
            selectedRune={selectedRowTwo}
            setSelectedRune={setSelectedRowTwo}
            iconWidth={35}
            iconHeight={35}
          />
          <RuneRow
            runes={slot.rowThree}
            selectedRune={selectedRowThree}
            setSelectedRune={setSelectedRowThree}
            iconWidth={35}
            iconHeight={35}
          />
          <RuneRow
            runes={slot.rowFour}
            selectedRune={selectedRowFour}
            setSelectedRune={setSelectedRowFour}
            iconWidth={35}
            iconHeight={35}
          />
        </div>
      ))}
    </div>
  );
};

export default PrimaryRuneList;
