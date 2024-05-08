import React, { useEffect, useRef, useState } from "react";
import "./ChatCss.css";
import EmojiPicker from "emoji-picker-react";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../library/firebase";
import { useChatStore } from "../../library/chatStore";
import { useUserStore } from "../../library/userStore";
import { toast } from "react-toastify";

const Chat = () => {
  const { currentUser } = useUserStore();

  const { chatId, user } = useChatStore();

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

  const handleSend = async () => {
    if (text === "") return;

    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: Date.now(),
        }),
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatRef = doc(db, "userChats", id);
        const userChatSnapShot = await getDoc(userChatRef);

        if (userChatSnapShot.exists()) {
          const userChatData = userChatSnapShot.data();

          const chatIndex = userChatData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatData.chats[chatIndex].lastMessage = text;

          userChatData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;

          userChatData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatRef, {
            chats: userChatData.chats,
          });
        }
      });
    } catch (error) {
      console.log(error + ": error in handleSend");
      toast.error(error);
    }
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
        {chat?.message?.map((eachMessage) => {
          eachMessage && (
            <div className="texts">
              {eachMessage.img && <img src={eachMessage.img} alt="" />}
              <p>{eachMessage.text}</p>
              <span>{eachMessage.createdAt}</span>
            </div>
          );
        })}

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
        <button className="send-button" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
