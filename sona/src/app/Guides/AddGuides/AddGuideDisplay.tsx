import React from "react";
import AddGuideClose from "./AddGuideClose";
import FormStepper from "./FormStepper";
import SummonerRiftBg from "../../utils/SummonerRiftBg";
const AddGuideDisplay = ({
  open,
  setOpen,
  summonerData,
  runesData,
  itemsData,
}) => {
  const [selectedRoles, setSelectedRoles] = React.useState<string[]>([]);
  const [selectedLabels, setSelectedLabels] = React.useState<string[]>([]);
  const [title, setTitle] = React.useState("");
  return (
    <React.Fragment>
      <div
        className={
          !open
            ? "hidden"
            : `top-0 left-0 w-full h-screen bg-[#101730] z-30 absolute`
        }
      >
        <SummonerRiftBg />
        <div className="absolute top-0 w-full h-full justify-center items-center">
          <div className=" absolute top-4 left-4">
            <AddGuideClose setOpen={setOpen} />
            <FormStepper
              summonerData={summonerData}
              runesData={runesData}
              itemsData={itemsData}
              selectedRoles={selectedRoles}
              setSelectedRoles={setSelectedRoles}
              selectedLabels={selectedLabels}
              setSelectedLabels={setSelectedLabels}
              title={title}
              setTitle={setTitle}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddGuideDisplay;
