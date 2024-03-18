/* This file is used to display a popup when a user attempts to log out and is called by the
   different profile flies. */

import React from "react";

const LogoutConfirmation = ({ onCancel, onConfirm }) => (
	<div className="logout">
		<p>Are you sure you want to log out?</p>
		<div className="logout-buttons">
			{/* Call onConfirm callback when the "Yes" button is clicked */}
			<button className="yes-button" onClick={onConfirm}>
				Yes
			</button>
			{/* Call onCancel callback when the "No" button is clicked */}
			<button className="no-button" onClick={onCancel}>
				No
			</button>
		</div>
	</div>
);

export default LogoutConfirmation;
