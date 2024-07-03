import React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { gql } from "graphql-request";
import { getUserFromLocalStorage, createGraphQLClient } from "@/app/utils/api";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import Textarea from "@mui/joy/Textarea";

const EditLoreModal = ({
  open,
  setOpen,
  lore,
  userLores,
  setUserLores,
  setCurrLore,
}) => {
  const user = getUserFromLocalStorage();
  const [description, setDescription] = React.useState(lore.lore);

  const handleInputChange = (event) => {
    setDescription(event.target.value);
  };

  const handleEditLore = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("inside handle edit", description);
    const bearerToken = user?.accessToken;
    const graphQLClient = createGraphQLClient(bearerToken);
    try {
      const mutation = gql`
        mutation MyMutation {
          editLore(loreInput: { lore: "${description}", id: "${lore.id}" }) {
            id
            lore
            owner_id
            skin_id
            time
          }
        }
      `;
      const response = await graphQLClient.request(mutation);
      console.log(response.editLore);
      if (userLores) {
        const editedLore = response.editLore;
        const updatedLores = userLores.map((lore) =>
          lore.id === editedLore.id ? editedLore : lore
        );
        setUserLores(updatedLores);
      }
      setOpen(false);
      setCurrLore(null);
    } catch (error) {
      console.log("Error editing skin lore", error);
    }
  };

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => {
          setOpen(false);
          setCurrLore(null);
        }}
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
          <form onSubmit={handleEditLore}>
            <Textarea
              value={description}
              onChange={handleInputChange}
              minRows={10}
              variant="soft"
              className="w-full bg-gray-800 text-white border border-gray-600 focus:border-blue-400 placeholder-gray-500"
              placeholder="Share your insight on Sona! Help fellow Sona kittens improve and learn! Violation of term of service, offensive language, and explicit content can be deleted without notice."
            />
          </form>
          <Button type="submit" onClick={handleEditLore}>
            Submit
          </Button>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
};

export default EditLoreModal;
