import React, { useState } from "react";
import RuneRow from "./RuneRow";

const SecondaryRuneList = ({ secondaryRune }) => {
  const [selectedOne, setSelectedOne] = useState([]);
  return secondaryRune ? (
    <div>
      <div className="flex flex-wrap gap-1">
        {secondaryRune.slots.map((slot, index) => (
          <div>
            <RuneRow
              runes={slot.rowTwo}
              selectedRune={selectedOne}
              setSelectedRune={setSelectedOne}
              iconWidth={30}
              iconHeight={30}
              mode="secondary"
            />
            <RuneRow
              runes={slot.rowThree}
              selectedRune={selectedOne}
              setSelectedRune={setSelectedOne}
              iconWidth={30}
              iconHeight={30}
              mode="secondary"
            />
            <RuneRow
              runes={slot.rowFour}
              selectedRune={selectedOne}
              setSelectedRune={setSelectedOne}
              iconWidth={30}
              iconHeight={30}
              mode="secondary"
            />
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

export default SecondaryRuneList;
