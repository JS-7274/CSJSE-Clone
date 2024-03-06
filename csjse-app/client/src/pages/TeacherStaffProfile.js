// Importing necessary dependencies and components
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

	// State to manage active tab
	const [activeTab, setActiveTab] = useState("Profile Information");

	const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false); // State to manage the visibility of the logout confirmation popup

	// Gets id from URL using react router dom
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
			fetch(`http://localhost:5000/api/teacher/users/${userId}`)
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
			window.location.href = "/TeacherLogin";
		  }
		});
	
		return () => {
		  unsubscribe();
		};
	  }, []);

	/*
	useEffect hook to set the active tab to "Login Information"
	when the component is first mounted
	 */
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
					<div className="welcome-message">
						{/* Welcome message */}
						<h2>Hello {userData?.first_name}. Welcome to your profile!</h2>
					</div>
					<div className="profile-content">
						{/* Render different components based on active tab */}
						{activeTab === "Profile Information" && 
							(<ProfileInfo userData={userData}></ProfileInfo>)}
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
