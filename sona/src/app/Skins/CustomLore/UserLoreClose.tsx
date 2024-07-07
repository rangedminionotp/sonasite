import React from "react";
import { FaTimes } from "react-icons/fa";

const UserLoreClose = ({ setOpen, setUserLores }) => {
  return (
    <div
      name="popup-close"
      className="text-6xl text-white hover:cursor-pointer"
      onClick={() => {
        setOpen(false);
        setUserLores([]);
      }}
    >
      <FaTimes className="h-12 w-12" />
    </div>
  );
};

export default UserLoreClose;
