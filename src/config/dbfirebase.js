import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "project-call-aad39.firebaseapp.com",
  projectId: "project-call-aad39",
  storageBucket: "project-call-aad39.appspot.com",
  messagingSenderId: "421501421108",
  appId: "1:421501421108:web:0eaf57fe89f1965811ac61",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
