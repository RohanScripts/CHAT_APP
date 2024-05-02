import React, { useState } from "react";
import "./ChatListCss.css";
import AddUser from "../../add-user/addUser";

const ChatList = () => {
  const [showMinusIcon, setShowMinusIcon] = useState(false);

  return (
    <div className="chat-list">
      <div className="search">
        <div className="search-bar">
          <img src="./search.png" alt="" />
          <input type="text" placeholder="Search..." />
        </div>
        <img
          src={showMinusIcon ? "./minus.png" : "./plus.png"}
          onClick={() => setShowMinusIcon((prev) => !prev)}
          className="plus"
        />
      </div>
      <div className="items">
        <img src="./avatar.png" alt="" />
        <div className="text">
          <span>Rohan Shelar</span>
          <p>cold coco</p>
        </div>
      </div>
      <div className="items">
        <img src="./avatar.png" alt="" />
        <div className="text">
          <span>Rohan Shelar</span>
          <p>cold coco</p>
        </div>
      </div>
      <div className="items">
        <img src="./avatar.png" alt="" />
        <div className="text">
          <span>Rohan Shelar</span>
          <p>cold coco</p>
        </div>
      </div>
      <div className="items">
        <img src="./avatar.png" alt="" />
        <div className="text">
          <span>Rohan Shelar</span>
          <p>cold coco</p>
        </div>
      </div>
      <div className="items">
        <img src="./avatar.png" alt="" />
        <div className="text">
          <span>Rohan Shelar</span>
          <p>cold coco</p>
        </div>
      </div>
      <div className="items">
        <img src="./avatar.png" alt="" />
        <div className="text">
          <span>Rohan Shelar</span>
          <p>cold coco</p>
        </div>
      </div>
      <div className="items">
        <img src="./avatar.png" alt="" />
        <div className="text">
          <span>Rohan Shelar</span>
          <p>cold coco</p>
        </div>
      </div>
      <AddUser></AddUser>
    </div>
  );
};

export default ChatList;
