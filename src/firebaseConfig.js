
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyAyLoH-2IEg_gO07pKQ3oz_ReO-2t4YAQs",
  authDomain: "bohemian-ecoomerce.firebaseapp.com",
  projectId: "bohemian-ecoomerce",
  storageBucket: "bohemian-ecoomerce.appspot.com",
  messagingSenderId: "381732445299",
  appId: "1:381732445299:web:600203823f13809c7f9e06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const Storage = getStorage(app);
export const db = getFirestore(app);
export default app;