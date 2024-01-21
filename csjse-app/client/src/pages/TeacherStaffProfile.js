import React, { useState, useEffect } from "react";
import "../styles/Profiles.css";
import { TeacherStaffHeader } from "../components/Headers";

const TeacherStaffProfile = ({ user }) => {
	const [activeTab, setActiveTab] = useState("Welcome");

	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	// Handles the logout button functionality.
	const handleLogout = () => {
		window.location.href = "/";
	};

	/* Opens welcome tab in side menu when page is first opened */

	useEffect(() => {
		setActiveTab("Welcome");
	}, []);

	return (
		<div>
			<TeacherStaffHeader></TeacherStaffHeader>

			<div className="profile-container">
				<div className="side">
					<div className="sidebar">
						<button
							className={activeTab === "Welcome" ? "active" : ""}
							onClick={() => handleTabClick("Welcome")}
						>
							Welcome
						</button>
						<button
							className={activeTab === "Login Information" ? "active" : ""}
							onClick={() => handleTabClick("Login Information")}
						>
							Login Information
						</button>
						<button
							className={activeTab === "Profile Information" ? "active" : ""}
							onClick={() => handleTabClick("Profile Information")}
						>
							Profile Information{" "}
						</button>
						<button
							className={activeTab === "References" ? "active" : ""}
							onClick={() => handleTabClick("References")}
						>
							References{" "}
						</button>
						<button
							className={activeTab === "Optional Uploads" ? "active" : ""}
							onClick={() => handleTabClick("Optional Uploads")}
						>
							Optional Uploads{" "}
						</button>
					</div>
					<div className="">
						<button className="normal-button" onClick={handleLogout}>
							Logout
						</button>

						<button className="deactivate">Deactivate Account</button>
					</div>
				</div>

				<div className="profile-content">
					{activeTab === "Welcome" && (
						<div>
							<h2>Welcome to your profile!</h2>
							{/* Display welcome message here */}
						</div>
					)}
					{activeTab === "Login Information" && (
						<div>
							<h2>Login Information</h2>
							{/* Display general profile information here */}
							<div>
								<label>Email</label>
							</div>
							<div>
								<label>Password</label>
							</div>
						</div>
					)}
					{activeTab === "Profile Information" && (
						<div>
							<div className="section-header">
								<h2>Profile Information</h2>
								<button className="normal-button">Edit</button>
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
								<input className="" type="radio" value="" disabled />
							</div>
							<div className="form-group">
								<label>Phone Number</label>
								<input className="input-field" type="text" value="" disabled />
							</div>
							<div className="form-group">
								<label>Home Church</label>
								<input className="input-field" type="text" value="" disabled />
							</div>
							<div className="form-group">
								<label>Education</label>
							</div>
							<div className="form-group">
								<label>Experience</label>
							</div>
							<div className="form-group">
								<label>Certifications</label>
							</div>
							<div className="form-group">
								<label>Why Christian Ed?</label>
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
					)}
					{activeTab === "References" && (
						<div>
							<h2>References</h2>
							{/* Display resume here */}
						</div>
					)}
					{activeTab === "Optional Uploads" && (
						<div>
							<h2>Optional Uploads</h2>
							{/* Display testimony here */}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TeacherStaffProfile;
