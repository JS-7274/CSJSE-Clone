import React, { useState, useEffect } from "react";
import "../styles/Profiles.css";
import { SchoolHeader } from "../components/Headers";
import SchoolOptionalUploads from "../components/SchoolOptionalUploads";
import SchoolProfileInfo from "../components/SchoolProfileInfo";
import JobListings from "../components/JobListings";

const SchoolProfile = ({ user }) => {
	const [activeTab, setActiveTab] = useState("Profile Information");

	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	// Handles logout button redirection functionality.
	const handleLogout = () => {
		window.location.href = "/";
	};

	/* Opens welcome tab in side menu when page is first opened */

	useEffect(() => {
		setActiveTab("Profile Information");
	}, []);

	return (
		<div>
			<SchoolHeader></SchoolHeader>

			<div className="profile-container">
				<div className="side">
					<div className="sidebar">
						<button
							className={activeTab === "Profile Information" ? "active" : ""}
							onClick={() => handleTabClick("Profile Information")}
						>
							Profile Information
						</button>

						<button
							className={activeTab === "Job Postings" ? "active" : ""}
							onClick={() => handleTabClick("Job Postings")}
						>
							Job Postings
						</button>
						<button
							className={activeTab === "Optional Uploads" ? "active" : ""}
							onClick={() => handleTabClick("Optional Uploads")}
						>
							Optional Uploads{" "}
						</button>
					</div>
					<div>
						{/* Logout button */}
						<button className="normal-button" onClick={handleLogout}>
							Logout
						</button>

						{/* Deactivate account button */}
						<button className="deactivate">Deactivate Account</button>
					</div>
				</div>
				<div className="content">
					{" "}
					<div className="welcome-message">
						{/* Welcome message */}
						<h2>Hello [name]. Welcome to your profile!</h2>
					</div>
					<div className="profile-content">
						{activeTab === "Profile Information" && (
							<SchoolProfileInfo></SchoolProfileInfo>
						)}

						{activeTab === "Job Postings" && <JobListings></JobListings>}
						{activeTab === "Optional Uploads" && (
							<SchoolOptionalUploads></SchoolOptionalUploads>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SchoolProfile;
