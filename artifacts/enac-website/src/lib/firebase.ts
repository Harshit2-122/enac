import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWa0p8W1EOsATB0UiFxIeOKzaPLbiwnks",
  authDomain: "enac-116dc.firebaseapp.com",
  projectId: "enac-116dc",
  storageBucket: "enac-116dc.firebasestorage.app",
  messagingSenderId: "355730930740",
  appId: "1:355730930740:web:b5fa41521837bba36c9e61",
  measurementId: "G-471XK53EHX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
