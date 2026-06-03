import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAb5zcAO7ols-2KHFeq-ET4udpYZWGHQd8",
  authDomain: "aarastech-e455d.firebaseapp.com",
  projectId: "aarastech-e455d",
  storageBucket: "aarastech-e455d.appspot.com",
  messagingSenderId: "993187056747",
  appId: "1:993187056747:web:4b88b0fa61ad2f7d1bb52e",
  measurementId: "G-P787KLEGDV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const storage = getStorage(app);
