import React, { useState } from "react";
import RuneRow from "./RuneRow";

const SecondaryRuneList = ({ secondaryRune }) => {
  const [selectedRowTwo, setSelectedRowTwo] = useState(null);
  const [selectedRowThree, setSelectedRowThree] = useState(null);
  const [selectedRowFour, setSelectedRowFour] = useState(null);

  return secondaryRune ? (
    <div>
      <div className="flex flex-wrap gap-1">
        {secondaryRune.slots.map((slot) => (
          <div>
            <RuneRow
              runes={slot.rowTwo}
              selectedRune={selectedRowTwo}
              setSelectedRune={setSelectedRowTwo}
              iconWidth={30}
              iconHeight={30}
            />
            <RuneRow
              runes={slot.rowThree}
              selectedRune={selectedRowThree}
              setSelectedRune={setSelectedRowThree}
              iconWidth={30}
              iconHeight={30}
            />
            <RuneRow
              runes={slot.rowFour}
              selectedRune={selectedRowFour}
              setSelectedRune={setSelectedRowFour}
              iconWidth={30}
              iconHeight={30}
            />
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

export default SecondaryRuneList;
