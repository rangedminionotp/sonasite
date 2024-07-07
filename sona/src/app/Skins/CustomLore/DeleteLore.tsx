import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/joy/Tooltip";

import { getUserFromLocalStorage, createGraphQLClient } from "@/app/utils/api";
import { gql } from "graphql-request";
const DeleteLore = ({ lore_id, userLores, setUserLores }) => {
  const user = getUserFromLocalStorage();

  const [showWarning, setShowWarning] = useState(false);
  const toggleWarning = () => {
    setShowWarning(!showWarning);
  };

  const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    const bearerToken = user?.accessToken;
    const graphQLClient = createGraphQLClient(bearerToken);
    try {
      const mutation = gql`
        mutation MyMutation {
          deleteLore(id: "${lore_id}") {
            id
            lore
            owner_id
            skin_id
            time
          }
        }
      `;
      const response = await graphQLClient.request(mutation);
      if (userLores) {
        setUserLores(userLores.filter((lore) => lore.id !== lore_id));
      }
    } catch (error) {
      console.log("Error deleting lore", error);
    }
  };

  const confirmDelete = () => {
    handleClick();
    setShowWarning(false);
  };

  return (
    <div className="relative">
      <Tooltip title="Delete">
        <span
          className="text-gray-500 hover:text-gray-300 hover:underline cursor-pointer"
          onClick={toggleWarning}
        >
          <DeleteIcon />
        </span>
      </Tooltip>
      {showWarning && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute top-0 right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-4">
              <p className="text-gray-700">Are you sure?</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={confirmDelete}
                  className="px-3 py-1 bg-red-500 text-white hover:bg-red-600 rounded-md mr-2"
                >
                  Yes
                </button>
                <button
                  onClick={toggleWarning}
                  className="px-3 py-1 bg-gray-300 text-gray-700 hover:bg-gray-400 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteLore;
