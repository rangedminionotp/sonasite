import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import AddRoleAndLabels from "./Steps/Step1/AddRoleAndLabels";
import SummonersList from "../data/SummonersList";
import RunesList from "../data/RunesList";
import ItemsList from "../data/ItemsList";

const steps = [
  "Select Roles and Labels",
  "Select Summoner Spells",
  "Select Runes",
  "Select Items",
];

export default function FormStepper({ summonerData, runesData, itemsData }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});
  const components = [
    <AddRoleAndLabels />,
    <SummonersList summonerData={summonerData} />,
    <RunesList runeData={runesData} />,
    <ItemsList itemData={itemsData} summonerData={summonerData} />,
  ];
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
    <div className="relative min-h-full max-h-full max-w-full">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ mt: 2 }}>{components[activeStep]}</Box>
      </Box>
      <div className="fixed bottom-0 w-full text-gray-200">
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step
              key={label}
              className="text-gray-200"
              completed={completed[index]}
              sx={{
                "& .MuiStepLabel-label": {
                  color: "red", // Default color
                },
                "& .Mui-completed .MuiStepLabel-label": {
                  color: "green", // Color for completed steps
                },
                "& .Mui-active .MuiStepLabel-label": {
                  color: "blue", // Color for active step
                },
              }}
            >
              <StepButton className="text-gray-200" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {allStepsCompleted() ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
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
                <Button onClick={handleNext} sx={{ mr: 1 }}>
                  Next
                </Button>
                {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <Typography
                      variant="caption"
                      sx={{ display: "inline-block" }}
                    >
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <Button onClick={handleComplete}>
                      {completedSteps() === totalSteps() - 1
                        ? "Finish"
                        : "Complete Step"}
                    </Button>
                  ))}
              </Box>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}
