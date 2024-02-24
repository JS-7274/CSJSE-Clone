import React, { useState, useEffect } from "react";
import "../styles/Profiles.css";
import { SchoolHeader } from "../components/Headers";
import SchoolOptionalUploads from "../components/SchoolOptionalUploads";
import SchoolProfileInfo from "../components/SchoolProfileInfo";
import JobListings from "../components/JobListings";

const SchoolProfile = ({ user }) => {
	// State to track the active tab
	const [activeTab, setActiveTab] = useState("Profile Information");

	// Function to handle tab click
	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	// Handles logout button redirection functionality
	const handleLogout = () => {
		window.location.href = "/";
	};

	// Sets the active tab to "Profile Information" when the component is first mounted
	useEffect(() => {
		setActiveTab("Profile Information");
	}, []);

	return (
		<div>
			{/* School Header */}
			<SchoolHeader></SchoolHeader>

			<div className="profile-container">
				<div className="side">
					<div className="sidebar">
						{/* Buttons for different tabs */}
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
					{/* Welcome message */}
					<div className="welcome-message">
						<h2>Hello [name]. Welcome to your profile!</h2>
					</div>
					<div>
						{/* Renders different components based on the active tab */}
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
