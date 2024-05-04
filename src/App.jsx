import React from "react";
import List from "./components/list/List";
import Chat from "./components/chat/Chat";
import Details from "./components/details/Details";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";

const App = () => {
  const user = false;

  return (
    <div className="container">
      {user ? (
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
