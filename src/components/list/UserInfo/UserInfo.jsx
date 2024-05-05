import React from "react";
import "./UserInfoCss.css";
import { useUserStore } from "../../../library/userStore";

const UserInfo = () => {
  const { currentUser } = useUserStore();

  return (
    <div className="user-info">
      <div className="user">
        <img src={currentUser.avatar ? currentUser.avatar : "./avatar.png"} />
        <h2>{currentUser.username}</h2>
      </div>
      <div className="icons">
        <img src="./more.png" alt="" />
        <img src="./video.png" alt="" />
        <img src="./edit.png" alt="" />
      </div>
    </div>
  );
};

export default UserInfo;
