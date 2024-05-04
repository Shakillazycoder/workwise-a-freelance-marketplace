// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtdAMMIK15x9b6UEqIwhzAKnPuQOho-x8",
  authDomain: "workwise-markerplace.firebaseapp.com",
  projectId: "workwise-markerplace",
  storageBucket: "workwise-markerplace.appspot.com",
  messagingSenderId: "324046226652",
  appId: "1:324046226652:web:3970971c12846e05326019"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
