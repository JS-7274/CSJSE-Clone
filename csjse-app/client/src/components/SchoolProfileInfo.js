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
	const [setHiring] = useState("");
	// State for tracking phone number input value
	const [phoneNumber, setPhoneNumber] = useState("");

	const [enrollment, setEnrollment] = useState("");
	const [employed, setEmployed] = useState("");
	const [statementOfFaith, setStatmentofFaith] = useState("");
	const [website, setWebsite] = useState("");
	const [contactEmail, setContactEmail] = useState("");
	const [location, setLocation] = useState("");
	const [campuses, setCampuses] = useState("");
	const [accreditation, setAccreditation] = useState("");

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
				<label>School Location</label>
				<input
					className="input-field"
					type="text"
					value={location}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setLocation)}
				/>
			</div>

			<div className="form-group">
				<label>Number of Campuses</label>
				<label className="radio-label">
					<input
						type="radio"
						id="campuses"
						value="1"
						disabled={!isEditing}
						onChange={(event) => handleInputChange(event, setCampuses)}
					/>
					1
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="campuses"
						value="2"
						disabled={!isEditing}
						onChange={(event) => handleInputChange(event, setCampuses)}
					/>
					2
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="campuses"
						value="3"
						disabled={!isEditing}
						onChange={(event) => handleInputChange(event, setCampuses)}
					/>
					3
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="campuses"
						value="4-orG-reater"
						disabled={!isEditing}
						onChange={(event) => handleInputChange(event, setCampuses)}
					/>
					4 or Greater
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
				<label>Contact Email</label>
				{/* Input field for email, enabled based on editing state */}
				<input
					className="input-field"
					type="email"
					value={contactEmail}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setContactEmail)}
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

			{/*School Website*/}
			<div className="form-group">
				<label>Link to School Website</label>
				<input
					className="input-field"
					type="link"
					value={website}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setWebsite)}
				/>
			</div>

			{/*Statement of Faith*/}
			<div className="form-group">
				<label>Link to Statement of Faith</label>
				<input
					className="input-field"
					type="link"
					value={statementOfFaith}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setStatmentofFaith)}
				/>
			</div>

			<div className="form-group">
				<label>Accreditation</label>
				<input
					className="input-field"
					type="link"
					value={accreditation}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setAccreditation)}
				/>
			</div>

			<div className="form-group">
				<label>Teachers Employed</label>
				<label className="radio-label">
					<input
						type="radio"
						id="employed"
						value="200-500"
						disabled={!isEditing}
						onChange={(event) => handleInputChange(event, setEmployed)}
					/>
					200 to 500
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="employed"
						value="500-1,000"
						disabled={!isEditing}
						onChange={(event) => handleInputChange(event, setEmployed)}
					/>
					500 to 1,000
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="employed"
						value="1,000-1,500"
						disabled={!isEditing}
						onChange={(event) => handleInputChange(event, setEmployed)}
					/>
					1,000 to 1,500
				</label>
			</div>

			{/*Enrollment Size*/}
			<div className="form-group">
				<label>Student Enrollment</label>
				<label className="radio-label">
					<input
						type="radio"
						id="enrollment"
						value="200-500"
						disabled={!isEditing}
						onChange={(event) => handleInputChange(event, setEnrollment)}
					/>
					200 to 500
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="enrollment"
						value="500-1,000"
						disabled={!isEditing}
						onChange={(event) => handleInputChange(event, setEnrollment)}
					/>
					500 to 1,000
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="enrollment"
						value="1,000-1,500"
						disabled={!isEditing}
						onChange={(event) => handleInputChange(event, setEnrollment)}
					/>
					1,000 to 1,500
				</label>
			</div>

			<div className="form-group">
				<label>Login Email</label>
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
