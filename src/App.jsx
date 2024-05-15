import React, { useEffect } from "react";
import List from "./components/list/List";
import Chat from "./components/chat/Chat";
import Details from "./components/details/Details";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./library/firebase";
import { useUserStore } from "./library/userStore";
import { useChatStore } from "./library/chatStore";

const App = () => {
  const { chatId } = useChatStore();

  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserInfo(user.uid); // Call fetchUserInfo when user is available
      } else {
        fetchUserInfo(null); // Reset state if no user
      }
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      {currentUser ? (
        <>
          <List></List>
          <Chat></Chat>
          <Details></Details>
          {/* {chatId ? <Chat></Chat> : ""}
          {chatId && <Details></Details>} */}
        </>
      ) : (
        <Login></Login>
      )}
      <Notification></Notification>
    </div>
  );
};

export default App;
