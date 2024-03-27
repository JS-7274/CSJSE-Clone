import React, { useState, useEffect } from "react";
import { TeacherStaffHeader } from "../components/Headers";
import "../styles/SearchPage.css";
import JobList from "../components/JobList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

function Jobs() {
	const [selectedJob, setSelectedJob] = useState(null);
	const [noSelectedJob, setNoSelectedJob] = useState(true);
	const [searchResult, setSearchResult] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterOptions, setFilterOptions] = useState({
		job_location: "",
		required_degree: "",
	});

	useEffect(() => {
		fetchJobs();
	}, [filterOptions, searchTerm]);

	const fetchJobs = () => {
		const { job_location, required_degree } = filterOptions;
		let url = `http://localhost:5000/api/jobs?searchTerm=${encodeURIComponent(
			searchTerm
		)}`;

		if (job_location)
			url += `&job_location=${encodeURIComponent(job_location)}`;
		if (required_degree)
			url += `&required_degree=${encodeURIComponent(required_degree)}`;

		fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				setSearchResult(data.jobs);
			})
			.catch((error) =>
				console.error("Error fetching filtered jobs list:", error)
			);
	};

	const handleSearch = (searchTerm) => {
		setSearchTerm(searchTerm);
		// No need to call fetchJobs here, useEffect will take care of it
		setSelectedJob(null);
		setNoSelectedJob(true);
	};

	const handleSelectJob = (job) => {
		setSelectedJob(job);
		setNoSelectedJob(false);
	};

	const handleFilterChange = (event) => {
		const { name, value } = event.target;
		setFilterOptions({ ...filterOptions, [name]: value });
		// No need to call fetchJobs here, useEffect will take care of it
		setSelectedJob(null);
		setNoSelectedJob(true);
	};

	const handleLocationChange = (event) => {
		const { value } = event.target;
		setFilterOptions({ ...filterOptions, job_location: value });
		// No need to call fetchJobs here, useEffect will take care of it
		setSelectedJob(null);
		setNoSelectedJob(true);
	};

	const handleReset = () => {
		setSearchTerm("");
		setFilterOptions({
			job_location: "",
			required_degree: "",
		});
		console.log("Resetting search term and filter options:", {
			job_location: "",
			required_degree: "",
		});
		setSelectedJob(null);
		setNoSelectedJob(true);
		// No need to call fetchJobs here, useEffect will take care of it
	};

	const handleApply = () => {
		// Implement the apply functionality here
		if (selectedJob && selectedJob.application_link) {
			window.open(selectedJob.application_link, "_blank");
		}
	};

	return (
		<div>
			<TeacherStaffHeader />
			<div className="search-and-filter-bar">
				<div className="filter">
					<div className="filter-options">
						<label>Filter Options:</label>
						<div>
							<select
								name="required_degree"
								value={filterOptions.required_degree}
								onChange={handleFilterChange}
							>
								<option value="">Degree Required</option>
								<option value="Associate">Associate's</option>
								<option value="Bachelor">Bachelor's</option>
								<option value="Master">Master's</option>
								<option value="PhD">PhD</option>
							</select>
						</div>
						<div>
							{/*<label>State</label>
							 <input
								type="text"
								name="job_location"
								value={filterOptions.job_location}
								onChange={handleLocationChange}
								placeholder="Enter State, City"
							/> */}
							<select
								/*value={selectedLocation}*/ onChange={handleLocationChange}
							>
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
								//value={searchZip}
								//onChange={(e) => handleZipSearch(e.target.value)}
								placeholder="First 3 Digits"
							/>
						</div>
						<button onClick={handleReset}>Clear Filters</button>
					</div>
				</div>

				<div className="search">
					<input
						type="text"
						value={searchTerm}
						onChange={(e) => handleSearch(e.target.value)}
						placeholder="Search by job title"
					/>
					<FontAwesomeIcon icon={fas.faSearch} style={{ cursor: "pointer" }} />
				</div>
			</div>
			<div className="info-display">
				<div className="sidebar">
					<JobList
						onSelectJob={handleSelectJob}
						searchResult={searchResult}
						searchTerm={searchTerm}
						filterOptions={filterOptions}
					/>
				</div>
				<div className="info-column">
					{noSelectedJob && <p>Select a Job to Learn More</p>}
					{selectedJob && (
						<div>
							<h2>{selectedJob.job_title}</h2>
							<p>Job Description: {selectedJob.job_description}</p>
							<p>Job Location: {selectedJob.job_location}</p>
							<p>Interview Location: {selectedJob.interview_location}</p>
							<p>Contact Email: {selectedJob.contact_email}</p>
							<p>Required Degree: {selectedJob.required_degree}</p>
							<p>Required Experience: {selectedJob.required_experience}</p>
							<p>Preferred Degree: {selectedJob.preferred_degree}</p>
							<p>Preferred Experience: {selectedJob.preferred_experience}</p>
							<p>Job Link: {selectedJob.application_url}</p>
							{selectedJob.application_url && (
								<div>
									<a
										href={selectedJob.application_url}
										target="_blank"
										rel="noopener noreferrer"
									>
										<button onClick={handleApply}>Apply Externally</button>
									</a>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Jobs;
