/* This file handles the profile information of teachers and staff and is used with the 
   TeacherStaffProfile file. 
   
   People who have worked on this file: Autumn, Matthew, Josh
   Last worked on: 3/25/2024*/

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/Profiles.css";
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
	const { teacher_staff_id } = useParams();

	const [teacherStaffData, setTeacherStaffData] = useState({
		teacher_staff_id,
		first_name: "",
		last_name: "",
		looking: "",
		phone: "",
		contact_email: "",
		location: "",
		zip: "",
		home_church: "",
		degree: "",
		resume: "",
		testimony: "",
	});

	const [lookingForJob, setLookingForJob] = useState("");
	const [degreeLevel, setDegreeLevel] = useState("");

	useEffect(() => {
		const fetchTeacherStaffData = async () => {
			try {
				const response = await fetch(
					`http://localhost:5000/api/teacher/users/${teacher_staff_id}`
				);
				const data = await response.json();

				if (data.success) {
					setTeacherStaffData(data.user);
				} else {
					console.error("Error fetching user data:", data.message);
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};
		fetchTeacherStaffData();
	}, [teacher_staff_id]);

	// Function to toggle editing mode
	const toggleEditing = () => {
		setIsEditing(!isEditing);
	};

	// Function to handle saving changes
	const handleSave = async (e) => {
		try {
			const response = await fetch(
				"http://localhost:5000/api/updateTeacherStaffProfile/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						...teacherStaffData,
						looking: lookingForJob,
						degree: degreeLevel,
					}),
				}
			);

			// Parse the response as JSON
			const data = await response.json();

			console.log(data.success);

			// If response is successful, ...
			if (data.success) {
				setIsEditing(false);
				//fetchSchoolData();
			} else {
				console.error("Error during teacher staff profile update:", data.error);
			}
		} catch (error) {
			console.error("Error during teacher staff profile update:", error);
		}
	};

	// Function to handle input changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setTeacherStaffData({
			...teacherStaffData,
			[name]: value,
		});
	};

	/* 	// Function to handle radio button changes for degree
	const handleDegreeChange = (event) => {
		setDegree(event.target.value);
	}; */

	/* useEffect(() => {
		// Update state when userData changes
		setFirstName(userData?.first_name || "");
		setLastName(userData?.last_name || "");
		setLooking(userData?.looking || "");
		setPhoneNumber(userData?.phone || "");
		setEmail(userData?.contact_email || "");
		setLocation(userData?.location || "");
		setZip(userData?.zip || "");
		setHomeChurch(userData?.home_church || "");
		setDegree(userData?.degree || "");
		setResume(userData?.resume || "");
		setTestimony(userData?.testimony || "");
		// ... (update other state variables)
	}, [userData]); */

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
					id="first_name"
					name="first_name"
					value={teacherStaffData.first_name}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Last Name</label>
				<input
					className="input-field"
					type="text"
					id="last_name"
					name="last_name"
					value={teacherStaffData.last_name}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Looking for a Job?</label>
				<label className="radio-label">
					<input
						type="radio"
						name="looking"
						id="looking"
						value="yes"
						checked={lookingForJob === "yes"}
						disabled={!isEditing}
						onChange={() => setLookingForJob("yes")}
					/>
					Yes
				</label>
				<label className="radio-label">
					<input
						type="radio"
						name="looking"
						id="looking"
						value="no"
						checked={lookingForJob === "no"}
						disabled={!isEditing}
						onChange={() => setLookingForJob("no")}
					/>
					No
				</label>
			</div>
			<div className="form-group">
				<label>Phone Number</label>
				<input
					className="input-field"
					type="text"
					name="phone"
					id="phone"
					value={teacherStaffData.phone}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Contact Email</label>
				<input
					className="input-field"
					type="email"
					name="contact_email"
					id="contact_email"
					value={teacherStaffData.contact_email}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>

			<div className="form-group">
				<label>Location State</label>
				<input
					className="input-field"
					type="text"
					name="location"
					id="location"
					value={teacherStaffData.location}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>

			<div className="form-group">
				<label>Location Zip Code</label>
				<p>First 3 Numbers Only</p>
				<input
					className="input-field"
					type="text"
					name="zip"
					id="zip"
					value={teacherStaffData.zip}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>

			<div className="form-group">
				<label>Home Church</label>
				<input
					className="input-field"
					type="text"
					name="home_church"
					id="home_church"
					value={teacherStaffData.home_church}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Degree Level</label>
				{/* Radio buttons for degree levels */}
				<label className="radio-label">
					<input
						type="radio"
						name="degree"
						id="degree"
						value="associate"
						checked={degreeLevel === "associate"}
						disabled={!isEditing}
						onChange={() => setDegreeLevel("associate")}
					/>
					Associate's
				</label>
				<label className="radio-label">
					<input
						type="radio"
						name="degree"
						id="degree"
						value="bachelor"
						checked={degreeLevel === "bachelor"}
						disabled={!isEditing}
						onChange={() => setDegreeLevel("bachelor")}
					/>
					Bachelor's
				</label>
				<label className="radio-label">
					<input
						type="radio"
						name="degree"
						id="degree"
						value="master"
						checked={degreeLevel === "master"}
						disabled={!isEditing}
						onChange={() => setDegreeLevel("master")}
					/>
					Master's
				</label>
				{/* Add more radio buttons for other degree levels as needed */}
			</div>
			<div className="form-group">
				<label>Resume</label>
				<input
					className="input-field"
					type="link"
					name="resume"
					id="resume"
					value={teacherStaffData.resume}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Testimony</label>
				<textarea
					className="input-field"
					type="text"
					name="testimony"
					id="testimony"
					value={teacherStaffData.testimony}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>
		</div>
	);
}
