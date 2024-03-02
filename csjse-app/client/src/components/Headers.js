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
					to="/TeacherStaffProfile/:id"
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
					to="/SchoolProfile/:id"
					className={`menuitem ${isActive("/schoolprofile") ? "active" : ""}`}
				>
					Profile
				</NavLink>
			</div>
		</div>
	);
}

export { TeacherStaffHeader, SchoolHeader };
