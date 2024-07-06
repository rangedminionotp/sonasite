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
import { SkinReviewsInfo } from "@/app/api/graphql/SkinReviews/schema";
import { getUserFromLocalStorage, createGraphQLClient } from "@/app/utils/api";

const AddReviewsPopup = ({
  addReviewOpen,
  setAddReviewOpen,
  activeImgUrl,
  skin_id,
}) => {
  const [description, setDescription] = React.useState("");
  const [addReviewsRating, setAddReviewsRating] = React.useState(0);

  const { skinReviews, setSkinReviews } = React.useContext(SkinContext);
  const maxLength = 250;

  const handleInputChange = (event) => {
    setDescription(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = getUserFromLocalStorage();
    const bearerToken = user?.accessToken;
    const graphQLClient = createGraphQLClient(bearerToken);
    let newAddId = "";
    try {
      const mutation = gql`
      mutation AddReview {
        addReview(
          input: {
            owner_id: "${user.id}",
            skin_id: "${skin_id}",
            data: { description: "${description}" },
            rating: ${addReviewsRating},
            owner_name: "${user.name}"
          }
        ) {
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
      const response = await graphQLClient.request(mutation);
      const newReview = response.addReview;
      const newSkinReviews = [newReview, ...skinReviews];
      setSkinReviews(newSkinReviews);
      setDescription("");
      setAddReviewsRating(0);

      try {
        const reviewedMutation = gql`
        mutation CreateSkinReviewsReviewed {
          createSkinReviewsReviewed(
            skin_id: "${skin_id}",
            owner_id: "${user.id}",
            skin_reviews_id: "${newReview.id}"
          ) {
            skin_id
            owner_id
            skin_reviews_id
          }
        }
      `;
        const reviewedResponse = await graphQLClient.request(reviewedMutation);
        setAddReviewOpen(false);
      } catch (error) {
        console.log(
          "Error adding skin reviews reviewed stats, please try again",
          error
        );
      }
    } catch (error) {
      console.log("Error adding skin reviews, please try again", error);
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
              Add Skin Review
            </Typography>
            <Typography
              id="modal-desc"
              textColor="text.tertiary"
              className="mb-4"
            >
              <SkinItemRating
                setRating={setAddReviewsRating}
                rating={0}
                readOnlyBoolean={false}
                mode="add"
              />
              <SkinImg imgUrl={activeImgUrl} className="mt-4" />
            </Typography>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                onClick={handleSubmit}
                className=" popup-btn"
              >
                Submit
              </Button>
              <Button
                onClick={() => setAddReviewOpen(false)}
                className="popup-btn"
              >
                Cancel
              </Button>
            </div>
          </Sheet>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default AddReviewsPopup;
