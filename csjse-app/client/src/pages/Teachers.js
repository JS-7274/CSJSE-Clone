/* The purpose of this file is to display teachers when they are searched and filtered along with
   the TeacherList.js file. This file handles most of the logic required in the searching and filtering.
   
   People who have worked on this file: Josh, Autumn
   Last worked on: 4/13/2024 */

import React, { useState, useEffect } from "react";
import { SchoolHeader } from "../components/Headers";
import "../styles/SearchPage.css";
import TeachersList from "../components/TeacherList";
import "@fortawesome/fontawesome-free/css/all.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

function Teachers() {
	// Add state to store what teacher is currently selected
	const [selectedTeacher, setSelectedTeacher] = useState(null);
	const [noSelectedTeacher, setNoSelectedTeacher] = useState(true);
	// Add state to store the result of a search
	const [searchResult, setSearchResult] = useState([]);
	// Add state to store the term that is searched
	const [searchTerm, setSearchTerm] = useState("");
	// Add state to store filter options
	const [filterOptions, setFilterOptions] = useState({
		degree: "",
		location: "",
	});
	// Add state to store what degree filter is selected
	const [selectedDegree, setSelectedDegree] = useState("");
	// Add state to store what location filter is selected
	const [selectedLocation, setSelectedLocation] = useState("");
	// Add state to store zip
	const [searchZip, setSearchZip] = useState("");
	// Add state to store the looking filter
	const [looking, setLooking] = useState(false);

	useEffect(() => {
		// Fetch all teachers when the file is called
		fetchTeachers();
	}, []);

	// Function to fetch teachers based on filter options
	const fetchTeachers = () => {
		// Create a variable to store the filters selected
		const { degree, location, zip, looking } = filterOptions;
		console.log("Fetching teachers with filter options:", filterOptions);

		// Organizes the filter information into the url for an API request
		let url = `http://localhost:5000/api/teachers?searchQuery=${searchTerm}`;
		if (degree) {
			url += `&degree=${degree}`;
		}
		if (location) {
			url += `&location=${location}`;
		}
		if (zip) {
			url += `&zip=${zip}`;
		}
		if (looking) {
			url += `&looking=true`;
		}

		// Makes the API request for filter request
		fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				setSearchResult(data.teachers);
			})
			.catch((error) =>
				console.error("Error fetching filtered teachers list:", error)
			);
	};

	// Function to reset filters
	const resetFilters = () => {
		// Sets these states to "" or the equivalent of Null or empty
		setSearchTerm("");
		setSelectedDegree("");
		setSelectedLocation("");
		setSearchZip("");
		setLooking(false);
		setFilterOptions({ degree: "", location: "", zip: "", looking: false });
	};

	// Function to handle search
	const handleSearch = (searchTerm) => {
		setSearchTerm(searchTerm); // Updates the state to what the user is searching for
		fetchTeachers(); // Trigger re-fetch when search term changes
		setSelectedTeacher(null);
		setNoSelectedTeacher(true);
	};

	// Function to handle showing all teachers, clears filter and search
	const handleShowAll = () => {
		resetFilters(); // Reset filters
		fetchTeachers(); // Trigger re-fetch when "Show All" is clicked
		setSelectedTeacher(null);
		setNoSelectedTeacher(true);
	};

	// Function to handle selecting a teacher
	const handleSelectTeacher = (teacher) => {
		setSelectedTeacher(teacher); // Updates the state to the teacher being selected
		setNoSelectedTeacher(false);
	};

	// Function to handle degree change
	const handleDegreeChange = (event) => {
		const degree = event.target.value; // Creates a variable to store the degree being filtered for
		setSelectedDegree(degree);
		setFilterOptions({ ...filterOptions, degree });
		fetchTeachers(); // Trigger fetching teachers when degree filter changes
		setSelectedTeacher(null);
		setNoSelectedTeacher(true);
	};

	// Function to handle location change
	const handleLocationChange = (event) => {
		const location = event.target.value; // Creates a variable to store the location being filtered for
		setSelectedLocation(location);
		setFilterOptions({ ...filterOptions, location });
		fetchTeachers(); // Trigger fetching teachers when location filter changes
		setSelectedTeacher(null);
		setNoSelectedTeacher(true);
	};

	// Function to handle searching for zip
	const handleZipSearch = (searchZip) => {
		setSearchZip(searchZip);
		setFilterOptions({ ...filterOptions, zip: searchZip });
		fetchTeachers();
		setSelectedTeacher(null);
		setNoSelectedTeacher(true);
	};

	// Function to handle looking filter change
	const handleLookingChange = (event) => {
		const looking = event.target.checked;
		console.log("Looking filter changed to:", looking);
		setLooking(looking);
		fetchTeachers();
		setSelectedTeacher(null);
		setNoSelectedTeacher(true);
	};

	return (
		<div>
			<SchoolHeader></SchoolHeader>

			<div className="search-and-filter-bar">
				<div className="filter">
					<div className="filter-options">
						{/* Filter by Degree */}
						<label>Filter Options:</label>
						<div>
							<select value={selectedDegree} onChange={handleDegreeChange}>
								<option value="">Degree Level</option>
								<option value="Bachelor">Bachelor's</option>
								<option value="Master">Master's</option>
								<option value="Associate">Associate's</option>
							</select>
						</div>
						{/* Filter by Location */}
						<div>
							<select value={selectedLocation} onChange={handleLocationChange}>
								<option value="">State</option>
								<option value="alabama">Alabama</option>
								<option value="alaska">Alaska</option>
								<option value="arizona">Arizona</option>
								<option value="arkansas">Arkansas</option>
								<option value="california">California</option>
								<option value="colorado">Colorado</option>
								<option value="connecticut">Connecticut</option>
								<option value="delaware">Delaware</option>
								<option value="florida">Florida</option>
								<option value="georgia">Georgia</option>
								<option value="hawaii">Hawaii</option>
								<option value="idaho">Idaho</option>
								<option value="illinois">Illinois</option>
								<option value="indiana">Indiana</option>
								<option value="iowa">Iowa</option>
								<option value="kansas">Kansas</option>
								<option value="kentucky">Kentucky</option>
								<option value="louisiana">Louisiana</option>
								<option value="maine">Maine</option>
								<option value="maryland">Maryland</option>
								<option value="massachusetts">Massachusetts</option>
								<option value="michigan">Michigan</option>
								<option value="minnesota">Minnesota</option>
								<option value="mississippi">Mississippi</option>
								<option value="missouri">Missouri</option>
								<option value="montana">Montana</option>
								<option value="nebraska">Nebraska</option>
								<option value="nevada">Nevada</option>
								<option value="new_hapmshire">New Hampshire</option>
								<option value="new_jersey">New Jersey</option>
								<option value="new_mexico">New Mexico</option>
								<option value="new_york">New York</option>
								<option value="north_carolina">North Carolina</option>
								<option value="north_dakota">North Dakota</option>
								<option value="ohio">Ohio</option>
								<option value="oklahoma">Oklahoma</option>
								<option value="oregon">Oregon</option>
								<option value="pennsylvania">Pennsylvania</option>
								<option value="rhode_island">Rhode Island</option>
								<option value="south_carolina">South Carolina</option>
								<option value="south_dakota">South Dakota</option>
								<option value="tennessee">Tennessee</option>
								<option value="texas">Texas</option>
								<option value="utah">utah</option>
								<option value="vermont">Vermont</option>
								<option value="virginia">Virginia</option>
								<option value="washington">Washington</option>
								<option value="west_virginia">West Virginia</option>
								<option value="wisconsin">Wisconsin</option>
								<option value="wyoming">Wyoming</option>
							</select>
						</div>
						<div className="zip">
							{/* Search for Zip */}
							<label> Zip Code: </label>
							<input
								type="text"
								value={searchZip}
								onChange={(e) => handleZipSearch(e.target.value)}
								placeholder="First 3 Digits"
							/>
						</div>
						<div className="looking">
							<label>Looking for Work:</label>
							<input
								type="checkbox"
								checked={looking}
								onChange={handleLookingChange}
							/>
						</div>
						{/* Creates a button to clear filters when clicked using handleShowAll */}
						<button onClick={handleShowAll}>Clear Search & Filters</button>
					</div>
				</div>
				<div className="search">
					{/* Search  box */}
					<input
						type="text"
						value={searchTerm}
						onChange={(e) => handleSearch(e.target.value)}
						placeholder="Search"
					/>
					<FontAwesomeIcon icon={fas.faSearch} style={{ cursor: "pointer" }} />
				</div>
			</div>

			<div className="info-display">
				<div className="list-sidebar">
					{/* Displays the list of teachers by calling the TeacherList file */}
					<TeachersList
						onSelectTeacher={handleSelectTeacher}
						searchResult={searchResult}
						searchTerm={searchTerm}
						selectedDegree={selectedDegree}
						selectedLocation={selectedLocation}
						searchZip={searchZip}
						looking={looking}
					/>
				</div>
				<div className="info-column">
					{/* Teacher information */}
					{noSelectedTeacher && <p>Select a Teacher to Learn More</p>}
					{selectedTeacher && (
						<div>
							<h2>
								{selectedTeacher.first_name} {selectedTeacher.last_name}
							</h2>
							<div className="info-box">
								<div>
									<div className="info-group">
										<label>Degree:</label>
										<p>{selectedTeacher.degree}</p>
									</div>
									<div className="info-group">
										<label>Home Church:</label>
										<p>{selectedTeacher.home_church}</p>
									</div>
									<div className="info-group">
										<label>Testimony:</label>
										<p>{selectedTeacher.testimony}</p>
									</div>
									<div className="info-group">
										<a href="{selectedTeacher.job_resume}">
											<button>External Resume</button>
										</a>
									</div>
								</div>
								<div>
									<div className="info-group">
										<label>Phone Number:</label>
										<p>{selectedTeacher.phone}</p>
									</div>
									<div className="info-group">
										<label>Contact Email:</label>
										<p>
											<a href="mailto:{selectedTeacher.contact_email}">
												{selectedTeacher.contact_email}
											</a>
										</p>
									</div>
									<div className="info-group">
										<label>Location:</label>
										<p>{selectedTeacher.location}</p>
									</div>
									<div className="info-group">
										<label>Zip:</label>
										<p>{selectedTeacher.zip}</p>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Teachers;
