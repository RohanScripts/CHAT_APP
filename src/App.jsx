import React, { useEffect } from "react";
import List from "./components/list/List";
import Chat from "./components/chat/Chat";
import Details from "./components/details/Details";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./library/firebase";
import { useUserStore } from "./redux-toolkit/slices/authSlice";
import { useStore } from "react-redux";
import {
  currentUser,
  isLoading,
  fetchUserInfo,
} from "./redux-toolkit/slices/authSlice";

const App = () => {
  // const { currentUser, isLoading, fetchUserInfo } = useStore(useUserStore);
  // const user = false;

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading) return <div>loading...</div>;

  return (
    <div className="container">
      {currentUser ? (
        <>
          <List></List>
          <Chat></Chat>
          <Details></Details>
        </>
      ) : (
        <Login></Login>
      )}
      <Notification></Notification>
    </div>
  );
};

export default App;
