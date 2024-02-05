import React from "react";
import { TeacherStaffHeader } from "../components/Headers";
import "../styles/Jobs.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

function Jobs() {
	return (
		<div>
			<TeacherStaffHeader></TeacherStaffHeader>
			<div className="search-bar">
				{/*add hamburger icon and searcch icon*/}
				<FontAwesomeIcon icon={fas.faBars} />
				<p>Search</p>
				<FontAwesomeIcon icon={fas.faMagnifyingGlass} />{" "}
			</div>
			<div className="info-display">
				<div className="job-navigation">
					{/*add navigation buttons for jobs*/}
					<button>Teacher</button>
				</div>
				<div className="job-info">
					{/*use activeTab*/}
					<h2>Job Name</h2>
					<p>Job information</p>
				</div>
			</div>
		</div>
	);
}

export default Jobs;
