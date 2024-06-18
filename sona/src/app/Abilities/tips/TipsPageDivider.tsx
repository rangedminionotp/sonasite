import React from "react";
import React, { useState } from "react";

const TipsPageDivider = ({ currentPage, setCurrentPage, abilityTips }) => {
  const tipsPerPage = 5;

  // Calculate the total number of pages
  const totalPages = Math.ceil(abilityTips.length / tipsPerPage);

  // Get the tips for the current page
  const currentTips = abilityTips.slice(
    (currentPage - 1) * tipsPerPage,
    currentPage * tipsPerPage
  );

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

  return (
    <div name="TipsPageDivider">
      <div className="flex justify-center space-x-4 mt-4">
        <Button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <p className="text-gray-800">
          Page {currentPage} of {totalPages}
        </p>
        <Button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default TipsPageDivider;
