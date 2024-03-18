/* This file will be called when the school user goes to their profile and will work with the
   SchoolProfileInfo file to display the users information. */

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { auth } from "../firebase";
import "../styles/Profiles.css";
import "../styles/LogoutConfirmation.css";
import { SchoolHeader } from "../components/Headers";
import LogoutConfirmation from "../components/LogoutConfirmation";
import SchoolOptionalUploads from "../components/SchoolOptionalUploads";
import SchoolProfileInfo from "../components/SchoolProfileInfo";
import JobListings from "../components/JobListings";

function SchoolProfile() {
	const [user, setUser] = useState(null);
	const[userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(true);

	// State to track the active tab
	const [activeTab, setActiveTab] = useState("Profile Information");

	const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false); // State to manage the visibility of the logout confirmation popup

	//gets id from url using react router dom
	const { id } = useParams(); 

	// Function to handle tab click
	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	// Handles the logout button functionality.
	const handleLogout = () => {
		setShowLogoutConfirmation(true); // Show the logout confirmation popup
	};

	const confirmLogout = () => {
		auth
			.signOut()
			.then(() => {
				// Redirects to the home page upon logout
				window.location.href = "/";
			})
			.catch((error) => {
				console.error("Error during logout:", error);
			});
	};

	// Fetches user data from backend
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
		  if (user) {
			setUser(user);

			// Use the ID from the URL or any other source
			const userId = id || user.uid;

			// Retrieve user data 
			fetch(`http://localhost:5000/api/school/users/${userId}`)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.success) {
                            setUserData(data.user);
                            setLoading(false);
                        } else {
                            console.error("Failed to fetch user data");
                            setLoading(false);
                        }
                    })
                    .catch((error) => {
                        console.error("Error during API call:", error);
                        setLoading(false);
                    });

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

	// Sets the active tab to "Profile Information" when the component is first mounted
	useEffect(() => {
		setActiveTab("Profile Information");
	}, []);

	if (loading) {
		return <p>Loading...</p>;
	}

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

						{activeTab === "Job Postings" && <JobListings></JobListings>}
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
};

export default SchoolProfile;
