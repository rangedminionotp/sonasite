import { useState } from "react";
import RunesList from "./RunesList";
export default function AddRunes({ runesData }) {
  const [runes, setRunes] = useState([]);

  return <RunesList runesData={runesData} />;
}
