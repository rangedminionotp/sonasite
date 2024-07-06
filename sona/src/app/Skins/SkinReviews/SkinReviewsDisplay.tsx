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
import Avatar from "@mui/joy/Avatar";
import Tooltip from "@mui/joy/Tooltip";

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
      });
  }, [skinReviews, setSkinReviews, skin_id]);

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
            console.log(
              "Error with checking if skin reviews reviewed, please try again"
            );
          } else {
            setReviewed(json.data.checkIfReviewed);
          }
        })
        .catch((error) => {
          console.error("Error with checking if skin reviews reviewed:", error);
        });
    }
  }, [skinReviews, setReviewed, user, skin_id]);

  return (
    <React.Fragment>
      <div
        className={
          !open
            ? "hidden"
            : `top-0 left-0 w-full h-screen ${bgColor} bg-opacity-50 z-30 absolute`
        }
      >
        <SkinImg imgUrl={activeImgUrl} />
        <div className="absolute top-0 w-full h-full justify-center items-center">
          <div className=" absolute top-4 left-4">
            <ReviewsPopupClose
              setOpen={setOpen}
              setSkinReviews={setSkinReviews}
            />
          </div>
          <div className="hover:cursor-pointer justify-center flex items-center  ">
            {/* name={`${item.skin_id}${user.id}`} */}
            <div className="absolute top-10 justify-center items-center mx-auto">
              {!reviewed ? (
                <Tooltip title="Add your review">
                  <AddReviewsBtn setAddReviewOpen={setAddReviewOpen} />
                </Tooltip>
              ) : (
                <Link to={`${skin_id}${user?.id}`} smooth={true} duration={200}>
                  <Tooltip title="Check your review">
                    <Avatar> {user ? user.name[0] : null}</Avatar>
                  </Tooltip>
                </Link>
              )}{" "}
            </div>
          </div>
          <div className="top-10">
            {/* <SkinImg imgUrl={activeImgUrl} /> */}
            <SkinReviewsItem reviewed={reviewed} />
            <AddReviewsPopup
              addReviewOpen={addReviewOpen}
              setAddReviewOpen={setAddReviewOpen}
              activeImgUrl={activeImgUrl}
              skin_id={skin_id}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SkinReviewsDisplay;
