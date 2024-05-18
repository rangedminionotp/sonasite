import React from "react";

const UserInfo = () => {
  const item = localStorage.getItem("user");
  const user = JSON.parse(item);
  if (user)
    return (
      <div className="text-white text-center">
        <div className="font-semibold text-lg">{user.email}</div>
        <div className="text-xl">
          Welcome,{" "}
          <span className="font-bold text-pink-400 text-2xl">{user.name}</span>
        </div>
      </div>
    );
  else {
    return null;
  }
};

export default UserInfo;
