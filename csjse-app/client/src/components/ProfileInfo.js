import React, { useState } from "react";

export default function ProfileInfo() {
	// State for managing editing mode
	const [isEditing, setIsEditing] = useState(false);
	// State for tracking email input value
	const [email, setEmail] = useState("");
	// State for tracking password input value
	const [password, setPassword] = useState("");

	//need to add state for tracking all other values

	// Function to toggle editing mode
	const toggleEditing = () => {
		setIsEditing(!isEditing);
	};

	// Function to handle saving changes
	const handleSave = () => {
		setIsEditing(false); // Disable editing mode
	};

	// Function to handle email input change
	const handleEmailChange = (event) => {
		setEmail(event.target.value); // Update email state with user input
	};

	// Function to handle password input change
	const handleFirstNameChange = (event) => {
		setPassword(event.target.value); // Update password state with user input
	};

	const handleLastNameChange = (event) => {
		setPassword(event.target.value); // Update password state with user input
	};

	const handleLookingChange = (event) => {
		setPassword(event.target.value); // Update password state with user input
	};

	const handlePhoneNumberChange = (event) => {
		setPassword(event.target.value); // Update password state with user input
	};

	const handleHomeChurchChange = (event) => {
		setPassword(event.target.value); // Update password state with user input
	};

	const handleResumeChange = (event) => {
		setPassword(event.target.value); // Update password state with user input
	};
	const handlePasswordChange = (event) => {
		setPassword(event.target.value); // Update password state with user input
	};
	const handleTestimonyChange = (event) => {
		setPassword(event.target.value); // Update password state with user input
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
				<label>First Name</label>
				<input className="input-field" type="text" value="" disabled />
			</div>
			<div className="form-group">
				<label>Last Name</label>
				<input className="input-field" type="text" value="" disabled />
			</div>
			<div className="form-group">
				<label>Looking for a Job?</label>
				<label className="radio-label">
					<input type="radio" id="looking-for-job" value="Yes" disabled />
					Yes
				</label>
				<label className="radio-label">
					<input type="radio" id="looking-for-job" value="No" disabled />
					No
				</label>
			</div>
			<div className="form-group">
				<label>Phone Number</label>
				<input className="input-field" type="text" value="" disabled />
			</div>
			<div className="form-group">
				<label>Email</label>
				{/* Input field for email, enabled based on editing state */}
				<input
					className="input-field"
					type="email"
					value={email}
					disabled={!isEditing}
					onChange={handleEmailChange}
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
					onChange={handlePasswordChange}
				/>
			</div>
			<div className="form-group">
				<label>Home Church</label>
				<input className="input-field" type="text" value="" disabled />
			</div>

			<div className="form-group">
				<label>Resume</label>
				<input className="" type="file" value="" disabled />
			</div>
			<div className="form-group">
				<label>Testimony</label>
				<input className="input-field" type="text" value="" disabled />
			</div>
		</div>
	);
}
