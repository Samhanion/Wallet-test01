// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKJSShJUmKp6bzQKWtTn3HDeJ17FrxlEQ",
  authDomain: "walter-d1d20.firebaseapp.com",
  projectId: "walter-d1d20",
  storageBucket: "walter-d1d20.appspot.com",
  messagingSenderId: "728898552229",
  appId: "1:728898552229:web:ae408a0d56b9960f37e84c",
  measurementId: "G-TBJG4FGBPN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const authentication = getAuth(app);
