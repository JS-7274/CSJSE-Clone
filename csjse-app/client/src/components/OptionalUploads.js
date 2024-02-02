import React, { useState } from "react";

export default function OptionalUploads() {
	// State for managing editing mode
	const [isEditing, setIsEditing] = useState(false);
	// State for tracking email input value
	const [coverLetter, setCoverLetter] = useState("");
	// State for tracking password input value
	const [headshot, setHeadshot] = useState("");

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
		<div>
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
				<label>Cover Letter</label>
				<input
					type="file"
					value={coverLetter}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setCoverLetter)}
				/>
			</div>
			<div className="form-group">
				<label>Headshot</label>
				<input
					type="file"
					value={headshot}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setHeadshot)}
				/>
			</div>
		</div>
	);
}
