/* This document wraps around the app.js file and contains it in a router for routing.
   This document also works with the firebase.js file to establish the connection to 
   firebase authentication.
   
   People who have worked on this file: Autumn, Josh
   Last worked on: 3/15/2024*/

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { createRoot } from 'react-dom/client';
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


const root = createRoot(
	document.getElementById("root")
);

root.render(
		<Router>
			<App auth={auth} />
		</Router>
);


