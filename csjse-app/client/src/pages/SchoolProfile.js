import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/Profiles.css";
import "../styles/LogoutConfirmation.css";
import { SchoolHeader } from "../components/Headers";
import LogoutConfirmation from "../components/LogoutConfirmation";
import SchoolOptionalUploads from "../components/SchoolOptionalUploads";
import SchoolProfileInfo from "../components/SchoolProfileInfo";
import JobListings from "../components/JobListings";

function SchoolProfile({ user }) {
	const [userData, setUserData] = useState(null);

	// State to track the active tab
	const [activeTab, setActiveTab] = useState("Profile Information");

	const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false); // State to manage the visibility of the logout confirmation popup

	//gets id from url using react router dom
	const { school_id } = useParams();

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

	// Fetches user data from backend
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await fetch(
					`http://localhost:5000/api/school/users/${school_id}`
				);
				const data = await response.json();

				if (data.success) {
					setUserData(data.user); // Set the user data directly
				} else {
					console.error("Error fetching user data:", data.message);
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		fetchUserData();
	}, [school_id]);

	// Sets the active tab to "Profile Information" when the component is first mounted
	useEffect(() => {
		setActiveTab("Profile Information");
	}, []);

	return (
		<div>
			{/* School Header */}
			<SchoolHeader></SchoolHeader>

			<div className="profile-container">
				{showLogoutConfirmation && <div className="overlay" />}

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
						<button className="logout-button" onClick={handleLogout}>
							Logout
						</button>

						{/* Deactivate account button */}
						<button className="deactivate-button">Deactivate Account</button>
					</div>
				</div>
				<div className="content">
					{/* Welcome message */}
					<div className="welcome-message">
						<h2>Hello {userData?.school_name}. Welcome to your profile!</h2>
					</div>
					<div>
						{/* Renders different components based on the active tab */}
						{activeTab === "Profile Information" && (
							<SchoolProfileInfo userData={userData}></SchoolProfileInfo>
						)}

						{activeTab === "Job Postings" && <JobListings />}
						{activeTab === "Optional Uploads" && (
							<SchoolOptionalUploads></SchoolOptionalUploads>
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
}

export default SchoolProfile;
