// Importing necessary dependencies and components
import React, { useState, useEffect } from "react";
import "../styles/Profiles.css";
import "../styles/LogoutConfirmation.css";
import { TeacherStaffHeader } from "../components/Headers";
import LogoutConfirmation from "../components/LogoutConfirmation";
import ProfileInfo from "../components/ProfileInfo";
import References from "../components/References";
import OptionalUploads from "../components/OptionalUploads";

// Functional component for Teacher/Staff profile
const TeacherStaffProfile = ({ user }) => {
	// State to manage active tab
	const [activeTab, setActiveTab] = useState("Profile Information");

	const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false); // State to manage the visibility of the logout confirmation popup

	// Function to handle tab click
	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	// Handles the logout button functionality.
	const handleLogout = () => {
		setShowLogoutConfirmation(true); // Show the logout confirmation popup
	};

	const confirmLogout = () => {
		// Perform logout logic here
		window.location.href = "/"; // Redirects to the home page upon logout
	};

	/*
	useEffect hook to set the active tab to "Login Information"
	when the component is first mounted
	 */
	useEffect(() => {
		setActiveTab("Profile Information");
	}, []);

	return (
		<div>
			<TeacherStaffHeader></TeacherStaffHeader> {/* Header component */}
			<div className="profile-container">
				{showLogoutConfirmation && <div className="overlay" />}
				<div className="side">
					<div className="sidebar">
						{/* Tab buttons for different sections */}

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
						{/* Logout button */}
						<button className="normal-button" onClick={handleLogout}>
							Logout
						</button>

						{/* Deactivate account button */}
						<button className="deactivate">Deactivate Account</button>
					</div>
				</div>

				<div className="content">
					<div className="welcome-message">
						{/* Welcome message */}
						<h2>Hello [name]. Welcome to your profile!</h2>
					</div>
					<div className="profile-content">
						{/* Render different components based on active tab */}
						{activeTab === "Profile Information" && <ProfileInfo></ProfileInfo>}
						{activeTab === "References" && <References></References>}
						{activeTab === "Optional Uploads" && (
							<OptionalUploads></OptionalUploads>
						)}
					</div>
				</div>
			</div>
			{showLogoutConfirmation && (
				<LogoutConfirmation
					onCancel={() => setShowLogoutConfirmation(false)}
					onConfirm={confirmLogout}
				/>
			)}
		</div>
	);
};

export default TeacherStaffProfile;
