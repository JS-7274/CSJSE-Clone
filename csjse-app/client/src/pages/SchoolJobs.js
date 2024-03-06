import React from "react";
import { SchoolHeader } from "../components/Headers";
import "../styles/Jobs.css";
import { SearchBar } from "../components/SearchBar";

function Schooljobs() {
	return (
		<div>
			<SchoolHeader></SchoolHeader>
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

export default Schooljobs;
