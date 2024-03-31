/* This file handles the profile information of teachers and staff and is used with the 
   TeacherStaffProfile file. */

import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { useParams } from "react-router-dom";

export default function ProfileInfo() {
	const [user, setUser] = useState(null);
	const { teacher_staff_id } = useParams();
	const { id } = useParams();
	const [userData, setUserData] = useState({
		teacher_staff_id,
		first_name: "",
		last_name: "",
		looking: "",
		phone: "",
		contact_email: "",
		home_church: "",
		resume: "",
		testimony: "",
		cover_letter: "",
		headshot: "",
		degree: "",
		location: "",
		zip: "",
	});

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

	const [degree, setDegree] = useState("");

	// Function to toggle editing mode
	const toggleEditing = () => {
		setIsEditing(!isEditing);
	};

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await fetch(
					`http://localhost:5000/api/teacher/users/${id}`
				);
				const data = await response.json();

				if (data.success) {
					setUserData(data.user);
				} else {
					console.error("Error fetching user data:", data.message);
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		fetchUser();
	}, [id]);

	// Function to handle saving changes
	const handleSave = async (e) => {
		setIsEditing(false); // Disable editing mode

		e.preventDefault();
		try {
			const response = await fetch(
				"http://localhost:5000/api/updateProfileInfo",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(userData),
				}
			);

			// Parse the response as JSON
			const data = await response.json();

			console.log(data.success);

			// If response is successful, ...
			if (data.success) {
				setUserData(data);
			} else {
				console.error("Error saving changes:", data.error);
			}
		} catch {
			console.error("Error saving changes:", e);
		}
	};

	const handleEdit = async (teacher_staff_id) => {
		try {
			console.log("Editing job with ID:", teacher_staff_id);

			const response = await fetch(
				`http://localhost:5000/api/updateProfileInfo/${teacher_staff_id}`
			);
			const data = await response.json();
			if (data.success) {
				const profile = data.profile;
				setUserData({
					teacher_staff_id: profile.teacher_staff_id,
					first_name: profile.first_name,
					last_name: profile.last_name,
					looking: profile.looking,
					phone: profile.phone,
					contact_email: profile.contact_email,
					home_church: profile.home_church,
					resume: profile.resume,
					testimony: profile.testimony,
					cover_letter: profile.cover_letter,
					headshot: profile.headshot,
					degree: profile.degree,
					location: profile.location,
					zip: profile.zip,
				});
				setUserData(teacher_staff_id);
			} else {
				console.error("Error fetching profile data:", data.error);
			}
		} catch (error) {
			console.error("Error fetching profile data:", error);
		}
	};

	// Function to handle input changes
	const handleChange = (e) => {
		// setter(event.target.value);
		const { name, value } = e.target;
		setUserData({
			...userData,
			[name]: value,
		});
	};

	// Function to handle radio button changes for degree
	const handleDegreeChange = (event) => {
		setDegree(event.target.value);
	};

	/* useEffect(() => {
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
					value={userData.first_name}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Last Name</label>
				<input
					className="input-field"
					type="text"
					value={userData.last_name}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Looking for a Job?</label>
				<label className="radio-label">
					<input
						type="radio"
						id="looking-for-job"
						name="looking-for-job"
						value="Yes"
						disabled={!isEditing}
						onChange={handleChange}
					/>
					Yes
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="looking-for-job"
						name="looking-for-job"
						value="No"
						disabled={!isEditing}
						onChange={handleChange}
					/>
					No
				</label>
			</div>
			<div className="form-group">
				<label>Phone Number</label>
				<input
					className="input-field"
					type="text"
					value={userData.phone}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Contact Email</label>
				<input
					className="input-field"
					type="email"
					value={userData.contact_email}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Home Church</label>
				<input
					className="input-field"
					type="text"
					value={userData.home_church}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Resume</label>
				<input
					className=""
					type="file"
					value={userData.resume}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Testimony</label>
				<textarea
					className="input-field"
					type="text"
					value={userData.testimony}
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
						name="degree-level"
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
				<label>Location (State)</label>
				<input
					className="input-field"
					type="text"
					value={userData.location}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>
		</div>
	);
}
