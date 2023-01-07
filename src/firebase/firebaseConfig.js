import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGSI52ra1zmWrZCI-2-8Gd_3SVzC0f8ig",
  authDomain: "track-your-expenses-11b7d.firebaseapp.com",
  projectId: "track-your-expenses-11b7d",
  storageBucket: "track-your-expenses-11b7d.appspot.com",
  messagingSenderId: "326977025530",
  appId: "1:326977025530:web:33ae8329b6be69dae0e043",
  measurementId: "G-VZZN3Y5FNM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };