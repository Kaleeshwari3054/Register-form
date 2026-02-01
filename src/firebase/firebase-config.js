// firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Your config

  apiKey: "AIzaSyBQejeITlySoICwdgh9CCCpMzA5DPURBcQ",
  authDomain: "admin-form-3997b.firebaseapp.com",
  projectId: "admin-form-3997b",
  storageBucket: "admin-form-3997b.firebasestorage.app",
  messagingSenderId: "958079577255",
  appId: "1:958079577255:web:3a2723f37c1fb8d816ff82",
  measurementId: "G-YXCPLNQ638"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);



