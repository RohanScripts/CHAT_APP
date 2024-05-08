import React, { useEffect, useRef, useState } from "react";
import "./ChatCss.css";
import EmojiPicker from "emoji-picker-react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../library/firebase";
import { useChatStore } from "../../library/chatStore";

const Chat = () => {
  const { chatId } = useChatStore();

  const [chat, setChat] = useState();
  const [openEmoji, setOpenEmoji] = useState(false);
  const [text, setText] = useState("");

  const handelEmoji = (e) => {
    setText((prev) => prev + e.emoji);
  };

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

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
        {chat?.message?.map((eachMessage) => (
          <div className="message own" key={eachMessage?.createdAt}>
            <div className="texts">
              {eachMessage.img && <img src={eachMessage.img} alt="" />}
              <p>{eachMessage.text}</p>
              {/* <span>2 min ago</span> */}
            </div>
          </div>
        ))}

        <div ref={endRef}></div>
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
