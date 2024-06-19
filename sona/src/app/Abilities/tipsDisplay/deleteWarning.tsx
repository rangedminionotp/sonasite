import React, { useState } from "react";
import { createGraphQLClient, getUserFromLocalStorage } from "./utils";
import { gql } from "graphql-request";
import AbilitiesContext from "../SharedContext";

const DeleteWarning = ({ tip }) => {
  const { abilityTips, setabilityTips } = React.useContext(AbilitiesContext);

  const [showWarning, setShowWarning] = useState(false);

  const toggleWarning = () => {
    setShowWarning(!showWarning);
  };

  const handleDelete = async () => {
    const user = getUserFromLocalStorage();
    const bearerToken = user?.accessToken;
    const graphQLClient = createGraphQLClient(bearerToken);
    try {
      const mutation = gql`
      mutation MyMutation {
        deleteTips(ability_tip_id: "${tip.tip_id}", owner_id: "${tip.ownerId}") {
          ability_id
          date
          description
          downvotes
          edited
          ownerId
          ownerName
          tip_id
          upvotes
          version
        }
      }
    `;
      await graphQLClient.request(mutation);
      // maybe loop through and find tip id?
      if (abilityTips) {
        const newAbilityTips = abilityTips.filter((item) => {
          return item.tip_id !== tip.tip_id;
        });
        setabilityTips(newAbilityTips);
      }
    } catch (error) {
      console.log("error deleting tip:", error);
    }
  };

  const confirmDelete = () => {
    // need to trigger the whole ability tips re render on delete
    handleDelete();
    setShowWarning(false); // Hide the warning box after delete action
  };

  return (
    <div className="inline-block relative">
      <span
        className="text-gray-500 hover:text-gray-300 hover:underline cursor-pointer"
        onClick={toggleWarning}
      >
        delete
      </span>
      {showWarning && (
        <div className="absolute z-10 top-0 right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden">
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
      )}
    </div>
  );
};

export default DeleteWarning;
