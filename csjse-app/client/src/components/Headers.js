/* Headers.js */
/* Creates header components to be used for teacher/staff or school agent view of the website 

   People who have worked on this file: Autumn, Josh
   Last worked on: 4/11/2024*/

import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import "../styles/Headers.css";
import LogoutConfirmation from "../components/LogoutConfirmation";

function TeacherStaffHeader() {
	const location = useLocation();
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const isActive = (path) => {
		return location.pathname === path;
	};

	return (
		<div className="header">
			<div className="logo">
				<NavLink className="title">Christian Schools Job Search</NavLink>
			</div>

			<div className="menu">
				<NavLink
					to="/Jobs"
					className={`menuitem ${isActive("/jobs") ? "active" : ""}`}
				>
					Jobs
				</NavLink>
				<NavLink
					to="/Schools"
					className={`menuitem ${isActive("/schools") ? "active" : ""}`}
				>
					Schools
				</NavLink>
				<NavLink
					to={`/teacherstaffprofile/${user?.uid}`}
					className={`menuitem ${
						isActive(`/teacherstaffprofile/${user?.uid}`) ? "active" : ""
					}`}
				>
					Profile
				</NavLink>
			</div>
		</div>
	);
}

function SchoolHeader() {
	const location = useLocation();
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const isActive = (path) => {
		return location.pathname === path;
	};

	return (
		<div className="header">
			<div className="logo">
				<NavLink className="title">Christian Schools Job Search</NavLink>
			</div>

			<div className="menu">
				{/*<NavLink
					to="/jobs"
					className={`menuitem ${isActive("/jobs") ? "active" : ""}`}
				>
					Jobs
	</NavLink>*/}
				<NavLink
					to="/Teachers"
					className={`menuitem ${isActive("/teachers") ? "active" : ""}`}
				>
					Teachers
				</NavLink>
				<NavLink
					to={`/schoolprofile/${user?.uid}`}
					className={`menuitem ${
						isActive(`/schoolprofile/${user?.uid}`) ? "active" : ""
					}`}
				>
					Profile
				</NavLink>
			</div>
		</div>
	);
}

function AdminHeader() {
	const [user, setUser] = useState(null);
	const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const isActive = (path) => {
		return window.location.pathname === path;
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

	return (
		<div className="header">
			{showLogoutConfirmation && <div className="overlay" />}

			<div className="logo">
				<NavLink to="/" className="title">
					Christian Schools Job Search
				</NavLink>
			</div>

			<div className="menu">
				<NavLink
					to="/adminjobs"
					className={`menuitem ${isActive("/adminjobs") ? "active" : ""}`}
				>
					Jobs
				</NavLink>
				<NavLink
					to="/adminteachers"
					className={`menuitem ${isActive("/adminteachers") ? "active" : ""}`}
				>
					Teachers
				</NavLink>
				<NavLink
					to="/adminschools"
					className={`menuitem ${isActive("/adminschools") ? "active" : ""}`}
				>
					Schools
				</NavLink>
				<button className="menu-logout" onClick={handleLogout}>
					Logout
				</button>
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

export { TeacherStaffHeader, SchoolHeader, AdminHeader };
