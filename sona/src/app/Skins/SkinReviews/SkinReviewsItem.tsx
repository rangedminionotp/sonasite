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
            <div
              key={item.id}
              className="p-4 mb-4 bg-gray-700 rounded shadow-md"
            >
              <div className="text-lg font-semibold mb-2">
                {item.owner_name}
              </div>
              <div className="text-sm text-gray-600 mb-2">
                {format(parseISO(item.data.date), "MMMM dd, yyyy h:mm a")} (
                {formatDistanceToNow(parseISO(item.data.date), {
                  addSuffix: true,
                })}
                )
              </div>
              <div className="mb-2">
                <SkinItemRating rating={item.rating} readOnlyBoolean={true} />
              </div>
              <div className="text-gray-800">{item.data.description}</div>
            </div>
          );
        })}
    </div>
  );
};

export default SkinReviewsItem;
