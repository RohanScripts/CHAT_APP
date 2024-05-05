import { createSlice } from "@reduxjs/toolkit";
import { set } from "firebase/database";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../library/firebase";

const initialState = {
  currentUser: null,
};

export const useUserStore = createSlice({
  name: "auth",
  initialState,
  isLoading: true,
  reducers: {
    fetchUserInfo: async (uid) => {
      if (!uid) {
        return set({ currentUser: null, isLoading: false });
      }

      try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          set({ currentUser: docSnap.data(), isLoading: false });
        } else {
          set({ currentUser: null, isLoading: false });
        }
      } catch (error) {
        console.log(error);
        set({ currentUser: null, isLoading: false });
      }
    },
  },
});

export const { fetchUserInfo, currentUser, isLoading } = useUserStore.actions;

export default useUserStore.reducer;
