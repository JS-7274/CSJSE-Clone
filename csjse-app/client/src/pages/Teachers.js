import React from "react";
import { SchoolHeader } from "../components/Headers";
import "../styles/Teachers.css";
import { SearchBar } from "../components/SearchBar";

function Teachers() {
	return (
		<div>
			<SchoolHeader></SchoolHeader>
			<SearchBar></SearchBar>
			<div className="info-display">
				<div className="teacher-navigation">
					{/*add navigation buttons for jobs*/}
					<button>Teacher</button>
				</div>
				<div className="teacher-info">
					{/*use activeTab*/}
					<h2>Teacher Name</h2>
					<p>Teacher information</p>
				</div>
			</div>
		</div>
	);
}

export default Teachers;
