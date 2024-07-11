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
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddGuideDisplay;
