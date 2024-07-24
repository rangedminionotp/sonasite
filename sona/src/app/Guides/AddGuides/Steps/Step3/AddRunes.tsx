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
      <AddBtn addRunes={addRunes} setAddRunes={setAddRunes} />
      {addRunes && <RuneTree runeData={runesData} setAddRunes={setAddRunes} />}
      <AddedRuneListDisplay />
    </div>
  );
}
