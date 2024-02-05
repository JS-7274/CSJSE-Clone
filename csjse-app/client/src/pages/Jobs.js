import React from "react";
import { TeacherStaffHeader } from "../components/Headers";
import "../styles/Jobs.css";

function Jobs() {
	return (
		<div>
			<TeacherStaffHeader></TeacherStaffHeader>
			<div className="search-bar">
				Search
				{/*add hamburger icon and searcch icon*/}
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
