import React, { useState } from "react";

export default function ProfileInfo() {
	// State for managing editing mode
	const [isEditing, setIsEditing] = useState(false);
	// State for tracking email input value
	const [email, setEmail] = useState("");
	// State for tracking password input value
	const [password, setPassword] = useState("");
	// State for tracking first name input value
	const [firstName, setFirstName] = useState("");
	// State for tracking last name input value
	const [lastName, setLastName] = useState("");
	// State for tracking whether user is looking for a job
	const [looking, setLooking] = useState("");
	// State for tracking phone number input value
	const [phoneNumber, setPhoneNumber] = useState("");
	// State for tracking home church input value
	const [homeChurch, setHomeChurch] = useState("");
	// State for tracking resume file
	const [resume, setResume] = useState("");
	// State for tracking testimony input value
	const [testimony, setTestimony] = useState("");

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
		<div>
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
				<input
					className="input-field"
					type="text"
					value={firstName}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setFirstName)}
				/>
			</div>
			<div className="form-group">
				<label>Last Name</label>
				<input
					className="input-field"
					type="text"
					value={lastName}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setLastName)}
				/>
			</div>
			<div className="form-group">
				<label>Looking for a Job?</label>
				<label className="radio-label">
					<input
						type="radio"
						id="looking-for-job"
						value="Yes"
						disabled={!isEditing}
						onChange={(event) => handleInputChange(event, setLooking)}
					/>
					Yes
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="looking-for-job"
						value="No"
						disabled={!isEditing}
						onChange={(event) => handleInputChange(event, setLooking)}
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
				<input
					className="input-field"
					type="email"
					value={email}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setEmail)}
				/>
			</div>
			<div className="form-group">
				<label>Password</label>
				<input
					className="input-field"
					type="password"
					value={password}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setPassword)}
				/>
			</div>
			<div className="form-group">
				<label>Home Church</label>
				<input
					className="input-field"
					type="text"
					value={homeChurch}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setHomeChurch)}
				/>
			</div>
			<div className="form-group">
				<label>Resume</label>
				<input
					className=""
					type="file"
					value={resume}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setResume)}
				/>
			</div>
			<div className="form-group">
				<label>Testimony</label>
				<input
					className="input-field"
					type="text"
					value={testimony}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setTestimony)}
				/>
			</div>
		</div>
	);
}
