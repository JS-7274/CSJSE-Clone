import React, { useState, useEffect } from "react";
import "../styles/Profiles.css";
import { TeacherStaffHeader } from "../components/Headers";

const TeacherStaffProfile = ({ user }) => {
	const [activeTab, setActiveTab] = useState("Welcome");

	const handleTabClick = (tab) => {
		setActiveTab(tab);
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
							className={activeTab === "Profile Information" ? "active" : ""}
							onClick={() => handleTabClick("Profile Information")}
						>
							Login Information
						</button>
						<button
							className={activeTab === "Resume" ? "active" : ""}
							onClick={() => handleTabClick("Resume")}
						>
							Profile Inforamtion
						</button>
						<button
							className={activeTab === "Testimony" ? "active" : ""}
							onClick={() => handleTabClick("Testimony")}
						>
							References
						</button>
						<button
							className={activeTab === "Testimony" ? "active" : ""}
							onClick={() => handleTabClick("Testimony")}
						>
							Optional Uploads
						</button>
					</div>
					<div className="sidebar">
						<button className="logout">Logout</button>
					</div>
					<div className="sidebar">
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
						</div>
					)}
					{activeTab === "Profile Information" && (
						<div>
							<h2>Profile Information</h2>
							{/* Display general profile information here */}
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
