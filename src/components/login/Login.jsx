import React, { useState } from "react";
import "./LoginCss.css";
import { toast } from "react-toastify";

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);

    console.log(username, email, password);
  };

  return (
    <div className="login">
      <div className="item">
        <h2>Welcome Back,</h2>
        <form onSubmit={handleLogin}>
          <input type="email" name="email" placeholder="email..." id="" />
          <input type="passoword" name="password" placeholder="password" />
          <button>Log in</button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Create an account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={avatar.url ? avatar.url : "./avatar.png"} alt="" />
            Upload an image
          </label>
          <input
            onChange={handleAvatar}
            type="file"
            id="file"
            style={{ display: "none" }}
          />
          <input type="text" name="username" placeholder="username..." id="" />
          <input type="email" name="email" placeholder="email..." id="" />
          <input type="passoword" name="password" placeholder="password" />
          <button>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
