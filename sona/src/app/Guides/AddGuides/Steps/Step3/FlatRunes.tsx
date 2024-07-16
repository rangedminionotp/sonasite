import React, { useState } from "react";
import Image from "next/image";
import abilityHaste from "@/assets/flatRunes/abilityHaste.webp";
import adaptiveForce from "@/assets/flatRunes/adaptiveForce.webp";
import attackSpeed from "@/assets/flatRunes/attackSpeed.webp";
import flatHealth from "@/assets/flatRunes/flatHealth.webp";
import healthScaling from "@/assets/flatRunes/healthScaling.webp";
import movementSpeed from "@/assets/flatRunes/movementSpeed.webp";
import tenacityAndSlowResist from "@/assets/flatRunes/tenacityAndSlowResist.webp";

const FlatRunes = () => {
  const rowOne = [adaptiveForce, attackSpeed, abilityHaste];
  const rowTwo = [adaptiveForce, movementSpeed, healthScaling];
  const rowThree = [flatHealth, tenacityAndSlowResist, healthScaling];

  const [selectedRuneOne, setSelectedRuneOne] = useState<string | null>(null);
  const [selectedRuneTwo, setSelectedRuneTwo] = useState<string | null>(null);
  const [selectedRuneThree, setSelectedRuneThree] = useState<string | null>(
    null
  );

  const FlatRuneRow = ({
    row,
    selectedRune,
    setSelectedRune,
  }: {
    row: string[];
    selectedRune: string;
    setSelectedRune: (rune: string) => void;
  }) => {
    return (
      <div className="flex flex-wrap justify-center items-center gap-8 mt-3">
        {row.map((rune) => (
          <Image
            onClick={() => setSelectedRune(rune)}
            src={rune}
            alt="rune"
            width={30}
            height={30}
            className={`hover:cursor-pointer hover:scale-110 transition-all duration-300 ${
              selectedRune && selectedRune !== rune
                ? "grayscale"
                : "ring-2 ring-[#CDBD82] rounded-full hover:ring-offset-4"
            }`}
          />
        ))}
      </div>
    );
  };
  return (
    <div>
      <FlatRuneRow
        row={rowOne}
        selectedRune={selectedRuneOne}
        setSelectedRune={setSelectedRuneOne}
      />
      <FlatRuneRow
        row={rowTwo}
        selectedRune={selectedRuneTwo}
        setSelectedRune={setSelectedRuneTwo}
      />
      <FlatRuneRow
        row={rowThree}
        selectedRune={selectedRuneThree}
        setSelectedRune={setSelectedRuneThree}
      />
    </div>
  );
};

export default FlatRunes;
