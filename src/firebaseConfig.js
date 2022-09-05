
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyBRPrugQZbZROaDPcczriNAHZ0iO-RNTE4",
  authDomain: "ecommerce-app-f74b8.firebaseapp.com",
  projectId: "ecommerce-app-f74b8",
  storageBucket: "ecommerce-app-f74b8.appspot.com",
  messagingSenderId: "193005014578",
  appId: "1:193005014578:web:7920ffe7b3e054d97db62b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const Storage = getStorage(app);
export const db = getFirestore(app);
export default app;