import React, { useState } from "react";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { createGraphQLClient } from "@/app/utils/api";
import { useUser } from "@/app/utils/user";

import DeleteLore from "./DeleteLore";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import EditLoreModal from "./EditLoreModal";
import Button from "@mui/joy/Button";
import Tooltip from "@mui/joy/Tooltip";
import { FaTimes } from "react-icons/fa";
import UserLoreClose from "./UserLoreClose";
const UserLoreList = ({ bgColor, open, setOpen, userLores, setUserLores }) => {
  const user = useUser();
  const [editLoreBtn, setEditLoreBtn] = React.useState(false);
  const [currLore, setCurrLore] = React.useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const loresPerPage = 3;
  const [totalPages, setTotalPages] = useState(1);
  const [pagedLores, setPagedLores] = useState([]);
  React.useEffect(() => {
    if (userLores) {
      const pages = Math.ceil(userLores.length / loresPerPage);
      setTotalPages(pages);

      const lores = userLores.slice(
        (currentPage - 1) * loresPerPage,
        currentPage * loresPerPage
      );
      setPagedLores(lores);
    }
  }, [userLores, currentPage]);

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
    <div>
      <React.Fragment>
        <div
          className={
            !open
              ? "hidden"
              : `top-0 left-0 w-full h-full z-30 ${bgColor} bg-opacity-50 absolute`
          }
        >
          <UserLoreClose setOpen={setOpen} setUserLores={setUserLores} />
          <div>
            {userLores.map((lore) => (
              <div
                key={lore.id}
                className="rounded-lg p-4 shadow-lg drop-shadow-lg	backdrop-blur-sm bg-white/30	mb-4 "
              >
                <div>
                  <h2 className="font-bold text-[#0c0a09]">{user.name}</h2>
                  <h2 className="text-gray-600 text-sm mt-2">
                    {format(parseISO(lore.time), "MMMM dd, yyyy h:mm a")} (
                    {formatDistanceToNow(parseISO(lore.time), {
                      addSuffix: true,
                    })}
                    )
                  </h2>
                </div>
                <div className="text-gray-700">{lore.lore}</div>

                <div className="flex justify-center mt-2">
                  <div
                    onClick={() => {
                      setCurrLore(lore);
                      setEditLoreBtn(true);
                    }}
                    className="icon-btns"
                  >
                    <Tooltip title="Edit">
                      <EditIcon />
                    </Tooltip>
                  </div>

                  {currLore && (
                    <div>
                      <EditLoreModal
                        open={editLoreBtn}
                        setOpen={setEditLoreBtn}
                        lore={currLore}
                        userLores={userLores}
                        setUserLores={setUserLores}
                        setCurrLore={setCurrLore}
                      />
                    </div>
                  )}
                  <DeleteLore
                    lore_id={lore.id}
                    userLores={userLores}
                    setUserLores={setUserLores}
                  />
                </div>
              </div>
            ))}
          </div>
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
      </React.Fragment>
    </div>
  );
};

export default UserLoreList;
