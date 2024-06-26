/* This page will handle optional uploads for the school user.
 
   People who have worked on this file: Autumn
   Last worked on: 2/15/2024*/

import React, { useState } from "react";

export default function SchoolOptionalUploads() {
	// State for managing editing mode
	const [isEditing, setIsEditing] = useState(false);
	// State for tracking school photo
	const [schoolPhoto, setSchoolPhoto] = useState("");
	// State for tracking school logo
	const [schoolLogo, setSchoolLogo] = useState("");

	// Function to toggle editing mode
	const toggleEditing = () => {
		setIsEditing(!isEditing);
	};

	// Function to handle saving changes
	const handleSave = () => {
		setIsEditing(false); // Disable editing mode
	};

	// Function to handle input changes
	const handleInputChange = (event, setter) => {
		setter(event.target.value);
	};

	return (
		<div className="profile-content">
			<div className="section-header">
				<h2>Optional Uploads</h2>
				<div className="header-buttons">
					{/* Edit button toggles editing state */}
					<input
						type="submit"
						value="Edit"
						disabled={isEditing}
						onClick={toggleEditing}
					/>
					{/* Save button enabled only when in editing mode */}
					<input
						type="submit"
						value="Save"
						disabled={!isEditing}
						onClick={handleSave}
					/>
				</div>
			</div>

			{/* Form group for school photo */}
			<div className="form-group">
				<label>School Photo</label>
				<input
					type="file"
					value={schoolPhoto}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setSchoolPhoto)}
				/>
			</div>

			{/* Form group for school logo */}
			<div className="form-group">
				<label>School Logo</label>
				<input
					type="file"
					value={schoolLogo}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setSchoolLogo)}
				/>
			</div>
		</div>
	);
}
