import React, { useState } from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Textarea from "@mui/joy/Textarea";
import SkinImg from "./SkinReviews/SkinImg";
import { gql } from "graphql-request";

import { getUserFromLocalStorage, createGraphQLClient } from "@/app/utils/api";

const AddLorePopup = ({
  open,
  setOpen,
  skinName,
  skinImgURL,
  skin_id,
  customLore,
  setCustomLore,
}) => {
  const [description, setDescription] = React.useState<string>("");
  const maxLength = 250;
  const user = getUserFromLocalStorage();
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const bearerToken = user?.accessToken;
    const graphQLClient = createGraphQLClient(bearerToken);
    try {
      const mutation = gql`
        mutation MyMutation {
          createLore(
            loreInput: {
              skin_id: "${skin_id}"
              owner_id: "${user.id}"
              lore: "${description}"
            }
          ) {
            id
            lore
            owner_id
            skin_id
            time
          }
        }
      `;
      const response = await graphQLClient.request(mutation);
      console.log("response", response.createLore);
      setOpen(false);
    } catch (error) {
      console.error("error adding skin lores", error);
    }
  };
  return (
    <React.Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            {skinName}
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
            <img src={skinImgURL} className="w-full mb-4" />
          </Typography>
          <form onSubmit={handleSubmit}>
            <Textarea
              value={description}
              onChange={handleInputChange}
              minRows={10}
              variant="soft"
              className="w-full bg-gray-800 text-white border border-gray-600 focus:border-blue-400 placeholder-gray-500"
              placeholder={`Riot was lazy about ${skinName} and there's no background color! We must bs some beautiful and tragic and wacky lores for ${skinName} to make it more interesting!`}
            />
            <Typography variant="body2" sx={{ mt: 1, textAlign: "right" }}>
              {description.length} / {maxLength} characters
            </Typography>
          </form>
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
};

export default AddLorePopup;
