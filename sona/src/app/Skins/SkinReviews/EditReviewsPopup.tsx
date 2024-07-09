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

import { createGraphQLClient } from "@/app/utils/api";
import { useUser } from "@/app/utils/user";

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
  const user = useUser();
  const { skinReviews, setSkinReviews } = React.useContext(SkinContext);
  const [description, setDescription] = React.useState(editDescription);
  const [editRating, setEditRating] = React.useState(editReviewsRating);
  const maxLength = 250;
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
            <Sheet className="popup-bg-color-dark">
              <ModalClose variant="plain" className="m-1" />
              <Typography
                component="h2"
                id="modal-title"
                level="h4"
                className="popup-title"
                fontWeight="lg"
                mb={2}
              >
                Edit Skin Review
              </Typography>
              <Typography
                id="modal-desc"
                textColor="text.tertiary"
                className="mb-4"
              >
                <SkinItemRating
                  setRating={setEditRating}
                  rating={editRating}
                  readOnlyBoolean={false}
                  mode="edit"
                />
                <SkinImg imgUrl={activeImgUrl} className="mt-4" />
              </Typography>
              <form onSubmit={handleEditReview} className="space-y-4">
                <Textarea
                  value={description}
                  onChange={handleInputChange}
                  minRows={10}
                  variant="soft"
                  className="popup-textarea-bg-dark"
                  placeholder="Share your insight on Sona! Help fellow Sona kittens improve and learn! Violation of term of service, offensive language, and explicit content can be deleted without notice."
                />
              </form>
              <Typography variant="body2" sx={{ mt: 1, textAlign: "right" }}>
                {description.length} / {maxLength} characters
              </Typography>
              <div className="flex justify-center items-center gap-4 mt-4">
                <Button
                  type="submit"
                  onClick={handleEditReview}
                  className=" popup-btn"
                >
                  Submit
                </Button>
                <Button
                  onClick={() => setEditReviewOpen(false)}
                  className="popup-btn"
                >
                  Cancel
                </Button>
              </div>
            </Sheet>
          </Modal>
        </div>
      </React.Fragment>
    </div>
  );
};

export default EditReviewsPopup;
