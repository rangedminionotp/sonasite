import { useState } from "react";
import RuneTree from "./RuneTree";
export default function AddRunes({ runesData }) {
  return (
    <div>
      <RuneTree runeData={runesData} />
    </div>
  );
}
