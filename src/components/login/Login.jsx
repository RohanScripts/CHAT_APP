import React from "react";
import "./LoginCss.css";

const Login = () => {
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
            <img src="" alt="" />
            Upload an image
          </label>
          <input type="file" name="" id="file" style={{ display: "none" }} />
          <input type="text" name="username" placeholder="username..." id="" />
          <input type="email" name="email" placeholder="email..." id="" />
          <input type="passoword" name="password" placeholder="password" />
          <button>Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
