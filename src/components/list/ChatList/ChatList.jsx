import React, { useEffect, useState } from "react";
import "./ChatListCss.css";
import AddUser from "../../add-user/addUser";
import { useUserStore } from "../../../library/userStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../library/firebase";

const ChatList = () => {
  const [showMinusIcon, setShowMinusIcon] = useState(false);

  const [chats, setChats] = useState([]);

  const { currentUser } = useUserStore();

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

  console.log(chats);

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

      {chats.map((eachChat) => {
        <div className="items" key={eachChat.chatId}>
          <img src="./avatar.png" alt="" />
          <div className="text">
            <span>Rohan Shelar</span>
            <p>cold coco</p>
          </div>
        </div>;
      })}
      {showMinusIcon ? <AddUser></AddUser> : ""}
    </div>
  );
};

export default ChatList;
