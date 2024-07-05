import React from "react";
import Avatar from "@mui/joy/Avatar";
import Divider from "@mui/joy/Divider";

const UserInfo = ({ user }) => {
  if (user)
    return (
      <div className="text-white flex flex-col justify-center h-full w-full p-5">
        <div className="flex items-center mb-4">
          <Avatar className="mr-4">{user ? user.name[0] : null}</Avatar>
          <div className="text-xl font-semibold">{user.name}</div>
        </div>
        <Divider />
      </div>
    );
  else {
    return null;
  }
};

export default UserInfo;
