import React, { useState } from "react";

export default function SchoolProfileInfo() {
	// State for managing editing mode
	const [isEditing, setIsEditing] = useState(false);
	// State for tracking email input value
	const [email, setEmail] = useState("");
	// State for tracking password input value
	const [password, setPassword] = useState("");
	// State for tracking first name input value
	const [name, setName] = useState("");
	// State for tracking whether user is hiring
	const [hiring, setHiring] = useState("");
	// State for tracking phone number input value
	const [phoneNumber, setPhoneNumber] = useState("");

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
				<h2>Profile Information</h2>
				{/* Header buttons */}
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
				<label>School Name</label>
				<input
					className="input-field"
					type="text"
					value={name}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setName)}
				/>
			</div>

			<div className="form-group">
				<label>Are you hiring?</label>
				{/* Radio buttons for hiring, enabled based on editing state */}
				<label className="radio-label">
					<input
						type="radio"
						id="are-you-hiring"
						value="Yes"
						disabled={!isEditing}
						onChange={(event) => handleInputChange(event, setHiring)}
					/>
					Yes
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="are-you-hiring"
						value="No"
						disabled={!isEditing}
						onChange={(event) => handleInputChange(event, setHiring)}
					/>
					No
				</label>
			</div>
			<div className="form-group">
				<label>Phone Number</label>
				<input
					className="input-field"
					type="text"
					value={phoneNumber}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setPhoneNumber)}
				/>
			</div>
			<div className="form-group">
				<label>Email</label>
				{/* Input field for email, enabled based on editing state */}
				<input
					className="input-field"
					type="email"
					value={email}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setEmail)}
				/>
			</div>

			{/* Form group for password */}
			<div className="form-group">
				<label>Password</label>
				{/* Input field for password, enabled based on editing state */}
				<input
					className="input-field"
					type="password"
					value={password}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setPassword)}
				/>
			</div>
		</div>
	);
}
