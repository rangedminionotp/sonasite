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

const EditReviewsPopup = ({
  editReviewOpen,
  setEditReviewOpen,
  activeImgUrl,
  review_id,
  editDescription,
  setEditDescription,
  editReviewsRating,
  setEditReviewsRating,
}) => {
  const user = getUserFromLocalStorage();
  const { skinReviews, setSkinReviews } = React.useContext(SkinContext);
  const [description, setDescription] = React.useState(editDescription);
  const [editRating, setEditRating] = React.useState(editReviewsRating);

  const handleInputChange = (event) => {
    setDescription(event.target.value);
  };

  // edit skin reviews
  const handleEditReview = async () => {
    const bearerToken = user?.accessToken;
    const graphQLClient = createGraphQLClient(bearerToken);
    try {
      const mutation = gql`
      mutation MyMutation { 
  editSkinReview(input: {id: "${review_id}", data: {description: "${description}"}, rating: ${editRating}}) {
    id
    owner_id
    owner_name
    rating
    skin_id
    data {
      date
      description
    }
  }
}`;
      const response = await graphQLClient.request(mutation);
      if (skinReviews) {
        const editedReview = response.editSkinReview;
        const updatedReviews = skinReviews.map((review) => {
          if (review.id === editedReview.id) {
            return editedReview;
          }
          return review;
        });
        setSkinReviews(updatedReviews);
      }
      setEditReviewOpen(false);
    } catch (error) {
      console.log("error editing skin review", error);
    }
  };
  return (
    <div>
      <React.Fragment>
        <div className="w-full flex justify-center items-center">
          <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={editReviewOpen}
            onClose={() => setEditReviewOpen(false)}
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
                Edit Skin Review
              </Typography>
              <Typography id="modal-desc" textColor="text.tertiary">
                <SkinItemRating
                  setRating={setEditRating}
                  rating={editRating}
                  readOnlyBoolean={false}
                />
                <SkinImg imgUrl={activeImgUrl} />
              </Typography>
              <form onSubmit={handleEditReview}>
                <Textarea
                  value={description}
                  onChange={handleInputChange}
                  minRows={10}
                  variant="soft"
                  className="w-full bg-gray-800 text-white border border-gray-600 focus:border-blue-400 placeholder-gray-500"
                  placeholder="Share your insight on Sona! Help fellow Sona kittens improve and learn! Violation of term of service, offensive language, and explicit content can be deleted without notice."
                />
              </form>
              <Button type="submit" onClick={handleEditReview}>
                Submit
              </Button>
            </Sheet>
          </Modal>
        </div>
      </React.Fragment>
    </div>
  );
};

export default EditReviewsPopup;
