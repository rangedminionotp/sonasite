import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import { getUserFromLocalStorage, createGraphQLClient } from "@/app/utils/api";
import { gql } from "graphql-request";
const DeleteLore = ({ lore_id, userLores, setUserLores }) => {
  const user = getUserFromLocalStorage();

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

  return (
    <div>
      <IconButton onClick={handleClick}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default DeleteLore;
