import React, { useState, useEffect } from "react";
import "../styles/Profiles.css";
import { TeacherStaffHeader } from "../components/Headers";
import LoginInfo from "../components/LoginInfo";
import ProfileInfo from "../components/ProfileInfo";
import References from "../components/References";
import OptionalUploads from "../components/OptionalUploads";

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
						{activeTab === "Login Information" && <LoginInfo></LoginInfo>}
						{activeTab === "Profile Information" && <ProfileInfo></ProfileInfo>}
						{activeTab === "References" && <References></References>}
						{activeTab === "Optional Uploads" && (
							<OptionalUploads></OptionalUploads>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TeacherStaffProfile;
