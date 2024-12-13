// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-92647.firebaseapp.com",
  projectId: "mern-estate-92647",
  storageBucket: "mern-estate-92647.appspot.com",
  messagingSenderId: "364971161310",
  appId: "1:364971161310:web:5142af14ec050dc653344f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);