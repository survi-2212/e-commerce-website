
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyAlJU_DmaH3rkcCACdRcWoPyvCl03EAwQM",
  authDomain: "ecommerce-app-1d4eb.firebaseapp.com",
  projectId: "ecommerce-app-1d4eb",
  storageBucket: "ecommerce-app-1d4eb.appspot.com",
  messagingSenderId: "228228852059",
  appId: "1:228228852059:web:2456b1ea5b325ce10f527e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const Storage = getStorage(app);
export const db = getFirestore(app);
export default app;