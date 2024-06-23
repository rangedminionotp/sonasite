import React from "react";
import uuid from "../../types/custom";
import SkinContext from "../SharedContext";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import SkinItemRating from "../SkinsItemRating";
const SkinReviewsDisplay = ({ skin_id }) => {
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
          console.log(json.data.getReviewsBySkinId);
          setSkinReviews(json.data.getReviewsBySkinId);
        }
      })
      .catch((error) => {
        console.error("Error fetching skin reviews:", error);
        alert("Failed to fetching skinreviews. Please try again.");
      });
  }, []);

  return (
    <div>
      <h1>Skin Reviews</h1>
      {skinReviews &&
        skinReviews.map((item) => {
          return (
            <div key={item.id}>
              <div>{item.owner_name}</div>
              <div>
                {format(parseISO(item.data.date), "MMMM dd, yyyy h:mm a")} (
                {formatDistanceToNow(parseISO(item.data.date), {
                  addSuffix: true,
                })}
                )
              </div>
              <div>
                <SkinItemRating rating={item.rating} />
              </div>
              <div>{item.data.description}</div>
            </div>
          );
        })}
    </div>
  );
};

export default SkinReviewsDisplay;
