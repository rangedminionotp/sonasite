import React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { gql } from "graphql-request";
import { getUserFromLocalStorage, createGraphQLClient } from "@/app/utils/api";
import { format, formatDistanceToNow, parseISO } from "date-fns";

const EditLoreModal = ({ open, setOpen, lore, userLores, setUserLores }) => {
  const user = getUserFromLocalStorage();

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
            Edit lore
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
            <div> {user.name}</div>
            <div>
              {format(parseISO(lore.time), "MMMM dd, yyyy h:mm a")} (
              {formatDistanceToNow(parseISO(lore.time), {
                addSuffix: true,
              })}
              )
            </div>
          </Typography>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
};

export default EditLoreModal;
