import React from "react";
import "./addUserCss.css";

const AddUser = () => {
  return (
    <div className="addUser">
      <form>
        <input type="text" name="username" placeholder="username..." id="" />
        <button>Search User</button>
      </form>
      <div className="user">
        <div className="user-details">
          <img src="./avatar.png" alt="" />
          <span>Jane Doe</span>
        </div>
        <button>Add User</button>
      </div>
    </div>
  );
};

export default AddUser;
