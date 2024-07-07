import React from "react";
import { FaTimes } from "react-icons/fa";

const SkinItemsClose = ({ setActiveSkin }) => {
  return (
    <div
      name="popup-close"
      className="text-3xl text-white hover:cursor-pointer mt-4"
      onClick={() => setActiveSkin(null)}
    >
      <FaTimes className="h-12 w-12" />
    </div>
  );
};

export default SkinItemsClose;
