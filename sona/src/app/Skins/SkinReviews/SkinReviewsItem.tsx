import React from "react";
import SkinContext from "../SharedContext";
import SkinItemRating from "../SkinsItemRating";

import { format, formatDistanceToNow, parseISO } from "date-fns";
const SkinReviewsItem = () => {
  const { skinReviews, setSkinReviews } = React.useContext(SkinContext);

  return (
    <div>
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

export default SkinReviewsItem;
