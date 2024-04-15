/* Serves as a page that will allow admin users to search for schools. */

import React, { useState, useEffect } from "react";
import { AdminHeader } from "../components/Headers";
import "../styles/SearchPage.css";
import SchoolList from "../components/SchoolList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import DeleteConfirmation from "../components/DeleteConfirmation";

function AdminSchools() {
	const [selectedSchool, setSelectedSchool] = useState(null); // Add state to store what school is selected
	const [noSelectedSchool, setNoSelectedSchool] = useState(true);
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
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

	const handleDeleteSchool = () => {
		setShowDeleteConfirmation(true);
	};

	const confirmDeleteSchool = async (schoolId) => {
		try {
			// Make API calls to delete records from different tables
			await deleteFromAPI(
				`http://localhost:5000/api/deleteJobPostingsBySchool/${schoolId}`
			);
			await deleteFromAPI(`http://localhost:5000/api/deleteSchool/${schoolId}`);
			// No need to delete references or saved jobs as they are not directly related to schools

			// If deletion is successful, reset the selected school
			setSelectedSchool(null);
			// Refresh the school list
			fetchSchools();
		} catch (error) {
			console.error("Error deleting school:", error);
			// Handle error as needed
		}
	};

	const deleteFromAPI = async (url) => {
		const response = await fetch(url, { method: "DELETE" });
		if (!response.ok) {
			throw new Error(`Failed to delete from ${url}`);
		}
	};

	return (
		<div>
			{showDeleteConfirmation && <div className="overlay" />}

			<AdminHeader></AdminHeader>
			<div className="admin-message">
				<h2>Hello, Administrator.</h2>
				<p>
					Search and filter through schools to view details and delete if
					necessary.
				</p>
			</div>
			<div className="search-and-filter-bar">
				<div className="filter">
					<div className="filter-options">
						<label>Filter Options:</label>
						{/* Filter by Grade Range */}
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
								<option value="">Location</option>
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
								<option value="utah">Utah</option>
								<option value="vermont">Vermont</option>
								<option value="virginia">Virginia</option>
								<option value="washington">Washington</option>
								<option value="west_virginia">West Virginia</option>
								<option value="wisconsin">Wisconsin</option>
								<option value="wyoming">Wyoming</option>
							</select>
						</div>
						<div className="looking">
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
							<div className="info-box">
								<div>
									<div className="info-group">
										<label>Statement of Faith:</label>
										<p>{selectedSchool.statement_of_faith}</p>
									</div>
									<div className="info-group">
										<label>Number of Campuses:</label>
										<p>{selectedSchool.campus_number}</p>
									</div>
									<div className="info-group">
										<label>Grade Range:</label>
										<p>{selectedSchool.grade_range}</p>
									</div>
									<div className="info-group">
										<label>Teachers Employed:</label>
										<p>{selectedSchool.teachers_employed}</p>
									</div>
									<div className="info-group">
										<label>Student Enrollment:</label>
										<p>{selectedSchool.student_enrollment}</p>
									</div>
									<div className="info-group">
										<label>Accreditation: </label>
										<p>{selectedSchool.accreditation}</p>
									</div>
									<div className="info-group">
										<a href="{selectedSchool.website}">
											<button>School Website</button>
										</a>
									</div>
								</div>
								<div>
									<div className="info-group">
										<label>Phone Number:</label>
										<p>{selectedSchool.phone}</p>
									</div>
									<div className="info-group">
										<label>Contact Email:</label>
										<p>
											<a href="mailto:{selectedSchool.contact_email}">
												{selectedSchool.contact_email}
											</a>
										</p>
									</div>
									<div className="info-group">
										<label>Location:</label>
										<p>{selectedSchool.location}</p>
									</div>
									<div className="info-group">
										<label>Zip:</label>
										<p>{selectedSchool.zip}</p>
									</div>
									<div className="info-group">
										<label>User ID:</label>
										<p>{selectedSchool.school_id}</p>
									</div>
								</div>
							</div>
							<div className="delete-box">
								<button
									className="delete-button"
									onClick={() => handleDeleteSchool(selectedSchool.school_id)}
								>
									Delete School
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
			{showDeleteConfirmation && (
				<DeleteConfirmation
					onCancel={() => setShowDeleteConfirmation(false)}
					onConfirm={confirmDeleteSchool}
				/>
			)}
		</div>
	);
}

export default AdminSchools;
