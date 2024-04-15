/* This file handles the school information that will be displayed in the School Profile file. 

   People who have worked on this file: Autumn, Matthew, Josh
   Last worked on: 4/11/2024*/

import React, { useState, useEffect } from "react";
import "../styles/Profiles.css";
import { auth } from "../firebase";

export default function SchoolProfileInfo({ userData }) {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
			} else {
				// Redirect or handle non-authenticated user
				// For example, redirect to the login page
				window.location.href = "/SchoolLogin";
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	// State for managing editing mode
	const [isEditing, setIsEditing] = useState(false);
	// State for tracking email input value
	const [email, setEmail] = useState("");
	// State for tracking password input value
	// State for tracking first name input value
	const [name, setName] = useState("");
	// State for tracking whether user is hiring
	const [hiring, setHiring] = useState("");
	// State for tracking phone number input value
	const [phoneNumber, setPhoneNumber] = useState("");
	const [enrollment, setEnrollment] = useState("");
	const [employed, setEmployed] = useState("");
	const [statementOfFaith, setStatmentofFaith] = useState("");
	const [website, setWebsite] = useState("");
	const [location, setLocation] = useState("");
	const [zip, setZip] = useState("");
	const [campuses, setCampuses] = useState("");
	const [accreditation, setAccreditation] = useState("");
	const [gradeRange, setGradeRange] = useState("");

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

	useEffect(() => {
		// Update state when userData changes
		setEmail(userData?.contact_email || "");
		setName(userData?.school_name || "");
		setPhoneNumber(userData?.phone || "");
		// ... (update other state variables)
	}, [userData]);

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
				<label>School Location State</label>
				<input
					className="input-field"
					type="text"
					value={location}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setLocation)}
				/>
			</div>

			<div className="form-group">
				<label>School Location Zip Code</label>
				<p>First 3 Numbers Only</p>
				<input
					className="input-field"
					type="text"
					value={zip}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setZip)}
				/>
			</div>

			<div className="form-group">
				<label>Number of Campuses</label>
				<label className="radio-label">
					<input
						type="radio"
						name="campuses"
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
						name="campuses"
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
						name="campuses"
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
						name="campuses"
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
				<label>Are you hiring?</label>
				{/* Radio buttons for hiring, enabled based on editing state */}
				<label className="radio-label">
					<input
						type="radio"
						name="hiring"
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
						name="hiring"
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
						name="employed"
						id="employed"
						value="Less than 50"
						disabled={!isEditing}
						onChange={(event) => handleInputChange(event, setEmployed)}
					/>
					Less than 50
				</label>
				<label className="radio-label">
					<input
						type="radio"
						name="employed"
						id="employed"
						value="51 to 100"
						disabled={!isEditing}
						onChange={(event) => handleInputChange(event, setEmployed)}
					/>
					51 to 100
				</label>
				<label className="radio-label">
					<input
						type="radio"
						name="employed"
						id="employed"
						value="101 to 150"
						disabled={!isEditing}
						onChange={(event) => handleInputChange(event, setEmployed)}
					/>
					101 to 150
				</label>
				<label className="radio-label">
					<input
						type="radio"
						name="employed"
						id="employed"
						value="151 or Greater"
						disabled={!isEditing}
						onChange={(event) => handleInputChange(event, setEmployed)}
					/>
					151 or Greater
				</label>
			</div>

			{/*Enrollment Size*/}
			<div className="form-group">
				<label>Student Enrollment</label>
				<label className="radio-label">
					<input
						type="radio"
						name="enrollment"
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
						name="enrollment"
						id="enrollment"
						value="200-500"
						disabled={!isEditing}
						onChange={(event) => handleInputChange(event, setEnrollment)}
					/>
					500 to 1,000
				</label>
				<label className="radio-label">
					<input
						type="radio"
						name="enrollment"
						id="enrollment"
						value="200-500"
						disabled={!isEditing}
						onChange={(event) => handleInputChange(event, setEnrollment)}
					/>
					1,000 to 1,500
				</label>
			</div>

			<div className="form-group">
				<label>Grade Ranges Offered</label>
				<label className="radio-label">
					<input
						type="radio"
						name="grade-range"
						id="grade-range"
						value="200-500"
						disabled={!isEditing}
						onChange={(event) => handleInputChange(event, setGradeRange)}
					/>
					200 to 500
				</label>
				<label className="radio-label">
					<input
						type="radio"
						name="grade-range"
						id="grade-range"
						value="200-500"
						disabled={!isEditing}
						onChange={(event) => handleInputChange(event, setGradeRange)}
					/>
					500 to 1,000
				</label>
				<label className="radio-label">
					<input
						type="radio"
						name="grade-range"
						id="grade-range"
						value="200-500"
						disabled={!isEditing}
						onChange={(event) => handleInputChange(event, setGradeRange)}
					/>
					1,000 to 1,500
				</label>
			</div>

			<div className="form-group">
				<label>Contact Email</label>
				{/* Input field for email, enabled based on editing state */}
				<input
					className="input-field"
					type="email"
					value={email}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setEmail)}
				/>
			</div>
		</div>
	);
}
