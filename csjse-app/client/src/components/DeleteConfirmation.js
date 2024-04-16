/* This file is used to display a popup when an admin attempts to delete a job or profile 

   People who have worked on this file: Autumn
   Last worked on: 4/11/2024*/

import React from "react";

const DeleteConfirmation = ({ onCancel, onConfirm }) => (
	<div className="logout">
		<p>Are you sure you want to delete this item?</p>
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

export default DeleteConfirmation;
