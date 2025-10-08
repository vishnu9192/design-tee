// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  FacebookAuthProvider,
  OAuthProvider 
} from "firebase/auth";
import { enableIndexedDbPersistence, initializeFirestore, CACHE_SIZE_UNLIMITED } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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

// Initialize Firebase services with optimizations
export const auth = getAuth(app);

// Initialize Firestore with better cache settings
export const db = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  ignoreUndefinedProperties: true
});

export const storage = getStorage(app);

// Configure social auth providers
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');

export const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope('email');
facebookProvider.addScope('public_profile');

// Instagram uses Facebook provider with Instagram configuration
export const instagramProvider = new OAuthProvider('instagram.com');

// Enable offline persistence only once
if (typeof window !== "undefined") {
  let persistenceEnabled = false;
  
  if (!persistenceEnabled) {
    enableIndexedDbPersistence(db, {
      forceOwnership: false
    })
    .then(() => {
      persistenceEnabled = true;
      console.log('Firebase persistence enabled');
    })
    .catch((err: { code: string }) => {
      if (err.code === 'failed-precondition') {
        console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time');
      } else if (err.code === 'unimplemented') {
        console.warn('The current browser doesn\'t support persistence');
      } else {
        console.warn('Failed to enable persistence:', err);
      }
    });
  }
}

export default app;
