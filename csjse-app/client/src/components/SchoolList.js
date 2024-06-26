/* The purpose of this file is to work in tandem with schools.js to display schools that are searched 
   and filtered. This file creates a compoenent for the list of schools that will appear on the left. 
   
   People who have worked on this file: Autumn, Josh
   Last worked on: 4/13/2024*/

import React, { useEffect, useState } from "react";

function SchoolList({
	onSelectSchool,
	searchResult,
	searchTerm,
	selectedGradeRange,
	selectedLocation,
	searchZip,
	looking,
}) {
	const [allSchools, setAllSchools] = useState([]); // Add state
	const [filteredSchools, setFilteredSchools] = useState([]); // Add state to store filtered schools

	useEffect(() => {
		// Fetch all schools when the file is called
		fetch("http://localhost:5000/api/schools")
			.then((response) => response.json())
			.then((data) => {
				setAllSchools(data.schools);
				setFilteredSchools(data.schools); // Initially set filtered schools to all schools
			})
			.catch((error) => console.error("Error fetching all schools:", error));
	}, []);

	useEffect(() => {
		// Update filtered schools when search result, selected grade range, or selected location changes
		if (
			searchTerm ||
			selectedGradeRange ||
			selectedLocation ||
			searchZip ||
			looking
		) {
			const filtered = allSchools.filter(
				(school) =>
					school.school_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
					(selectedGradeRange
						? school.grade_range === selectedGradeRange
						: true) &&
					(selectedLocation
						? school.location.toLowerCase() === selectedLocation.toLowerCase()
						: true) &&
					school.zip.includes(searchZip) &&
					(!looking || school.looking)
			);
			setFilteredSchools(filtered); // Update state to filtered
			console.log("Filtered Schools:", filtered); // Log filtered schools
		} else {
			setFilteredSchools(allSchools); // Update state to not filtered (if there are no filters)
			console.log("All Schools:", allSchools); // Log all schools
		}
		console.log("Looking for work:", looking);
	}, [
		searchResult,
		searchTerm,
		selectedGradeRange,
		selectedLocation,
		searchZip,
		looking,
		allSchools,
	]);

	return (
		<div className="list-side">
			<h2>Schools List</h2>
			<div className="list-sidebar">
				{filteredSchools && filteredSchools.length > 0 ? (
					filteredSchools.map((school) => (
						<button
							key={school.school_id}
							onClick={() => onSelectSchool(school)}
						>
							{school.school_name}
						</button>
					))
				) : (
					<p>No Schools Found</p>
				)}
			</div>
		</div>
	);
}

export default SchoolList;
