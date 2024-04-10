/* The purpose of this file is to display schools when they are searched and filtered along with
   the SchoolList.js file. This file handles most of the logic required in the searching and filtering. */

import React, { useState, useEffect } from "react";
import { TeacherStaffHeader } from "../components/Headers";
import "../styles/SearchPage.css";
import SchoolList from "../components/SchoolList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

function Schools() {
	const [selectedSchool, setSelectedSchool] = useState(null); // Add state to store what school is selected
	const [noSelectedSchool, setNoSelectedSchool] = useState(true);
	const [searchResult, setSearchResult] = useState([]); // Add state to store the result of search
	const [searchTerm, setSearchTerm] = useState(""); // Add state to store the search term
	const [filterOptions, setFilterOptions] = useState({
		gradeRange: "",
		location: "",
	}); // Add state to store filter options
	const [selectedGradeRange, setSelectedGradeRange] = useState(""); // Add state to sotre grade range filter
	const [selectedLocation, setSelectedLocation] = useState(""); // Add state to store location filter
	const [searchZip, setSearchZip] = useState(""); // Add state to store zip
	const [looking, setLooking] = useState(false); // Add state to store the looking filter
	const [showMoreInfo, setShowMoreInfo] = useState(false); // State to toggle additional information

	useEffect(() => {
		// Fetch all schools when the file is called
		fetchSchools();
	}, []);

	// Function to fetch schools based on filter options
	const fetchSchools = () => {
		// Create variable to store the filter options
		const { gradeRange, location, zip, looking } = filterOptions;

		// Add filter options to url request for an API call based on server.js
		let url = `http://localhost:5000/api/schools?searchQuery=${searchTerm}`;
		if (gradeRange) {
			url += `&degree=${gradeRange}`;
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

		// Make api call
		fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				setSearchResult(data.schools);
			})
			.catch((error) =>
				console.error("Error fetching filtered schools list:", error)
			);
	};

	// Function to reset filters
	const resetFilters = () => {
		// Updates all states to "" or the equivalent of empty or NULL
		setSearchTerm("");
		setSelectedGradeRange("");
		setSelectedLocation("");
		setSearchZip("");
		setLooking(false);
		setFilterOptions({ gradeRange: "", location: "", looking: false });
	};

	// Function to handle search
	const handleSearch = (searchTerm) => {
		setSearchTerm(searchTerm); // Updates search term state with whatever is searched
		fetchSchools(); // Trigger re-fetch when search term changes
		setSelectedSchool(null);
		setNoSelectedSchool(true);
	};

	// Function to handle zip search
	const handleZipSearch = (searchZip) => {
		setSearchZip(searchZip); // Updates search term state with whatever is searched
		fetchSchools(); // Trigger re-fetch when search term changes
	};

	// Function to handle showing all schools
	const handleShowAll = () => {
		resetFilters(); // Reset filters
		fetchSchools(); // Trigger re-fetch when "Show All" is clicked
		setSelectedSchool(null);
		setNoSelectedSchool(true);
	};

	// Function to handle selecting a school
	const handleSelectSchool = (school) => {
		setSelectedSchool(school); // Update state to whatever school is selected
		setNoSelectedSchool(false);
	};

	// Function to handle grade range change
	const handleGradeRangeChange = (event) => {
		// Create variable to store grade range and update filters accordingly
		const gradeRange = event.target.value;
		setSelectedGradeRange(gradeRange);
		setFilterOptions({ ...filterOptions, gradeRange });
		fetchSchools(); // Trigger fetching schools when grade range filter changes
		setSelectedSchool(null);
		setNoSelectedSchool(true);
	};

	// Function to handle location change
	const handleLocationChange = (event) => {
		// Create variable to store location and update filters accordingly
		const location = event.target.value;
		setSelectedLocation(location);
		setFilterOptions({ ...filterOptions, location });
		fetchSchools(); // Trigger fetching schools when location filter changes
		setSelectedSchool(null);
		setNoSelectedSchool(true);
	};

	// Function to handle looking filter change
	const handleLookingChange = (event) => {
		const looking = event.target.checked;
		setLooking(looking);
		fetchSchools();
		setSelectedSchool(null);
		setNoSelectedSchool(true);
	};

	const toggleMoreInfo = () => {
		setShowMoreInfo(!showMoreInfo);
	};

	return (
		<div>
			<TeacherStaffHeader></TeacherStaffHeader>
			<div className="search-and-filter-bar">
				<div className="filter">
					<div className="filter-options">
						{/* Filter by Grade Range */}
						<label>Filter Options:</label>
						<div>
							<select
								value={selectedGradeRange}
								onChange={handleGradeRangeChange}
							>
								<option value="">Grade Range</option>
								<option value="K-12">K-12</option>
								<option value="Elementary">Elementary</option>
								<option value="Middle">Middle</option>
								<option value="High">High</option>
								<option value="College">College</option>
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
						<div>
							<label>
								Hiring:
								<input
									type="checkbox"
									checked={looking}
									onChange={handleLookingChange}
								/>
							</label>
						</div>

						<div className="zip">
							{/* Zip Search box */}
							<label> Zip Code: </label>
							<input
								type="text"
								value={searchZip}
								onChange={(e) => handleZipSearch(e.target.value)}
								placeholder="First 3 Digits"
							/>
							{/* Search icon (not here yet) */}
						</div>
						<button onClick={handleShowAll}>Clear Search & Filters</button>
					</div>
				</div>
				<div className="search">
					{/* Search box */}
					<input
						type="text"
						value={searchTerm}
						onChange={(e) => handleSearch(e.target.value)}
						placeholder="Search"
					/>
					<FontAwesomeIcon icon={fas.faSearch} style={{ cursor: "pointer" }} />

					{/* Search icon (not here yet) */}
				</div>
			</div>
			<div className="info-display">
				<div className="list-sidebar">
					{/* Calls school list to return list of schools based on passed through criteria */}
					<SchoolList
						onSelectSchool={handleSelectSchool}
						searchResult={searchResult}
						searchTerm={searchTerm}
						selectedGradeRange={selectedGradeRange}
						selectedLocation={selectedLocation}
						searchZip={searchZip}
						looking={looking}
					/>
				</div>
				<div className="info-column">
					{/* Displays information of the school */}
					{noSelectedSchool && <p>Select a School to Learn More</p>}
					{selectedSchool && (
						<div>
							<h2>{selectedSchool.school_name}</h2>
							<p>About: {selectedSchool.about}</p>
							<p>Location: {selectedSchool.location}</p>
							<p>Zip: {selectedSchool.zip}</p>
							<p>Number of Campuses: {selectedSchool.campus_number}</p>
							<p>Accreditation: {selectedSchool.accreditation}</p>
							<p>Grade Range: {selectedSchool.grade_range}</p>
							<p>Contact Email: {selectedSchool.contact_email}</p>
							<p>Phone: {selectedSchool.phone}</p>
							{/* Button to toggle more information */}
							<button onClick={toggleMoreInfo}>
								{showMoreInfo ? "Hide More Info" : "Show More Info"}
							</button>
							{/* Additional information */}
							{showMoreInfo && (
								<>
									<p>Population: {selectedSchool.school_population}</p>
									<p>Statement of Faith: {selectedSchool.statement_of_faith}</p>
									<p>Covenantal: {selectedSchool.covenantal}</p>
									<p>Teacher Count: {selectedSchool.teacher_count}</p>
									<p>
										Administrative Structure:{" "}
										{selectedSchool.administrative_structure}
									</p>
								</>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Schools;
