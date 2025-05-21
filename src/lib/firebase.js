
// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBQKo7RUOjCo0nmTnF794NLWcRZZd2BgI8",
  authDomain: "serbestkategoripuanlama.firebaseapp.com",
  databaseURL: "https://serbestkategoripuanlama-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "serbestkategoripuanlama",
  storageBucket: "serbestkategoripuanlama.firebasestorage.app",
  messagingSenderId: "223649345498",
  appId: "1:223649345498:web:64c6c8d550a2989d459ae3"
};

// Yukarıdaki bilgileri Firebase Console'dan al

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };

