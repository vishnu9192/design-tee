// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkVpyq14Rr2aTSVfhotaxHja3ytFA-ZvI",
  authDomain: "designtee-24216.firebaseapp.com",
  projectId: "designtee-24216",
  storageBucket: "designtee-24216.firebasestorage.app",
  messagingSenderId: "83981154768",
  appId: "1:83981154768:web:b60f90171abf98e01ba1d5",
  measurementId: "G-E1FEE8NMH7"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics (only on client side)
export const analytics = typeof window !== "undefined" ? 
  isSupported().then(yes => yes ? getAnalytics(app) : null) : null;

export default app;
