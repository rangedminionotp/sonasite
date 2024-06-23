import React from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import SkinItemRating from "../SkinsItemRating";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";

const AddReviewsPopup = ({ addReviewOpen, setAddReviewOpen, activeImgUrl }) => {
  const [description, setDescription] = React.useState("");
  console.log("activim", activeImgUrl);
  const handleInputChange = (event) => {
    setDescription(event.target.value);
  };
  const handleSubmit = () => {
    console.log("submit");
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
              <img src={activeImgUrl} className="w-full mb-4" />
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
