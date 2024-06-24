import React from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import SkinItemRating from "../SkinsItemRating";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import SkinContext from "../SharedContext";
import SkinImg from "./SkinImg";
import { gql } from "graphql-request";

import { getUserFromLocalStorage, createGraphQLClient } from "@/app/utils/api";

const AddReviewsPopup = ({
  addReviewOpen,
  setAddReviewOpen,
  activeImgUrl,
  skin_id,
}) => {
  const [description, setDescription] = React.useState("");
  const { addReviewsRating, skinReviews, setSkinReviews, setAddReviewsRating } =
    React.useContext(SkinContext);
  const handleInputChange = (event) => {
    setDescription(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = getUserFromLocalStorage();
    const bearerToken = user?.accessToken;
    const graphQLClient = createGraphQLClient(bearerToken);

    if (!user) {
      alert("Please login to submit tips");
      router.push("/login");
      return;
    }

    try {
      // Add review mutation
      const addReviewMutation = gql`
        mutation AddReview($input: AddReviewInput!) {
          addReview(input: $input) {
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

      const addReviewVariables = {
        input: {
          owner_id: user.id,
          skin_id: skin_id,
          data: { description: description },
          rating: addReviewsRating,
          owner_name: user.name,
        },
      };

      const addReviewResponse = await graphQLClient.request(
        addReviewMutation,
        addReviewVariables
      );
      const newReview = addReviewResponse.addReview;
      const newSkinReviews = [...skinReviews, newReview];

      setSkinReviews(newSkinReviews);
      setDescription("");
      setAddReviewsRating(0);

      // Add review vote mutation
      const addReviewVoteMutation = gql`
        mutation CreateSkinReviewsVotes($skin_id: ID!, $owner_id: ID!) {
          createSkinReviewsVotes(skin_id: $skin_id, owner_id: $owner_id) {
            skin_id
            owner_id
          }
        }
      `;

      const addReviewVoteVariables = {
        skin_id: skin_id,
        owner_id: user.id,
      };

      await graphQLClient.request(
        addReviewVoteMutation,
        addReviewVoteVariables
      );
    } catch (error) {
      console.error(
        "Error adding skin review or review vote, please try again",
        error
      );
    }
  };

  return (
    <React.Fragment>
      <div className="w-full flex justify-center items-center">
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={addReviewOpen}
          onClose={() => setAddReviewOpen(false)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Sheet
            variant="outlined"
            className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg"
          >
            <ModalClose variant="plain" className="m-1" />
            <Typography
              component="h2"
              id="modal-title"
              level="h4"
              textColor="inherit"
              fontWeight="lg"
              mb={1}
            >
              Add Skin Review
            </Typography>
            <Typography id="modal-desc" textColor="text.tertiary">
              <SkinItemRating rating={0} readOnlyBoolean={false} />
              <SkinImg imgUrl={activeImgUrl} />
            </Typography>
            <form onSubmit={handleSubmit}>
              <Textarea
                value={description}
                onChange={handleInputChange}
                minRows={10}
                variant="soft"
                className="w-full bg-gray-800 text-white border border-gray-600 focus:border-blue-400 placeholder-gray-500"
                placeholder="Share your insight on Sona! Help fellow Sona kittens improve and learn! Violation of term of service, offensive language, and explicit content can be deleted without notice."
              />
            </form>
            <Button type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Sheet>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default AddReviewsPopup;
