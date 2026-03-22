import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if Firebase config is actually provided
const isFirebaseConfigured = !!firebaseConfig.apiKey;

// Initialize Firebase efficiently for Next.js (prevent re-initializing during hot reloading)
const app = isFirebaseConfigured 
  ? (getApps().length > 0 ? getApp() : initializeApp(firebaseConfig))
  : null;

const auth = app ? getAuth(app) : null as unknown as Auth;

export { app, auth, isFirebaseConfigured };
