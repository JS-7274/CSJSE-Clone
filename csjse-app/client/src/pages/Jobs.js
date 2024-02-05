import React from "react";
import { TeacherStaffHeader } from "../components/Headers";
import "../styles/Jobs.css";
import { SearchBar } from "../components/SearchBar";

function Jobs() {
	return (
		<div>
			<TeacherStaffHeader></TeacherStaffHeader>
			<SearchBar></SearchBar>
			<div className="info-display">
				<div className="job-navigation">
					{/*add navigation buttons for jobs*/}
					<button>Job</button>
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
