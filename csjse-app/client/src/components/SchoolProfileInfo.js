/* This file handles the school information that will be displayed in the School Profile file. 

   People who have worked on this file: Autumn, Matthew, Josh
   Last worked on: 4/11/2024*/

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
	const { school_id } = useParams();

	const [schoolData, setSchoolData] = useState({
		school_id,
		school_name: "",
		location: "",
		zip: "",
		campus_number: "",
		phone: "",
		looking: "",
		website: "",
		statement_of_faith: "",
		accreditation: "",
		teachers_employed: "",
		student_enrollment: "",
		grade_range: "",
		contact_email: "",
	});

	const [campusNumber, setCampusNumber] = useState("");
	const [lookingToHire, setLookingToHire] = useState("");
	const [teachersEmployed, setTeachersEmployeed] = useState("");
	const [studentEnrollment, setStudentEnrollment] = useState("");
	const [gradeRange, setGradeRange] = useState("");

	useEffect(() => {
		const fetchSchoolData = async () => {
			try {
				const response = await fetch(
					`http://localhost:5000/api/school/users/${school_id}`
				);
				const data = await response.json();

				if (data.success) {
					setSchoolData(data.user);
				} else {
					console.error("Error fetching user data:", data.message);
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};
		fetchSchoolData();
	}, [school_id]);

	// Function to toggle editing mode
	const toggleEditing = () => {
		setIsEditing(!isEditing);
	};

	// Function to handle saving changes
	const handleSave = async (e) => {
		try {
			const response = await fetch(
				"http://localhost:5000/api/updateSchoolProfile/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						...schoolData,
						campus_number: campusNumber,
						looking: lookingToHire,
						teachers_employed: teachersEmployed,
						student_enrollment: studentEnrollment,
						grade_range: gradeRange,
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
				console.error("Error during school profile update:", data.error);
			}
		} catch (error) {
			console.error("Error during school profile update:", error);
		}
	};

	/* // Function to handle input changes
	const handleInputChange = (event, setter) => {
		setter(event.target.value);
	}; */

	/* useEffect(() => {
		// Update state when userData changes
		setEmail(userData?.contact_email || "");
		setName(userData?.school_name || "");
		setPhoneNumber(userData?.phone || "");
		// ... (update other state variables)
	}, [userData]); */

	const handleChange = (e) => {
		const { name, value } = e.target;
		setSchoolData({
			...schoolData,
			[name]: value,
		});
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
					id="school_name"
					name="school_name"
					value={schoolData.school_name}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>

			<div className="form-group">
				<label>School Location State</label>
				<input
					className="input-field"
					type="text"
					id="location"
					name="location"
					value={schoolData.location}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>

			<div className="form-group">
				<label>School Location Zip Code</label>
				<p>First 3 Numbers Only</p>
				<input
					className="input-field"
					type="text"
					id="zip"
					name="zip"
					value={schoolData.zip}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>

			<div className="form-group">
				<label>Number of Campuses</label>
				<label className="radio-label">
					<input
						type="radio"
						id="campus_number"
						name="campus_number"
						value="1"
						checked={campusNumber === "1"}
						disabled={!isEditing}
						onChange={() => setCampusNumber("1")}
					/>
					1
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="campus_number"
						name="campus_number"
						value="2"
						checked={campusNumber === "2"}
						disabled={!isEditing}
						onChange={() => setCampusNumber("2")}
					/>
					2
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="campus_number"
						name="campus_number"
						value="3"
						checked={campusNumber === "3"}
						disabled={!isEditing}
						onChange={() => setCampusNumber("3")}
					/>
					3
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="campus_number"
						name="campus_number"
						value="4 or greater"
						checked={campusNumber === "4 or greater"}
						disabled={!isEditing}
						onChange={() => setCampusNumber("4 or greater")}
					/>
					4 or Greater
				</label>
			</div>

			<div className="form-group">
				<label>Phone Number</label>
				<input
					className="input-field"
					type="text"
					id="phone"
					name="phone"
					value={schoolData.phone}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>

			<div className="form-group">
				<label>Are you hiring?</label>
				{/* Radio buttons for hiring, enabled based on editing state */}
				<label className="radio-label">
					<input
						type="radio"
						id="looking"
						name="looking"
						value="yes"
						checked={lookingToHire === "yes"}
						disabled={!isEditing}
						onChange={() => setLookingToHire("yes")}
					/>
					Yes
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="looking"
						name="looking"
						value="no"
						checked={lookingToHire === "no"}
						disabled={!isEditing}
						onChange={() => setLookingToHire("no")}
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
					id="website"
					name="website"
					value={schoolData.website}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>

			{/*Statement of Faith*/}
			<div className="form-group">
				<label>Statement of Faith</label>
				<input
					className="input-field"
					type="text"
					id="statement_of_faith"
					name="statement_of_faith"
					value={schoolData.statement_of_faith}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>

			<div className="form-group">
				<label>Accreditation</label>
				<input
					className="input-field"
					type="link"
					id="accreditation"
					name="accreditation"
					value={schoolData.accreditation}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>

			<div className="form-group">
				<label>Teachers Employed</label>
				<label className="radio-label">
					<input
						type="radio"
						name="teachers_employed"
						id="teachers_employed"
						value="less than 50"
						checked={teachersEmployed === "less than 50"}
						disabled={!isEditing}
						onChange={() => setTeachersEmployeed("less than 50")}
					/>
					Less than 50
				</label>
				<label className="radio-label">
					<input
						type="radio"
						name="teachers_employed"
						id="teachers_employed"
						value="51 to 100"
						checked={teachersEmployed === "51 to 100"}
						disabled={!isEditing}
						onChange={() => setTeachersEmployeed("51 to 100")}
					/>
					51 to 100
				</label>
				<label className="radio-label">
					<input
						type="radio"
						name="teachers_employed"
						id="teachers_employed"
						value="101 to 150"
						checked={teachersEmployed === "101 to 150"}
						disabled={!isEditing}
						onChange={() => setTeachersEmployeed("101 to 150")}
					/>
					101 to 150
				</label>
				<label className="radio-label">
					<input
						type="radio"
						name="teachers_employed"
						id="teachers_employed"
						value="151 or Greater"
						checked={teachersEmployed === "151 or greater"}
						disabled={!isEditing}
						onChange={() => setTeachersEmployeed("151 or greater")}
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
						name="student_enrollment"
						id="student_enrollment"
						value="200 to 500"
						checked={studentEnrollment === "200 to 500"}
						disabled={!isEditing}
						onChange={() => setStudentEnrollment("200 to 500")}
					/>
					200 to 500
				</label>
				<label className="radio-label">
					<input
						type="radio"
						name="student_enrollment"
						id="student_enrollment"
						value="501 to 1,000"
						checked={studentEnrollment === "501 to 1,000"}
						disabled={!isEditing}
						onChange={() => setStudentEnrollment("501 to 1,000")}
					/>
					500 to 1,000
				</label>
				<label className="radio-label">
					<input
						type="radio"
						name="student_enrollment"
						id="student_enrollment"
						value="1,001 to 1,500"
						checked={studentEnrollment === "1,001 to 1,500"}
						disabled={!isEditing}
						onChange={() => setStudentEnrollment("1,001 to 1,500")}
					/>
					1,000 to 1,500
				</label>
				<label className="radio-label">
					<input
						type="radio"
						name="student_enrollment"
						id="student_enrollment"
						value="1,501 or greater"
						checked={studentEnrollment === "1,501 or greater"}
						disabled={!isEditing}
						onChange={() => setStudentEnrollment("1,501 or greater")}
					/>
					1,501 or Greater
				</label>
			</div>

			<div className="form-group">
				<label>Grade Ranges Offered</label>
				<label className="radio-label">
					<input
						type="radio"
						name="grade_range"
						id="grade_range"
						value="k through 12"
						checked={gradeRange === "k through 12"}
						disabled={!isEditing}
						onChange={() => setGradeRange("k through 12")}
					/>
					K through 12
				</label>
				<label className="radio-label">
					<input
						type="radio"
						name="grade_range"
						id="grade_range"
						value="elementary"
						checked={gradeRange === "elementary"}
						disabled={!isEditing}
						onChange={() => setGradeRange("elementary")}
					/>
					Elementary
				</label>
				<label className="radio-label">
					<input
						type="radio"
						name="grade_range"
						id="grade_range"
						value="middle"
						checked={gradeRange === "middle"}
						disabled={!isEditing}
						onChange={() => setGradeRange("middle")}
					/>
					Middle
				</label>
				<label className="radio-label">
					<input
						type="radio"
						name="grade_range"
						id="grade_range"
						value="high"
						checked={gradeRange === "high"}
						disabled={!isEditing}
						onChange={() => setGradeRange("high")}
					/>
					High
				</label>
				<label className="radio-label">
					<input
						type="radio"
						name="grade_range"
						id="grade_range"
						value="college"
						checked={gradeRange === "college"}
						disabled={!isEditing}
						onChange={() => setGradeRange("college")}
					/>
					College
				</label>
			</div>

			<div className="form-group">
				<label>Contact Email</label>
				{/* Input field for email, enabled based on editing state */}
				<input
					className="input-field"
					type="email"
					name="contact_email"
					id="contact_email"
					value={schoolData.contact_email}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>
		</div>
	);
}
