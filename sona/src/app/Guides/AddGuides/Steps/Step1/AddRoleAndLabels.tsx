import React from "react";
import RoleMenu from "./RoleMenu";
import LabelsMenu from "./LabelsMenu";
const AddRoleAndLabels = ({
  selectedRoles,
  setSelectedRoles,
  selectedLabels,
  setSelectedLabels,
}) => {
  return (
    <div>
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
