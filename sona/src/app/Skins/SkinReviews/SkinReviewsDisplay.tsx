import React from "react";
import SkinContext from "../SharedContext";

import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import SkinReviewsItem from "./SkinReviewsItem";
import AddReviews from "./AddReviews";
const SkinReviewsDisplay = ({ skin_id, open, setOpen }) => {
  const { skinReviews, setSkinReviews } = React.useContext(SkinContext);

  React.useEffect(() => {
    const query = {
      query: `
        query MyQuery { 
  getReviewsBySkinId(skin_id: "${skin_id}") {
    data {
      date
      description
    }
    id
    owner_id
    rating
    skin_id
    owner_name
  }
}
      `,
    };

    fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.errors) {
          alert("Error with fetching skin reviews, please try again");
        } else {
          setSkinReviews(json.data.getReviewsBySkinId);
        }
      })
      .catch((error) => {
        console.error("Error fetching skin reviews:", error);
        alert("Failed to fetching skinreviews. Please try again.");
      });
  }, []);

  return (
    <React.Fragment>
      <div>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
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
              Skin Reviews <AddReviews />
            </Typography>
            <Typography id="modal-desc" textColor="text.tertiary">
              <SkinReviewsItem />
            </Typography>
          </Sheet>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default SkinReviewsDisplay;
