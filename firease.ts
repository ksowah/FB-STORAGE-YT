// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBi7pIliYcesRAMpnLJ2HkTWdIhFtN_14o",
  authDomain: "fbstorageyt.firebaseapp.com",
  projectId: "fbstorageyt",
  storageBucket: "fbstorageyt.appspot.com",
  messagingSenderId: "498667448129",
  appId: "1:498667448129:web:3fda2bb7a952d7580ca3c0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);