/* The purpose of this file is to display information for the teacher user on their own profile.
   This file works with the ProfileInfo file to display the information correctly. */

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { auth } from "../firebase";
import "../styles/Profiles.css";
import "../styles/LogoutConfirmation.css";
import { TeacherStaffHeader } from "../components/Headers";
import LogoutConfirmation from "../components/LogoutConfirmation";
import ProfileInfo from "../components/ProfileInfo";
import References from "../components/References";
import OptionalUploads from "../components/OptionalUploads";

// Functional component for Teacher/Staff profile
const TeacherStaffProfile = () => {
	const [user, setUser] = useState(null);
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState("Profile Information");
	const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
	const { teacher_staff_id } = useParams();

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

	const checkTeacherAccount = async (userId) => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/checkTeacherAccount/${userId}`
			);
			const data = await response.json();

			if (!data.exists) {
				const confirmMsg = "Account Type Is Wrong";
				if (window.confirm(confirmMsg)) {
					window.location.href = "/";
				}
			} else {
				// Fetch user data if user is a teacher
				fetchUserData();
			}
		} catch (error) {
			console.error("Error checking teacher account:", error);
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
				const userId = teacher_staff_id || user.uid;
				checkTeacherAccount(userId);
			} else {
				window.location.href = "/TeacherLogin";
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const fetchUserData = () => {
		fetch(`http://localhost:5000/api/teacher/users/${teacher_staff_id}`)
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
					<div className="welcome-message">
						{/* Welcome message */}
						<h2>Hello {userData?.first_name}. Welcome to your profile!</h2>
					</div>
					<div className="profile-content">
						{/* Render different components based on active tab */}
						{activeTab === "Profile Information" && (
							<ProfileInfo userData={userData}></ProfileInfo>
						)}
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
