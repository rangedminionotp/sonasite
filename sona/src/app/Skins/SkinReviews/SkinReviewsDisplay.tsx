import React from "react";
import SkinContext from "../SharedContext";

import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import SkinReviewsItem from "./SkinReviewsItem";
import AddReviewsBtn from "./AddReviewsBtn";
import ReviewsPopupClose from "./ReviewsPopupClose";
import AddReviewsPopup from "./AddReviewsPopup";
import SkinImg from "./SkinImg";

import { getUserFromLocalStorage, createGraphQLClient } from "@/app/utils/api";

import { Link } from "react-scroll";

const SkinReviewsDisplay = ({
  skin_id,
  open,
  setOpen,
  bgColor,
  toggleVisibility,
  activeImgUrl,
}) => {
  const { skinReviews, setSkinReviews } = React.useContext(SkinContext);
  const [addReviewOpen, setAddReviewOpen] = React.useState<boolean>(false);
  const [reviewed, setReviewed] = React.useState<boolean>(false);
  const user = getUserFromLocalStorage();

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
  }, [skinReviews]);

  React.useEffect(() => {
    if (user) {
      const query = {
        query: `
        query MyQuery {
          checkIfReviewed(owner_id: "${user.id}", skin_id: "${skin_id}")
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
            alert(
              "Error with checking if skin reviews reviewed, please try again"
            );
          } else {
            setReviewed(json.data.checkIfReviewed);
          }
        })
        .catch((error) => {
          console.error("Error with checking if skin reviews reviewed:", error);
          alert(
            "Failed with checking if skin reviews reviewed. Please try again."
          );
        });
    }
  }, [skinReviews]);

  return (
    <React.Fragment>
      <div
        className={
          !open
            ? "hidden"
            : `top-0 left-0 w-full h-screen ${bgColor} bg-opacity-50 absolute`
        }
      >
        <ReviewsPopupClose setOpen={setOpen} setSkinReviews={setSkinReviews} />
        {!reviewed ? (
          <AddReviewsBtn setAddReviewOpen={setAddReviewOpen} />
        ) : (
          <div>
            {/* name={`${item.skin_id}${user.id}`} */}
            <Link to={`${skin_id}${user.id}`} smooth={true} duration={200}>
              Check your own review
            </Link>
          </div>
        )}
        {/* <SkinImg imgUrl={activeImgUrl} /> */}
        <SkinReviewsItem reviewed={reviewed} />
        <AddReviewsPopup
          addReviewOpen={addReviewOpen}
          setAddReviewOpen={setAddReviewOpen}
          activeImgUrl={activeImgUrl}
          skin_id={skin_id}
        />
      </div>
    </React.Fragment>
  );
};

export default SkinReviewsDisplay;
