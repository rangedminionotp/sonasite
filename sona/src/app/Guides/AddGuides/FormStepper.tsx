import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StepLabel from "@mui/material/StepLabel";

import AddRoleAndLabels from "./Steps/Step1/AddRoleAndLabels";
import AddSummoners from "./Steps/Step2/AddSummoners";

import AddRunes from "./Steps/Step3/AddRunes";
import AddItems from "./Steps/Step4/AddItems";

import { StepOneContext, StepOneProps } from "./types";

const steps = [
  "Select Roles and Labels",
  "Select Summoner Spells",
  "Select Runes",
  "Select Items",
];

export default function FormStepper({
  summonerData,
  runesData,
  itemsData,
  itemTree,
}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const components = [
    <AddRoleAndLabels key="StepOneComponent" />,
    <AddSummoners summonerData={summonerData} key="StepTwoComponent" />,
    <AddRunes runesData={runesData} key="StepThreeComponent" />,
    <AddItems
      itemData={itemsData}
      summonerData={summonerData}
      itemTree={itemTree}
      key="StepFourComponent"
    />,
  ];

  const stepOneCtx = React.useContext(StepOneContext);

  const [stepOne, setStepOne] = React.useState<StepOneProps>({
    selectedRoles: [],
    selectedLabels: [],
    title: "",
    description: "",
  });

  // const handleSaveGuide = (currentStep: string) => {
  //   if (currentStep === "stepOne") {
  //     setStepOne({
  //       title: stepOneCtx.title,
  //       description: stepOneCtx.description,
  //       selectedRoles: stepOneCtx.selectedRoles,
  //       selectedLabels: stepOneCtx.selectedLabels,
  //     });
  //   }
  // };

  // React.useEffect(
  //   () => {
  //     handleSaveGuide("stepOne");
  //   },
  //   [
  //     stepOneCtx.title,
  //     stepOneCtx.description,
  //     stepOneCtx.selectedRoles,
  //     stepOneCtx.selectedLabels,
  //     handleSaveGuide,
  //   ],
  //   [handleSaveGuide, stepOneCtx]
  // );

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <div className="relative min-h-full max-h-full mx-auto">
      <Box>
        <Box sx={{ mt: 2 }}>{components[activeStep]}</Box>
      </Box>
      <div className="fixed bottom-0 w-full text-gray-200">
        <Stepper nonLinear activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step
              key={label}
              completed={completed[index]}
              sx={{
                "& .MuiStepLabel-label": {
                  color: "gray", // Default color
                },
              }}
            >
              <StepButton className="text-gray-200" onClick={handleStep(index)}>
                <StepLabel>{label}</StepLabel>
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {allStepsCompleted() ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1, color: "green" }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button
                  onClick={handleReset}
                  variant="contained"
                  color="secondary"
                >
                  Reset
                </Button>
              </Box>
            </React.Fragment>
          ) : (
            <div>
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1, py: 1, color: "gray" }}>
                  Step {activeStep + 1}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button
                    onClick={handleNext}
                    variant="contained"
                    color="primary"
                  >
                    Next
                  </Button>
                  {activeStep !== steps.length &&
                    (completed[activeStep] ? (
                      <Typography
                        variant="caption"
                        sx={{ display: "inline-block", color: "gray" }}
                      >
                        Step {activeStep + 1} already completed
                      </Typography>
                    ) : (
                      <Button
                        onClick={handleComplete}
                        variant="contained"
                        color="success"
                      >
                        {completedSteps() === totalSteps() - 1
                          ? "Finish"
                          : "Complete Step"}
                      </Button>
                    ))}
                </Box>
              </React.Fragment>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
