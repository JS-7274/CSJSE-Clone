/* Headers.js */
/* Creates header components to be used for teacher/staff or school agent view of the website */

import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/Headers.css";

function TeacherStaffHeader() {
	const location = useLocation();

	const isActive = (path) => {
		return location.pathname === path;
	};

	return (
		<div className="header">
			<div className="logo">Christian Schools Job Search</div>

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
					to="/teacherstaffprofile"
					className={`menuitem ${
						isActive("/teacherstaffprofile") ? "active" : ""
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
			<div className="logo">Christian Schools Job Search</div>

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
