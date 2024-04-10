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
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState("Profile Information");
	const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
	const { school_id } = useParams();

	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	const handleLogout = () => {
		setShowLogoutConfirmation(true);
	};

	const confirmLogout = () => {
		auth
			.signOut()
			.then(() => {
				window.location.href = "/";
			})
			.catch((error) => {
				console.error("Error during logout:", error);
			});
	};

	const checkSchoolAccount = async (schoolId) => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/checkSchoolAccount/${schoolId}`
			);
			const data = await response.json();

			if (!data.exists) {
				const confirmMsg = "Account Type Is Wrong";
				if (window.confirm(confirmMsg)) {
					window.location.href = "/";
				}
			} else {
				// Fetch user data if user is a school
				fetchUserData();
			}
		} catch (error) {
			console.error("Error checking school account:", error);
			const confirmMsg = "An error occurred. Please try again later.";
			if (window.confirm(confirmMsg)) {
				window.location.href = "/";
			}
		}
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
				const userId = school_id || user.uid;
				checkSchoolAccount(userId);
			} else {
				window.location.href = "/SchoolLogin";
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const fetchUserData = () => {
		fetch(`http://localhost:5000/api/school/users/${school_id}`)
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
	};

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
						{/*This is the button for optional uploads. 
						The optional uploads for schools are a school photo or logo. */}

						{/* <button
							className={activeTab === "Optional Uploads" ? "active" : ""}
							onClick={() => handleTabClick("Optional Uploads")}
						>
							Optional Uploads
						</button> */}
					</div>
					<div className="ld-button-group">
						{/* Logout button */}
						<button className="logout-button" onClick={handleLogout}>
							Logout
						</button>

						{/* Deactivate account button
						<button className="deactivate-button">Deactivate Account</button> */}
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
