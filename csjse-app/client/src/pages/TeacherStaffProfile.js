import React, { useState, useEffect } from "react";
import "../styles/Profiles.css";
import { TeacherStaffHeader } from "../components/Headers";

const TeacherStaffProfile = ({ user }) => {
	const [activeTab, setActiveTab] = useState("Profile-Information");

	/* useEffect(() => {
        handleTabClick('Profile Information');
    }, []); */

	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	return (
		<div>
			<TeacherStaffHeader></TeacherStaffHeader>

			<div className="profile-container">
				<div className="sidebar">
					<button onClick={() => handleTabClick("Profile Information")}>
						Profile Information
					</button>
					<button onClick={() => handleTabClick("Testimony")}>Testimony</button>
					<button onClick={() => handleTabClick("Resume")}>Resume</button>
				</div>
				<div className="profile-content">
					{activeTab === "Profile Information" && (
						<div>
							<h2>Profile Information</h2>
							{/* Display general profile information here */}
						</div>
					)}
					{activeTab === "Testimony" && (
						<div>
							<h2>Testimony</h2>
							{/* Display testimony here */}
						</div>
					)}
					{activeTab === "Resume" && (
						<div>
							<h2>Resume</h2>
							{/* Display resume here */}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TeacherStaffProfile;
