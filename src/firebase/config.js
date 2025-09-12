// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKU2okat07XeXn0GkzjdNJwta9Bw_eb0w",
  authDomain: "petsafe-4f3aa.firebaseapp.com",
  projectId: "petsafe-4f3aa",
  storageBucket: "petsafe-4f3aa.firebasestorage.app",
  messagingSenderId: "1001912592556",
  appId: "1:1001912592556:web:9e70dd499c30be59201709",
  measurementId: "G-V4VE1XDZ61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
