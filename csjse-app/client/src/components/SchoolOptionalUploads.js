import React, { useState } from "react";

export default function SchoolOptionalUploads() {
	// State for managing editing mode
	const [isEditing, setIsEditing] = useState(false);
	const [schoolPhoto, setSchoolPhoto] = useState("");

	// Function to toggle editing mode
	const toggleEditing = () => {
		setIsEditing(!isEditing);
	};

	// Function to handle saving changes
	const handleSave = () => {
		setIsEditing(false); // Disable editing mode
	};

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

			<div className="form-group">
				<label>School Photo</label>
				<input
					type="file"
					value={schoolPhoto}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setSchoolPhoto)}
				/>
			</div>
		</div>
	);
}
