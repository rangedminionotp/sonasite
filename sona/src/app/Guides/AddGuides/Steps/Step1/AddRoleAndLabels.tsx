import React from "react";
import RoleMenu from "./RoleMenu";
import LabelsMenu from "./LabelsMenu";
import SetDescriptions from "./SetDescriptions";
const AddRoleAndLabels = ({
  selectedRoles,
  setSelectedRoles,
  selectedLabels,
  setSelectedLabels,
  title,
  setTitle,
}) => {
  return (
    <div>
      <SetDescriptions title={title} setTitle={setTitle} />
      <RoleMenu
        selectedRoles={selectedRoles}
        setSelectedRoles={setSelectedRoles}
      />
      <LabelsMenu
        selectedLabels={selectedLabels}
        setSelectedLabels={setSelectedLabels}
      />
    </div>
  );
};

export default AddRoleAndLabels;
