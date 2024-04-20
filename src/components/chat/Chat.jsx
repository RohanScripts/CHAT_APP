import React, { useState } from "react";
import "./ChatCss.css";
import EmojiPicker from "emoji-picker-react";

const Chat = () => {
  const [openEmoji, setOpenEmoji] = useState(false);

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="text">
            <span>Rohan Shelar</span>
            <p>Lorem ipsum dolor sit amet consectetur,</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center"></div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input type="text" name="" id="" placeholder="type a message..." />
        <div className="emoji">
          <img src="./emoji.png" alt="" />
          <EmojiPicker></EmojiPicker>
        </div>
        <button className="send-button">Send</button>
      </div>
    </div>
  );
};

export default Chat;
