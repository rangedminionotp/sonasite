import React, { useState } from "react";
import RuneRow from "./RuneRow";

const SecondaryRuneList = ({ secondaryRune }) => {
  const [selectedOne, setSelectedOne] = useState([]);
  const rowone = [3, 4, 5];
  const rowtwo = [6, 7, 8];
  const rowthree = [9, 10, 11];

  const rows = [rowone, rowtwo, rowthree];

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
              row={rowone}
            />
            <RuneRow
              runes={slot.rowThree}
              selectedRune={selectedOne}
              setSelectedRune={setSelectedOne}
              iconWidth={30}
              iconHeight={30}
              mode="secondary"
              row={rowtwo}
            />
            <RuneRow
              runes={slot.rowFour}
              selectedRune={selectedOne}
              setSelectedRune={setSelectedOne}
              iconWidth={30}
              iconHeight={30}
              mode="secondary"
              row={rowthree}
            />
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

export default SecondaryRuneList;
