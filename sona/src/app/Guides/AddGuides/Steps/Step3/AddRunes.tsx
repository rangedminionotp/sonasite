import { useState } from "react";
import RuneTree from "./RuneTree";
import { AddBtn } from "./AddBtn";
import Title from "./Title";
import AddedRuneListDisplay from "./AddedRuneListDisplay";

export default function AddRunes({ runesData }) {
  const [addRunes, setAddRunes] = useState(false);
  return (
    <div>
      <Title />
      {addRunes && (
        <RuneTree
          runeData={runesData}
          setAddRunes={setAddRunes}
          addRunes={addRunes}
        />
      )}
      <AddedRuneListDisplay runeData={runesData} />
      {!addRunes && <AddBtn addRunes={addRunes} setAddRunes={setAddRunes} />}
    </div>
  );
}
