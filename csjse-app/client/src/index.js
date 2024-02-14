import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "react-auth-kit";

ReactDOM.render(
	<AuthProvider
		authType={"cookie"}
		authName={"_auth"}
		cookieDomain={window.location.hostname}
		// Switch to true if using https
		cookieSecure={false}
	>
		<Router>
			<App />
		</Router>
	</AuthProvider>,
	document.getElementById("root")
);
