import React from "react";

//Show this if a login attempt failed
const LogoutConfirmation = ({ onClose }) => (
	<div className="logout">
		<p>Are you sure you want to log out?</p>
		<div className="logout-buttons">
			<button className="yes-button">Yes</button>
			<button className="no-button">No</button>
		</div>
	</div>
);

export default LogoutConfirmation;
