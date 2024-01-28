import React, { useState, useEffect } from "react";
import "../styles/Profiles.css";
import { TeacherStaffHeader } from "../components/Headers";

const TeacherStaffProfile = ({ user }) => {
	const [activeTab, setActiveTab] = useState("Login Information");

	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	// Handles the logout button functionality.
	const handleLogout = () => {
		window.location.href = "/";
	};

	/* Opens welcome tab in side menu when page is first opened */

	useEffect(() => {
		setActiveTab("Login Information");
	}, []);

	return (
		<div>
			<TeacherStaffHeader></TeacherStaffHeader>

			<div className="profile-container">
				<div className="side">
					<div className="sidebar">
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
					<div>
						<button className="normal-button" onClick={handleLogout}>
							Logout
						</button>

						<button className="deactivate">Deactivate Account</button>
					</div>
				</div>
				<div className="content">
					<div className="welcome-message">
						<h2>Hello [name]. Welcome to your profile!</h2>
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
								<div className="section-header">
									<h2>Login Information</h2>
									<div className="header-buttons">
										<button>Edit</button>
										<input type="submit" value="Save" disabled />
									</div>
								</div>
								<div className="form-group">
									<label>Email</label>
									<input
										className="input-field"
										type="email"
										value=""
										disabled
									/>
								</div>
								<div className="form-group">
									<label>Password</label>
									<input
										className="input-field"
										type="password"
										value=""
										disabled
									/>
								</div>
							</div>
						)}
						{activeTab === "Profile Information" && (
							<div>
								<div className="section-header">
									<h2>Profile Information</h2>
									<div className="header-buttons">
										<button>Edit</button>
										<input type="submit" value="Save" disabled />
									</div>
								</div>
								<div className="form-group">
									<label>First Name</label>
									<input
										className="input-field"
										type="text"
										value=""
										disabled
									/>
								</div>
								<div className="form-group">
									<label>Last Name</label>
									<input
										className="input-field"
										type="text"
										value=""
										disabled
									/>
								</div>
								<div className="form-group">
									<label>Looking for a Job?</label>
									<label className="radio-label">
										<input
											type="radio"
											id="looking-for-job"
											value="Yes"
											disabled
										/>
										Yes
									</label>
									<label className="radio-label">
										<input
											type="radio"
											id="looking-for-job"
											value="No"
											disabled
										/>
										No
									</label>
								</div>
								<div className="form-group">
									<label>Phone Number</label>
									<input
										className="input-field"
										type="text"
										value=""
										disabled
									/>
								</div>
								<div className="form-group">
									<label>Home Church</label>
									<input
										className="input-field"
										type="text"
										value=""
										disabled
									/>
								</div>
								{/*<div className="form-group">
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
					</div>*/}
								<div className="form-group">
									<label>Resume</label>
									<input className="" type="file" value="" disabled />
								</div>
								<div className="form-group">
									<label>Testimony</label>
									<input
										className="input-field"
										type="text"
										value=""
										disabled
									/>
								</div>
							</div>
						)}
						{activeTab === "References" && (
							<div>
								<div className="section-header">
									<h2>References</h2>
									<div className="header-buttons">
										<button>Edit</button>
										<input type="submit" value="Save" disabled />
									</div>
								</div>
								<h3>Reference 1</h3>
								<div className="form-group">
									<label>Name</label>
									<input
										className="input-field"
										type="text"
										value=""
										disabled
									/>
								</div>
								<div className="form-group">
									<label>Relationship</label>
									<input
										className="input-field"
										type="text"
										value=""
										disabled
									/>
								</div>
								<div className="form-group">
									<label>Phone Number</label>
									<input
										className="input-field"
										type="text"
										value=""
										disabled
									/>
								</div>
								<div className="form-group">
									<label>Email</label>
									<input
										className="input-field"
										type="text"
										value=""
										disabled
									/>
								</div>
								<div className="form-group">
									<label>Address</label>
									<input
										className="input-field"
										type="text"
										value=""
										disabled
									/>
								</div>
								<h3>Reference 2</h3>
								<div className="form-group">
									<label>Name</label>
									<input
										className="input-field"
										type="text"
										value=""
										disabled
									/>
								</div>
								<div className="form-group">
									<label>Relationship</label>
									<input
										className="input-field"
										type="text"
										value=""
										disabled
									/>
								</div>
								<div className="form-group">
									<label>Phone Number</label>
									<input
										className="input-field"
										type="text"
										value=""
										disabled
									/>
								</div>
								<div className="form-group">
									<label>Email</label>
									<input
										className="input-field"
										type="text"
										value=""
										disabled
									/>
								</div>
								<div className="form-group">
									<label>Address</label>
									<input
										className="input-field"
										type="text"
										value=""
										disabled
									/>
								</div>
								<h3>Reference 3</h3>
								<div className="form-group">
									<label>Name</label>
									<input
										className="input-field"
										type="text"
										value=""
										disabled
									/>
								</div>
								<div className="form-group">
									<label>Relationship</label>
									<input
										className="input-field"
										type="text"
										value=""
										disabled
									/>
								</div>
								<div className="form-group">
									<label>Phone Number</label>
									<input
										className="input-field"
										type="text"
										value=""
										disabled
									/>
								</div>
								<div className="form-group">
									<label>Email</label>
									<input
										className="input-field"
										type="text"
										value=""
										disabled
									/>
								</div>
								<div className="form-group">
									<label>Address</label>
									<input
										className="input-field"
										type="text"
										value=""
										disabled
									/>
								</div>
							</div>
						)}
						{activeTab === "Optional Uploads" && (
							<div>
								<div className="section-header">
									<h2>Optional Uploads</h2>
									<div className="header-buttons">
										<button>Edit</button>
										<input type="submit" value="Save" disabled />
									</div>
								</div>
								<div className="form-group">
									<label>References</label>
									<input className="" type="file" value="" disabled />
								</div>
								<div className="form-group">
									<label>Cover Letter</label>
									<input className="" type="file" value="" disabled />
								</div>
								<div className="form-group">
									<label>Headshot</label>
									<input className="" type="file" value="" disabled />
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TeacherStaffProfile;
