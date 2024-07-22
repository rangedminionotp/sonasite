import React from "react";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/joy/Tooltip";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import { useUser } from "@/app/utils/user";
import { createGraphQLClient } from "@/app/utils/api";
import { gql } from "graphql-request";
import CheckIcon from "@mui/icons-material/Check";

const AddCustomLabel = ({ customLabels, setCustomLabels, label, setLabel }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [addLabel, setAddLabel] = React.useState("");
  const [howMany, setHowMany] = React.useState(0);
  const user = useUser();
  const bearerToken = user?.accessToken;
  const graphQLClient = createGraphQLClient(bearerToken);

  const handleAddCustomLabel = async () => {
    // Function body remains unchanged
  };

  const checkHowMany = async () => {
    // Function body remains unchanged
  };

  React.useEffect(() => {
    checkHowMany();
  }, [label]);

  return (
    <div className="flex items-center space-x-4">
      {howMany >= 5 ? (
        <div className="text-red-600 text-sm">
          You can only have 5 custom labels, delete or edit one!
        </div>
      ) : (
        <Tooltip
          title="Add Custom Label"
          placement="top"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <IconButton className="border border-gray-300 hover:border-blue-500 hover:bg-gray-100 transition-colors duration-300">
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}
      {isOpen && (
        <div>
          <Input
            placeholder="Enter Custom Label"
            className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 mb-2"
            onChange={(e) => setAddLabel(e.target.value)}
            endDecorator={
              <IconButton
                className="border border-gray-300 hover:border-blue-500 hover:bg-gray-100 transition-colors duration-300"
                onClick={handleAddCustomLabel}
              >
                <CheckIcon />
              </IconButton>
            }
          />
        </div>
      )}
    </div>
  );
};

export default AddCustomLabel;
