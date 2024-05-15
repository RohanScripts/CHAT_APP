import React, { useEffect, useState } from "react";
import "./ChatListCss.css";
import AddUser from "../../add-user/addUser";
import { useUserStore } from "../../../library/userStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../library/firebase";
import { useChatStore } from "../../../library/chatStore";
import { update } from "firebase/database";

const ChatList = () => {
  const [showMinusIcon, setShowMinusIcon] = useState(false);

  const [chats, setChats] = useState([]);

  const { currentUser } = useUserStore();

  const { chatId, changeChat } = useChatStore();

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userChats", currentUser.id),
      async (res) => {
        const items = res.data().chats;

        const promises = items.map(async (eachItem) => {
          const userDocRef = doc(db, "users", eachItem.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...eachItem, user };
        });

        const chatData = await Promise.all(promises);

        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser.id]);

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );

    userChats[chatIndex].isSeen = true;

    const useChatRef = doc(db, "userchats", currentUser.id);

    try {
      await updateDoc(useChatRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
    } catch (error) {
      console.log(error + " : error in handleSelect");
    }
  };

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

      {chats.map((eachChat) => (
        <div
          style={{
            backgroundColor: eachChat.isSeen ? "transparent" : "#7CB9E8",
          }}
          className="items"
          key={eachChat.chatId}
          onClick={() => handleSelect(eachChat)}
        >
          <img
            src={eachChat.user.avatar ? eachChat.user.avatar : "./avatar.png"}
            alt=""
          />
          <div className="text">
            <span>{eachChat.user.username}</span>
            <p>{eachChat.lastMessage}</p>
          </div>
        </div>
      ))}
      {showMinusIcon ? <AddUser></AddUser> : ""}
    </div>
  );
};

export default ChatList;
