import React from "react";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/joy/Tooltip";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";

const AddCustomLabel = ({ labels, setLabels }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [label, setLabel] = React.useState("");
  return (
    <div className="flex items-center space-x-4">
      <Tooltip
        title="Add Custom Label"
        placement="top"
        onClick={() => setIsOpen(true)}
      >
        <IconButton className="border border-gray-300 hover:bg-gray-200 transition-colors duration-300">
          <AddIcon />
        </IconButton>
      </Tooltip>
      {isOpen && (
        <Input
          placeholder="Enter Label"
          className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          onChange={(e) => setLabel(e.target.value)}
        />
      )}
    </div>
  );
};

export default AddCustomLabel;
