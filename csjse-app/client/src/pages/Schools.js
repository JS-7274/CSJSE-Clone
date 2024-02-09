import React from "react";
import { TeacherStaffHeader } from "../components/Headers";
import "../styles/Schools.css";
import { SearchBar } from "../components/SearchBar";

function Teachers() {
	return (
		<div>
			<TeacherStaffHeader></TeacherStaffHeader>
			<SearchBar></SearchBar>
			<div className="info-display">
				<div className="school-navigation">
					{/*add navigation buttons for jobs*/}
					<button>School</button>
				</div>
				<div className="school-info">
					{/*use activeTab*/}
					<h2>School Name</h2>
					<p>School information</p>
				</div>
			</div>
		</div>
	);
}

export default Teachers;
