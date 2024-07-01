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
    let newAddId = "";

    const query = `
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

    try {
      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const json = await response.json();

      if (json.errors) {
        alert("Error adding skin reviews, please try again");
        return;
      }

      const newReview = json.data.addReview;
      const newSkinReviews = [...skinReviews, newReview];
      setDescription("");
      setAddReviewsRating(0);
      const votesQuery = `
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

      const votesResponse = await fetch("/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: votesQuery }),
      });

      const votesJson = await votesResponse.json();
      if (votesJson.errors) {
        alert("Error adding skin reviews, please try again");
      } else {
        setAddReviewOpen(false);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error("Error submitting review:", error);
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
              <SkinItemRating
                setRating={setAddReviewsRating}
                rating={0}
                readOnlyBoolean={false}
              />
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
            <Typography variant="body2" sx={{ mt: 1, textAlign: "right" }}>
              {description.length} / {maxLength} characters
            </Typography>
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
