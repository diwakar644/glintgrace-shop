// frontend/src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// --- REPLACE THIS SECTION WITH YOUR KEYS ---
// Go to Firebase Console -> Project Settings -> General -> Scroll down to "Your apps"
const firebaseConfig = {
  apiKey: "AIzaSyDnI2hh56TZND3BIt9-msoYjBfqzekAEt8",
  authDomain: "glintgrace-auth.firebaseapp.com",
  projectId: "glintgrace-auth",
  storageBucket: "glintgrace-auth.firebasestorage.app",
  messagingSenderId: "881245731874",
  appId: "1:881245731874:web:2b729317daeca11abb5e7b",
  measurementId: "G-CE47REW3XC"
};
// -------------------------------------------

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the Auth tool so we can use it in Login.tsx
export const auth = getAuth(app);