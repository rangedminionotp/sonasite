import React, { useEffect } from "react";
import RoleMenu from "./RoleMenu";
import LabelsMenu from "./LabelsMenu";
import SetTitle from "./SetTitle";
import SetDescription from "./SetDescription";
import { StepOneContext, StepOneProps } from "../../types";
const AddRoleAndLabels = () => {
  const stepOneCtx = React.useContext(StepOneContext);
  // const [stepOne, setStepOne] = React.useState<StepOneProps>({
  //   title: stepOneCtx.title,
  //   description: stepOneCtx.description,
  //   roles: stepOneCtx.selectedRoles,
  //   labels: stepOneCtx.selectedLabels,
  // });

  // useEffect(() => {
  //   setStepOne({
  //     title: stepOneCtx.title,
  //     description: stepOneCtx.description,
  //     roles: stepOneCtx.selectedRoles,
  //     labels: stepOneCtx.selectedLabels,
  //   });
  // }, [stepOneCtx]);
  return (
    <div>
      <SetTitle title={stepOneCtx.title} setTitle={stepOneCtx.setTitle} />
      <SetDescription
        description={stepOneCtx.description}
        setDescription={stepOneCtx.setDescription}
      />
      <RoleMenu
        selectedRoles={stepOneCtx.selectedRoles}
        setSelectedRoles={stepOneCtx.setSelectedRoles}
      />
      <LabelsMenu
        selectedLabels={stepOneCtx.selectedLabels}
        setSelectedLabels={stepOneCtx.setSelectedLabels}
      />
    </div>
  );
};

export default AddRoleAndLabels;
