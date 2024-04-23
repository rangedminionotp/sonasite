import Image from "next/image";
import Navbar from "./Navbar/Navbar";
import Intro from "./Intro/Intro";
import Abilities from "./Abilities/Abilities";
export default function App() {
  return (
    <div>
      <Navbar />
      <Intro />
      <Abilities />
    </div>
  );
}
