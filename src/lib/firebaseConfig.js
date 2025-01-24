// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmLf0YTdGYMGz0TxoucBUgymKj5FgLkeU",
  authDomain: "translator-a0afd.firebaseapp.com",
  projectId: "translator-a0afd",
  storageBucket: "translator-a0afd.firebasestorage.app",
  messagingSenderId: "137183019852",
  appId: "1:137183019852:web:0c79f04919a508d0f885e9",
  measurementId: "G-JJNMN1H752"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export default app;