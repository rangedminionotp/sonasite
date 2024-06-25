import React, { useState } from "react";
import SkinContext from "../SharedContext";
import DeleteIcon from "@mui/icons-material/Delete";

import { getUserFromLocalStorage, createGraphQLClient } from "@/app/utils/api";
import { gql } from "graphql-request";
const DeleteReviews = ({ skin_id }) => {
  const { skinReviews, setSkinReviews } = React.useContext(SkinContext);
  const [showWarning, setShowWarning] = useState(false);
  const toggleWarning = () => {
    setShowWarning(!showWarning);
  };

  const handleDeleteReview = async (skinId) => {
    const client = createGraphQLClient();
    const user = getUserFromLocalStorage();
    const bearerToken = user?.accessToken;
    const graphQLClient = createGraphQLClient(bearerToken);
    try {
      const query = gql`
      mutation MyMutation {
        deleteSkinReview(
          owner_id: "${user.id}"
          skin_id: "${skinId}"
        ) {
          data {
            date
            description
          }
          id
          owner_id
          owner_name
          rating
          skin_id
        }
      }
    `;
      const response = await graphQLClient.request(query);
      if (skinReviews) {
        const newReviews = skinReviews.filter(
          (review) => review.owner_id !== user.id
        );
        setSkinReviews(newReviews);
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };
  const confirmDelete = () => {
    handleDeleteReview(skin_id);
    setShowWarning(false);
  };
  return (
    <div className="inline-block relative">
      <span
        className="text-gray-500 hover:text-gray-300 hover:underline cursor-pointer"
        onClick={toggleWarning}
      >
        Delete
        <DeleteIcon />
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

export default DeleteReviews;
