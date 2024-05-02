import React, { useState } from "react";
import "./LoginCss.css";

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

  return (
    <div className="login">
      <div className="item">
        <h2>Welcome Back,</h2>
        <form>
          <input type="email" name="email" placeholder="email..." id="" />
          <input type="passoword" name="password" placeholder="password" />
          <button>Log in</button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Create an account</h2>
        <form>
          <label htmlFor="file">
            <img src={avatar.url ? avatar.url : "./avatar.png"} alt="" />
            Upload an image
          </label>
          <input
            onChange={handleAvatar}
            type="file"
            name=""
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
