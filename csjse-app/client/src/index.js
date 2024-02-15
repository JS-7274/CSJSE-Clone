import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "react-auth-kit";
import { createRoot } from 'react-dom/client';

const root = createRoot(
	document.getElementById("root")
);

root.render(
	<AuthProvider
		authType={"cookie"}
		authName={"_auth"}
		cookieDomain={window.location.hostname}
		cookieSecure={false}
	>
		<Router>
			<App />
		</Router>
	</AuthProvider>
);


