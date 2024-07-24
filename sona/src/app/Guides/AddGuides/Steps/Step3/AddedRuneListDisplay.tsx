import React, { useContext } from "react";
import { StepThreeContext } from "../../types";

const AddedRuneListDisplay = () => {
  const StepThreeCtx = useContext(StepThreeContext);

  return (
    <div>
      {StepThreeCtx.runeSets.map((runeSet) => (
        <div key={runeSet.id}>
          <div>{runeSet.primaryRune.name}</div>
          <div>{runeSet.secondaryRune.name}</div>
        </div>
      ))}
    </div>
  );
};

export default AddedRuneListDisplay;
