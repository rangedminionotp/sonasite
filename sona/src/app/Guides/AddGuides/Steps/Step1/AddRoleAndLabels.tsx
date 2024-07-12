import React from "react";
import RoleMenu from "./RoleMenu";
import LabelsMenu from "./LabelsMenu";
import SetTitle from "./SetTitle";
import SetDescription from "./SetDescription";

const AddRoleAndLabels = ({
  selectedRoles,
  setSelectedRoles,
  selectedLabels,
  setSelectedLabels,
  title,
  setTitle,
  description,
  setDescription,
}) => {
  return (
    <div>
      <SetTitle title={title} setTitle={setTitle} />
      <SetDescription
        description={description}
        setDescription={setDescription}
      />
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
