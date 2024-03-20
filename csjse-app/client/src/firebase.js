/* The purpose of this file is to setup the firebase connection and configure the settings. */

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-3GMNnkcQbp0q86L0-4vucUHWEcdctkE",
  authDomain: "csjse-attempt-1-3d92d.firebaseapp.com",
  projectId: "csjse-attempt-1-3d92d",
  storageBucket: "csjse-attempt-1-3d92d.appspot.com",
  messagingSenderId: "708176402144",
  appId: "1:708176402144:web:416f9ae47851ed1996a285",
  measurementId: "G-LEJ7J5HDHZ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the auth instance for authentication
const auth = getAuth(app);

export { auth };