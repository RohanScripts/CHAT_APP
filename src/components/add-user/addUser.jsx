import React, { useState } from "react";
import "./addUserCss.css";
import { toast } from "react-toastify";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../library/firebase";
import { useUserStore } from "../../library/userStore";

const AddUser = () => {
  const { currentUser } = useUserStore();

  const [user, setUser] = useState(null);
  const handleSearchUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(db, "users");

      const q = query(userRef, where("username", "==", username));

      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleAddUser = async () => {
    const chatRef = collection(db, "chats");
    const userChatRef = collection(db, "userChats");

    try {
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updateAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updateAt: Date.now(),
        }),
      });
    } catch (error) {
      console.log(error + "error of handleAddUser");
      toast.error(error.message);
    }
  };

  return (
    <div className="addUser">
      <form onSubmit={handleSearchUser}>
        <input type="text" name="username" placeholder="username..." id="" />
        <button>Search User</button>
      </form>
      {user && (
        <div className="user">
          <div className="user-details">
            <img src={user.avatar ? user.avatar : "./avatar.png"} alt="" />
            <span>{user.username}</span>
          </div>
          <button onClick={handleAddUser}>Add User</button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
