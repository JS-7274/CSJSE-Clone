import React, { useState, useEffect } from "react";
import "../styles/Profiles.css";
import { SchoolHeader } from "../components/Headers";

const SchoolProfile = ({ user }) => {
	const [activeTab, setActiveTab] = useState("Welcome");

	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	// Handles logout button redirection functionality.
	const handleLogout = () => {
		window.location.href = "/";
	};

	/* Opens welcome tab in side menu when page is first opened */

	useEffect(() => {
		setActiveTab("Welcome");
	}, []);

	return (
		<div>
			<SchoolHeader></SchoolHeader>

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
							Profile Information
						</button>
						<button
							className={activeTab === "Description" ? "active" : ""}
							onClick={() => handleTabClick("Description")}
						>
							Description
						</button>
						<button
							className={activeTab === "Job Postings" ? "active" : ""}
							onClick={() => handleTabClick("Job Postings")}
						>
							Job Postings
						</button>
					</div>
					<div className="sidebar">
						<button className="logout" onClick={handleLogout}>
							Logout
						</button>
					</div>
				</div>
				<div className="profile-content">
					{activeTab === "Welcome" && (
						<div>
							<h2>Welcome to your profile!</h2>
							{/* Display welcome message here */}
						</div>
					)}
					{activeTab === "Profile Information" && (
						<div>
							<h2>Profile Information</h2>
							{/* Display general profile information here */}
						</div>
					)}
					{activeTab === "Description" && (
						<div>
							<h2>Description</h2>
							{/* Display description (school info) here */}
						</div>
					)}
					{activeTab === "Job Postings" && (
						<div>
							<h2>Job Postings</h2>
							{/* Display job postings here */}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default SchoolProfile;
