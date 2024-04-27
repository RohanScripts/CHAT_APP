import React, { useState } from "react";
import "./ChatCss.css";
import EmojiPicker from "emoji-picker-react";

const Chat = () => {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [text, setText] = useState("");

  console.log(text);

  const handelEmoji = (e) => {
    setText((prev) => prev + e.emoji);
  };

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
      <div className="center">
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur
              magni sit culpa dicta mollitia itaque cum provident. Corrupti at
              placeat, nisi, sit odio accusantium, ipsam nam atque facere amet
              porro!
            </p>
            <span>2 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur
              magni sit culpa dicta mollitia itaque cum provident. Corrupti at
              placeat, nisi, sit odio accusantium, ipsam nam atque facere amet
              porro!
            </p>
            <span>2 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur
              magni sit culpa dicta mollitia itaque cum provident. Corrupti at
              placeat, nisi, sit odio accusantium, ipsam nam atque facere amet
              porro!
            </p>
            <span>2 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <img
              src="https://images.unsplash.com/photo-1713955417511-f2bd115230a9?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur
              magni sit culpa dicta mollitia itaque cum provident. Corrupti at
              placeat, nisi, sit odio accusantium, ipsam nam atque facere amet
              porro!
            </p>
            <span>2 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur
              magni sit culpa dicta mollitia itaque cum provident. Corrupti at
              placeat, nisi, sit odio accusantium, ipsam nam atque facere amet
              porro!
            </p>
            <span>2 min ago</span>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          name=""
          id=""
          placeholder="type a message..."
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt=""
            onClick={() => setOpenEmoji((prev) => !prev)}
          />
          <div className="picker">
            <EmojiPicker
              height={350}
              width={300}
              onEmojiClick={handelEmoji}
              open={openEmoji}
            ></EmojiPicker>
          </div>
        </div>
        <button className="send-button">Send</button>
      </div>
    </div>
  );
};

export default Chat;
