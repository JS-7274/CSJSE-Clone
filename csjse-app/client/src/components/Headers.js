/* Headers.js */
/* Creates header components to be used for teacher/staff or school agent view of the website */

import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import "../styles/Headers.css";

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
				<NavLink to="/" className="title">
					Christian Schools Job Search
				</NavLink>
			</div>

			<div className="menu">
				<NavLink
					to="/jobs"
					className={`menuitem ${isActive("/jobs") ? "active" : ""}`}
				>
					Jobs
				</NavLink>
				<NavLink
					to="/schools"
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

	const isActive = (path) => {
		return location.pathname === path;
	};

	return (
		<div className="header">
			<div className="logo">
				<NavLink to="/" className="title">
					Christian Schools Job Search
				</NavLink>
			</div>

			<div className="menu">
				<NavLink
					to="/jobs"
					className={`menuitem ${isActive("/jobs") ? "active" : ""}`}
				>
					Jobs
				</NavLink>
				<NavLink
					to="/teachers"
					className={`menuitem ${isActive("/teachers") ? "active" : ""}`}
				>
					Teachers
				</NavLink>
				<NavLink
					to="/schoolprofile"
					className={`menuitem ${isActive("/schoolprofile") ? "active" : ""}`}
				>
					Profile
				</NavLink>
			</div>
		</div>
	);
}

export { TeacherStaffHeader, SchoolHeader };
