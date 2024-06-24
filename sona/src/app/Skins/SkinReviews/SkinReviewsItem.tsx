import React, { useState } from "react";
import SkinContext from "../SharedContext";
import Button from "@mui/joy/Button";
import SkinItemRating from "../SkinsItemRating";

import { format, formatDistanceToNow, parseISO } from "date-fns";
import SkinReviewsItemDisplay from "./SkinReviewsItemDisplay";
import { getUserFromLocalStorage, createGraphQLClient } from "@/app/utils/api";

const SkinReviewsItem = () => {
  const { skinReviews, setSkinReviews } = React.useContext(SkinContext);
  const [currentPage, setCurrentPage] = useState(1);
  const tipsPerPage = 4;
  const [totalPages, setTotalPages] = useState(1);
  const [currentReviews, setCurrentReviews] = useState([]);
  const user = getUserFromLocalStorage();
  React.useEffect(() => {
    if (skinReviews) {
      const pages = Math.ceil(skinReviews.length / tipsPerPage);
      setTotalPages(pages);

      const reviews = skinReviews.slice(
        (currentPage - 1) * tipsPerPage,
        currentPage * tipsPerPage
      );
      setCurrentReviews(reviews);
    }
  }, [skinReviews, currentPage]);

  // Handle page navigation
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const ReviewList = ({ currentReviews }) => {
    console.log("currentReviews:", currentReviews);

    return (
      <div>
        {currentReviews && currentReviews.length > 0 ? (
          currentReviews.map((item) => (
            <div
              name={`${item.skin_id}${user.id}`}
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
          ))
        ) : (
          <div>No reviews available</div>
        )}
      </div>
    );
  };

  return (
    <div>
      <ReviewList currentReviews={currentReviews} />
      <div className="flex justify-center space-x-4 mt-4">
        <Button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`w-full md:w-auto px-4 py-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </Button>
        <p className="text-gray-300">
          Page {currentPage} of {totalPages}
        </p>
        <Button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`w-full md:w-auto px-4 py-2 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default SkinReviewsItem;
