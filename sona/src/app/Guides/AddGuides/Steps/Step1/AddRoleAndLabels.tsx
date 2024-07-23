import React from "react";
import RoleMenu from "./RoleMenu";
import LabelsMenu from "./LabelsMenu";
import SetTitle from "./SetTitle";
import SetDescription from "./SetDescription";
import { StepOneContext } from "../../types";
const AddRoleAndLabels = () => {
  const stepOneContext = React.useContext(StepOneContext);
  return (
    <div>
      <SetTitle
        title={stepOneContext.title}
        setTitle={stepOneContext.setTitle}
      />
      <SetDescription
        description={stepOneContext.description}
        setDescription={stepOneContext.setDescription}
      />
      <RoleMenu
        selectedRoles={stepOneContext.selectedRoles}
        setSelectedRoles={stepOneContext.setSelectedRoles}
      />
      <LabelsMenu
        selectedLabels={stepOneContext.selectedLabels}
        setSelectedLabels={stepOneContext.setSelectedLabels}
      />
    </div>
  );
};

export default AddRoleAndLabels;
