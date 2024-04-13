/* AdminTeachers.js */
/* Displays information for the admin user on the list of teachers and their details. */

import React, { useState, useEffect } from "react";
import { AdminHeader } from "../components/Headers";
import "../styles/SearchPage.css";
import TeachersList from "../components/TeacherList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import DeleteConfirmation from "../components/DeleteConfirmation";

function AdminTeachers() {
	// State to store the selected teacher
	const [selectedTeacher, setSelectedTeacher] = useState(null);
	const [noSelectedTeacher, setNoSelectedTeacher] = useState(true);
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
	// State to store the search result
	const [searchResult, setSearchResult] = useState([]);
	// State to store the search term
	const [searchTerm, setSearchTerm] = useState("");
	// State to store the filter options
	const [filterOptions, setFilterOptions] = useState({
		degree: "",
		location: "",
	});
	// State to store the selected degree filter
	const [selectedDegree, setSelectedDegree] = useState("");
	// State to store the selected location filter
	const [selectedLocation, setSelectedLocation] = useState("");

	useEffect(() => {
		// Fetch all teachers when the component mounts
		fetchTeachers();
	}, []);

	// Function to fetch teachers based on filter options
	const fetchTeachers = () => {
		const { degree, location } = filterOptions;

		let url = `http://localhost:5000/api/teachers?searchQuery=${searchTerm}`;
		if (degree) {
			url += `&degree=${degree}`;
		}
		if (location) {
			url += `&location=${location}`;
		}

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

	// Function to handle search
	const handleSearch = (searchTerm) => {
		setSearchTerm(searchTerm);
		fetchTeachers();
		setSelectedTeacher(null);
		setNoSelectedTeacher(true);
	};

	// Function to handle selecting a teacher
	const handleSelectTeacher = (teacher) => {
		setSelectedTeacher(teacher);
		setNoSelectedTeacher(false);
	};

	// Function to handle degree filter change
	const handleDegreeChange = (event) => {
		const degree = event.target.value;
		setSelectedDegree(degree);
		setFilterOptions({ ...filterOptions, degree });
		fetchTeachers();
		setSelectedTeacher(null);
		setNoSelectedTeacher(true);
	};

	// Function to handle location filter change
	const handleLocationChange = (event) => {
		const location = event.target.value;
		setSelectedLocation(location);
		setFilterOptions({ ...filterOptions, location });
		fetchTeachers();
		setSelectedTeacher(null);
		setNoSelectedTeacher(true);
	};

	const handleDeleteTeacher = () => {
		setShowDeleteConfirmation(true);
	};

	const confirmDeleteTeacher = async () => {
		try {
			// Check if a teacher is selected
			if (!selectedTeacher || !selectedTeacher.teacher_staff_id) {
				console.error("No teacher selected for deletion");
				return; // Exit early if no teacher is selected
			}

			console.log("Deleting teacher:", selectedTeacher.teacher_staff_id); // Log the teacher ID

			// Make API calls to delete records from different tables
			await deleteFromAPI(
				`http://localhost:5000/api/deleteSavedJobs/${selectedTeacher.teacher_staff_id}`
			);
			await deleteFromAPI(
				`http://localhost:5000/api/deleteJobApplications/${selectedTeacher.teacher_staff_id}`
			);
			await deleteFromAPI(
				`http://localhost:5000/api/deleteReference/${selectedTeacher.teacher_staff_id}`
			);
			await deleteFromAPI(
				`http://localhost:5000/api/deleteTeacherProfile/${selectedTeacher.teacher_staff_id}`
			);

			// If deletion is successful, reset the selected teacher
			setSelectedTeacher(null);
			// Refresh the teacher list
			fetchTeachers();
		} catch (error) {
			console.error("Error deleting teacher:", error);
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
					Search and filter through teachers to view details and delete if
					necessary.
				</p>
			</div>
			<div className="search-and-filter-bar">
				<div className="filter">
					<div className="filter-options">
						<label>Filter Options:</label>
						<div>
							<select value={selectedDegree} onChange={handleDegreeChange}>
								<option value="">Degree</option>
								<option value="Bachelor">Bachelor's</option>
								<option value="Master">Master's</option>
								<option value="Associate">Associate's</option>
							</select>
						</div>
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
								<option value="utah">utah</option>
								<option value="vermont">Vermont</option>
								<option value="virginia">Virginia</option>
								<option value="washington">Washington</option>
								<option value="west_virginia">West Virginia</option>
								<option value="wisconsin">Wisconsin</option>
								<option value="wyoming">Wyoming</option>
							</select>
						</div>
						<button onClick={() => {}}>Clear Search & Filters</button>
					</div>
				</div>
				<div className="search">
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
					<TeachersList
						onSelectTeacher={handleSelectTeacher}
						searchResult={searchResult}
						searchTerm={searchTerm}
						selectedDegree={selectedDegree}
						selectedLocation={selectedLocation}
					/>
				</div>
				<div className="info-column">
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
									<div className="info-group">
										<label>User ID:</label>
										<p>{selectedTeacher.teacher_staff_id}</p>
									</div>
								</div>
							</div>
							<div className="delete-box">
								<button
									className="delete-button"
									onClick={selectedTeacher ? handleDeleteTeacher : () => {}}
								>
									Delete Teacher
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
			{showDeleteConfirmation && (
				<DeleteConfirmation
					onCancel={() => setShowDeleteConfirmation(false)}
					onConfirm={confirmDeleteTeacher}
				/>
			)}
		</div>
	);
}

export default AdminTeachers;
