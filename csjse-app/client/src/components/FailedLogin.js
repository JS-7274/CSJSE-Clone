/* This file defines a popup for a failed login that will be displayed when applicable. 

   People who have worked on this file: Josh
   Last worked on: 11/20/2023*/

import React from "react";

const LoginFailed = ({ onClose }) => (
	<div className="loginfailed">
		<p>We're sorry, no account exists with these credentials.</p>
		<button onClick={onClose}>Try Again</button>
	</div>
);

export default LoginFailed;
