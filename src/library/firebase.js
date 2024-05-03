// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "whatschat-82019.firebaseapp.com",
  projectId: "whatschat-82019",
  storageBucket: "whatschat-82019.appspot.com",
  messagingSenderId: "689779053388",
  appId: "1:689779053388:web:76285821b500bcf37ef5e9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
