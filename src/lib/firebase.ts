import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyC4IOMNN-IORrVSq2zXWCsVU2_KlVxZlt4",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "sumarizer-5e4d9.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "sumarizer-5e4d9",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "sumarizer-5e4d9.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "228276219100",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:228276219100:web:54e18343cf11dbd42f1819",
};

// Force cache clear check if Firebase config is provided
const isFirebaseConfigured = !!firebaseConfig.apiKey;

// Initialize Firebase efficiently for Next.js (prevent re-initializing during hot reloading)
const app = isFirebaseConfigured 
  ? (getApps().length > 0 ? getApp() : initializeApp(firebaseConfig))
  : null;

const auth = app ? getAuth(app) : null as unknown as Auth;

export { app, auth, isFirebaseConfigured };
