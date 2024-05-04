import React, { useState } from "react";
import "./LoginCss.css";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../library/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../library/upload";

const Login = () => {
  const [loading, setLoading] = useState(false);

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

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.target);

    const { email, password } = Object.fromEntries(formData);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const imgURL = await upload(avatar.file);

      await setDoc(doc(db, "users", response.user.uid), {
        username,
        email,
        id: response.user.uid,
        blocked: [],
        avatar: imgURL,
      });

      await setDoc(doc(db, "userChats", response.user.uid), {
        chats: [],
      });

      toast.success("Account Created");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="item">
        <h2>Welcome Back,</h2>
        <form onSubmit={handleLogin}>
          <input type="email" name="email" placeholder="email..." id="" />
          <input type="passoword" name="password" placeholder="password" />
          <button disabled={loading}>
            {loading ? "loading..." : "Log in"}
          </button>
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
          <input
            type="text"
            required
            name="username"
            placeholder="username..."
            id=""
          />
          <input
            type="email"
            required
            name="email"
            placeholder="email..."
            id=""
          />
          <input
            type="passoword"
            required
            name="password"
            placeholder="password"
          />
          <button disabled={loading}>
            {loading ? "loading..." : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
