import React, { useContext, useEffect } from "react";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import AbilitiesContext from "../SharedContext";
import { useRouter } from "next/navigation";
import { gql } from "graphql-request";
import Typography from "@mui/joy/Typography";

import {
  getUserFromLocalStorage,
  createGraphQLClient,
} from "../tipsDisplay/utils";
const AddTips = ({ ability_id, version }) => {
  const { abilities, abilityTips, setabilityTips } =
    useContext(AbilitiesContext);
  const router = useRouter();
  const maxLength = 250;

  const [description, setDescription] = React.useState("");
  const handleInputChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = getUserFromLocalStorage();
    const bearerToken = user?.accessToken;
    const graphQLClient = createGraphQLClient(bearerToken);
    if (!user) {
      router.push("/login");
      alert("Please log in to add tips!");
    }
    try {
      const mutation = gql`mutation MyMutation {
  createAbilityTip(
    ability_id: "${ability_id}"
    description: "${description}" 
    version: "${version.slice(0, 5)}"
    owner_name: "${user.name}"
  ) {
    date
    description
    downvotes
    ownerId
    ownerName
    tip_id
    upvotes
    version
    ability_id
  }
}`;
      const response = await graphQLClient.request(mutation);
      const newTip = response.createAbilityTip;
      const newAbilityTips = [newTip, ...abilityTips];
      setabilityTips(newAbilityTips);
      setDescription((prevDescription) => "");
    } catch (error) {
      console.log("Error adding tips, please try again", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 max-h-72" name="AddTips">
      <form onSubmit={handleSubmit}>
        <Textarea
          value={description}
          onChange={handleInputChange}
          minRows={10}
          variant="soft"
          sx={{
            "--Textarea-focusedInset": "var(--any, )",
            "--Textarea-focusedThickness": "0.25rem",
            "--Textarea-focusedHighlight": "rgba(13,110,253,.25)",
            backgroundColor: "#262626",
            color: "#f5f5f5",
            borderColor: "#444444",
            "&::placeholder": {
              color: "#888888",
              opacity: 1, // Ensure the placeholder text is fully opaque
            },
            "&:focus-within": {
              borderColor: "#86b7fe",
            },
            "&::before": {
              transition: "box-shadow .15s ease-in-out",
            },
            "&:hover": {
              borderColor: "#555555",
            },
          }}
          placeholder="Share your insight on Sona! Help fellow Sona kittens improve and learn! Violation of term of service, offensive language, and explicit content can be deleted without notice."
        />
      </form>
      <Typography
        variant="body2"
        sx={{
          mt: 1,
          textAlign: "right",
          color: description.length > maxLength ? "red" : "white",
        }}
      >
        {description.length} / {maxLength} characters
      </Typography>
      <Button type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default AddTips;
