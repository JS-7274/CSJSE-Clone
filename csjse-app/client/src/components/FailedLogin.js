import React from "react";

//Show this if a login attempt failed
const LoginFailed = ({ onClose }) => (
	<div className="loginfailed">
		<p>We're sorry, no account exists with these credentials.</p>
		<button onClick={onClose}>Try Again</button>
	</div>
);

export default LoginFailed;
