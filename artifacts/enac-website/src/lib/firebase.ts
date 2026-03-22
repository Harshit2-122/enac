import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABPOqgdSS1Iwo3DE8Jh0zkLdlkaqB3h2k",
  authDomain: "enac-d6ade.firebaseapp.com",
  projectId: "enac-d6ade",
  storageBucket: "enac-d6ade.firebasestorage.app",
  messagingSenderId: "1000062875385",
  appId: "1:1000062875385:web:62ef1553de99ab57545428",
  measurementId: "G-4EDR7Y12DB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
