import React, { useState } from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Textarea from "@mui/joy/Textarea";
import SkinImg from "./SkinReviews/SkinImg";
import { gql } from "graphql-request";
import Image from "next/image";

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
        <Sheet className="popup-bg-color-dark">
          <ModalClose variant="plain" className="m-1" />
          <Typography
            component="h2"
            id="modal-title"
            level="h2"
            className="popup-title"
            fontWeight="lg"
            mb={2}
          >
            {skinName}
          </Typography>
          <Typography
            id="modal-desc"
            textColor="text.tertiary"
            className="mb-4"
          ></Typography>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              value={description}
              onChange={handleInputChange}
              minRows={10}
              variant="soft"
              className="popup-textarea-bg-dark"
              placeholder={`Riot was lazy about ${skinName} and there's no background color! We must bs some beautiful and tragic and wacky lores for ${skinName} to make it more interesting!`}
            />
            <Typography variant="body2" sx={{ mt: 1, textAlign: "right" }}>
              {description.length} / {maxLength} characters
            </Typography>
          </form>
          <div className="flex justify-center items-center gap-4 mt-4">
            <Button type="submit" onClick={handleSubmit} className=" popup-btn">
              Submit
            </Button>
            <Button onClick={() => setOpen(false)} className="popup-btn">
              Cancel
            </Button>
          </div>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
};

export default AddLorePopup;
