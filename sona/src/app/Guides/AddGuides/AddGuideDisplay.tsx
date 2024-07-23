import React, { useState, useEffect } from "react";
import AddGuideClose from "./AddGuideClose";
import FormStepper from "./FormStepper";
import SummonerRiftBg from "../../utils/SummonerRiftBg";
import { setCookie, getCookie } from "cookies-next";

const AddGuideDisplay = ({
  open,
  setOpen,
  summonerData,
  runesData,
  itemsData,
  itemTree,
}) => {
  const [stepOne, setStepOne] = React.useState("");
  // const [step1formState, setStep1formState] = useState({
  //   title: "",
  //   description: "",
  //   selectedRoles: [],
  //   selectedLabels: [],
  // });
  // useEffect(() => {
  //   if (title && description && selectedRoles && selectedLabels) {
  //     setStep1formState({
  //       title,
  //       description,
  //       selectedRoles,
  //       selectedLabels,
  //     });
  //   }
  // }, [title, description, selectedRoles, selectedLabels]);

  // useEffect(() => {
  //   // Load state from cookies when the component mounts
  //   // const savedState = getCookie("step1formState");
  //   const savedState = localStorage.getItem("step1formState");
  //   if (savedState) {
  //     const parsedState = JSON.parse(savedState);
  //     setTitle(parsedState.title);
  //     setDescription(parsedState.description);
  //     setSelectedRoles(parsedState.selectedRoles);
  //     setSelectedLabels(parsedState.selectedLabels);
  //     setStep1formState(parsedState);
  //   }
  // }, []);

  // useEffect(() => {
  //   // Save state to cookies whenever it changes

  //   // setCookie("step1formState", JSON.stringify(step1formState), {
  //   //   maxAge: 60 * 6 * 24,
  //   // });
  //   localStorage.setItem("step1formState", JSON.stringify(step1formState));
  // }, [step1formState]);

  // and when we submit the guide we clear current guide cookie sessions

  return (
    <React.Fragment>
      <div
        className={
          !open
            ? "hidden"
            : `top-0 left-0 w-full h-screen bg-[#101730] z-40 absolute`
        }
      >
        <SummonerRiftBg />
        <div className="absolute top-0 w-full h-full justify-center items-center">
          <div className=" absolute top-4 left-4 z-30">
            <AddGuideClose setOpen={setOpen} />
            <div>
              <FormStepper
                summonerData={summonerData}
                runesData={runesData}
                itemsData={itemsData}
                itemTree={itemTree}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddGuideDisplay;
