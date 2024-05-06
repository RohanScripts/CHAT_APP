import React from "react";
import "./addUserCss.css";
import { toast } from "react-toastify";

const AddUser = () => {
  const handleSearchUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="addUser">
      <form onSubmit={handleSearchUser}>
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
