import React, { useContext, useEffect } from "react";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import AbilitiesContext from "../SharedContext";

const AddTips = ({ ability_id, version }) => {
  const { abilities, abilityTips, setabilityTips } =
    useContext(AbilitiesContext);

  const [description, setDescription] = React.useState("");
  const item = localStorage.getItem("user");
  const user = JSON.parse(item);
  console.log("inside add tips", ability_id);
  const handleInputChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = {
      query: `mutation MyMutation {
  createAbilityTip(
    ability_id: "${ability_id}"
    description: "${description}"
    owner_id: "${user.id}"
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
}`,
    };
    fetch("/api/graphql", {
      method: "POST",
      body: JSON.stringify(query),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.errors) {
          alert("Error adding tips, please try again");
        } else {
          const newTip = json.data.createAbilityTip;
          // if (abilityTips) {
          const newAbilityTips = [...abilityTips, newTip];
          setabilityTips(newAbilityTips);
          // }
          setDescription((prevDescription) => "");
        }
      });
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
      <Button type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default AddTips;
