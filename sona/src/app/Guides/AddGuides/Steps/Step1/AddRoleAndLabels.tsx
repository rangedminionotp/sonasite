import React from "react";
import RoleMenu from "./RoleMenu";
import LabelsMenu from "./LabelsMenu";
import SetTitle from "./SetTitle";
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
      <SetTitle title={title} setTitle={setTitle} />
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
