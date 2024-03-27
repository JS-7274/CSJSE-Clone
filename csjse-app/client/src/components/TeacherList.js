/* The purpose of this file is to work in tandem with Teachers.js to display schools that are searched 
   and filtered. This file creates a compoenent for the list of teachers that will appear on the left. */

import React, { useEffect, useState } from "react";

function TeachersList({
	onSelectTeacher,
	searchResult,
	searchTerm,
	selectedDegree,
	selectedLocation,
	searchZip,
	looking,
}) {
	const [allTeachers, setAllTeachers] = useState([]); // Add state to store non filtered teachers
	const [filteredTeachers, setFilteredTeachers] = useState([]); // Add state to store filtered teachers

	useEffect(() => {
		// Fetch all teachers when the file is called from teachers
		fetch("http://localhost:5000/api/teachers")
			.then((response) => response.json())
			.then((data) => {
				setAllTeachers(data.teachers);
				setFilteredTeachers(data.teachers); // Initially set filtered teachers to all teachers
			})
			.catch((error) => console.error("Error fetching all teachers:", error));
	}, []);

	useEffect(() => {
		// Update filtered teachers when search result, selected degree, or selected location changes
		if (searchTerm || selectedDegree || selectedLocation || searchZip) {
			const filtered = allTeachers.filter(
				(teacher) =>
					(teacher.first_name
						.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
						teacher.last_name
							.toLowerCase()
							.includes(searchTerm.toLowerCase())) &&
					(selectedDegree ? teacher.degree === selectedDegree : true) &&
					(selectedLocation
						? teacher.location.toLowerCase() === selectedLocation.toLowerCase()
						: true) &&
					(!searchZip || (teacher.zip && teacher.zip.includes(searchZip))) &&
					(!looking || teacher.looking)
			);
			setFilteredTeachers(filtered); // Sets the filter
		} else {
			setFilteredTeachers(allTeachers); // If no filter, stays as all teachers
		}
	}, [
		searchResult,
		searchTerm,
		selectedDegree,
		selectedLocation,
		searchZip,
		looking,
		allTeachers,
	]);

	return (
		<div className="side">
			<h2>Teachers List</h2>
			<div className="sidebar">
				{filteredTeachers && filteredTeachers.length > 0 ? (
					filteredTeachers.map((teacher) => (
						<button
							key={teacher.teacher_id}
							onClick={() => onSelectTeacher(teacher)}
						>
							{teacher.first_name} {teacher.last_name}
						</button>
					))
				) : (
					<p>No teachers found</p>
				)}
			</div>
		</div>
	);
}

export default TeachersList;
