import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth, setPersistence , browserLocalPersistence } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAbFsNdndC3--T6v2YEcUX1-JN_kfDp-Ik",
  authDomain: "ai-assistant-838c8.firebaseapp.com",
  projectId: "ai-assistant-838c8",
  storageBucket: "ai-assistant-838c8.firebasestorage.app",
  messagingSenderId: "354484997169",
  appId: "1:354484997169:web:9b413a2f2d6f7118a9d910",
  measurementId: "G-HY94Z0DB2L"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app);
export const auth = getAuth(app)

export const db = getFirestore(app)
setPersistence(auth , browserLocalPersistence ).catch(err=>{return console.log("Auth Presistence Error", err)})