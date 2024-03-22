/* This file handles the profile information of teachers and staff and is used with the 
   TeacherStaffProfile file. */

import React, { useState, useEffect } from "react";
import { auth } from "../firebase";

export default function ProfileInfo({ userData }) {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
			} else {
				// Redirect or handle non-authenticated user
				// For example, redirect to the login page
				window.location.href = "/TeacherLogin";
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	// State for managing editing mode
	const [isEditing, setIsEditing] = useState(false);
	// State for tracking contact email input value
	const [email, setEmail] = useState("");
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
	// State for tracking password input value
	const [degree, setDegree] = useState("");
	// State for tracking password input value
	const [location, setLocation] = useState("");
	const [zip, setZip] = useState("");

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

	// Function to handle radio button changes for degree
	const handleDegreeChange = (event) => {
		setDegree(event.target.value);
	};

	useEffect(() => {
		// Update state when userData changes
		setEmail(userData?.contact_email || "");
		setFirstName(userData?.first_name || "");
		setLastName(userData?.last_name || "");
		setPhoneNumber(userData?.phone || "");
		setHomeChurch(userData?.home_church || "");
		setTestimony(userData?.testimony || "");
		setLocation(userData?.location || "");
		setDegree(userData?.degree || "");
		// ... (update other state variables)
	}, [userData]);

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
						name="looking-for-job"
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
						name="looking-for-job"
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
				<label>Contact Email</label>
				<input
					className="input-field"
					type="email"
					value={email}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setEmail)}
				/>
			</div>

			<div className="form-group">
				<label>Location State</label>
				<input
					className="input-field"
					type="text"
					value={location}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setLocation)}
				/>
			</div>

			<div className="form-group">
				<label>Location Zip Code</label>
				<input
					className="input-field"
					type="text"
					value={zip}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setZip)}
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
				<label>Degree Level</label>
				{/* Radio buttons for degree levels */}
				<label className="radio-label">
					<input
						type="radio"
						name="degree-level"
						id="degree-level"
						value="Associate"
						disabled={!isEditing}
						//checked={degree === "Associate's"}
						onChange={handleDegreeChange}
					/>
					Associate's
				</label>
				<label className="radio-label">
					<input
						type="radio"
						name="degree-level"
						id="degree-level"
						value="Bachelor"
						disabled={!isEditing}
						//checked={degree === "Bachelor's"}
						onChange={handleDegreeChange}
					/>
					Bachelor's
				</label>
				<label className="radio-label">
					<input
						type="radio"
						name="degree-level"
						id="degree-level"
						value="Master"
						disabled={!isEditing}
						//checked={degree === "Master's"}
						onChange={handleDegreeChange}
					/>
					Master's
				</label>
				{/* Add more radio buttons for other degree levels as needed */}
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
				<textarea
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
