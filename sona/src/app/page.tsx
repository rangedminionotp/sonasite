import Image from "next/image";
import Navbar from "./Navbar/Navbar";
import Intro from "./Intro";
export default function App() {
  return (
    <div className="flex">
      <Navbar />
      <Intro />
    </div>
  );
}
