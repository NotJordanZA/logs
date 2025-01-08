// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiNcLy7OPZm-TM76N5HqtOjS95qrUYJFM",
  authDomain: "dirty-logger.firebaseapp.com",
  projectId: "dirty-logger",
  storageBucket: "dirty-logger.firebasestorage.app",
  messagingSenderId: "999522310355",
  appId: "1:999522310355:web:5ba4d5bc39ea8f384f9c26",
  measurementId: "G-Y3JJJ3518T"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export { signInWithPopup, signOut };