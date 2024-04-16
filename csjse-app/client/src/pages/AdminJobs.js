/* The purpose of this file is to display a list of jobs to the admin user in conjunction with
   the joblist file. 
   
   People who have worked on this file: Autumn, Josh
   Last worked on: 4/13/2024*/

import React, { useState, useEffect } from "react";
import { AdminHeader } from "../components/Headers";
import "../styles/SearchPage.css";
import JobList from "../components/JobList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import DeleteConfirmation from "../components/DeleteConfirmation";

function AdminJobs() {
	const [selectedJob, setSelectedJob] = useState(null);
	const [noSelectedJob, setNoSelectedJob] = useState(true);
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
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
		setSelectedJob(null);
		setNoSelectedJob(true);
	};

	const handleLocationChange = (event) => {
		const { value } = event.target;
		setFilterOptions({ ...filterOptions, job_location: value });
		setSelectedJob(null);
		setNoSelectedJob(true);
	};

	const handleReset = () => {
		setSearchTerm("");
		setFilterOptions({
			job_location: "",
			required_degree: "",
		});
		setSelectedJob(null);
		setNoSelectedJob(true);
	};

	const handleDeleteJob = () => {
		setShowDeleteConfirmation(true);
	};

	const confirmDeleteJob = async (jobId) => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/deleteJob/${jobId}`,
				{
					method: "DELETE",
				}
			);
			if (!response.ok) {
				throw new Error("Failed to delete job");
			}
			// After successful deletion, refetch the jobs
			fetchJobs();
			// Clear the selected job
			setSelectedJob(null);
		} catch (error) {
			console.error("Error deleting job:", error);
			// Handle error as needed
		}
	};

	const handleApply = () => {
		// Implement the apply functionality here
		if (selectedJob && selectedJob.application_url) {
			window.open(selectedJob.application_url, "_blank");
		} else {
			alert("No application link has been attached at this time");
		}
	};

	const handleEmail = () => {
		if (selectedJob && selectedJob.contact_email) {
			window.open("mailto:" + selectedJob.contact_email, "_blank");
		}
	};

	return (
		<div>
			{showDeleteConfirmation && <div className="overlay" />}
			<AdminHeader />
			<div className="admin-message">
				<h2>Hello, Administrator.</h2>
				<p>
					Search and filter through jobs to view details and delete if
					necessary.
				</p>
			</div>

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
						<div className="location">
							<label>Job Location: </label>
							<input
								type="text"
								name="job_location"
								value={filterOptions.job_location}
								onChange={handleLocationChange}
								placeholder="Enter State"
							/>
						</div>

						<button onClick={handleReset}>Clear Search & Filters</button>
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
					<JobList
						onSelectJob={handleSelectJob}
						searchResult={searchResult}
						searchTerm={searchTerm}
						filterOptions={filterOptions}
						onDeleteJob={handleDeleteJob} // Pass the delete handler to JobList component
					/>
				</div>
				<div className="info-column">
					{noSelectedJob && <p>Select a Job to Learn More</p>}
					{selectedJob && (
						<div>
							<h2>{selectedJob.job_title}</h2>
							<div className="info-box">
								<div>
									<div className="info-group">
										<label>Job Description:</label>
										<p>{selectedJob.job_description}</p>
									</div>
									<div className="info-group">
										<label>Required Degree:</label>
										<p>{selectedJob.required_degree}</p>
									</div>
									<div className="info-group">
										<label>Required Experience:</label>
										<p>{selectedJob.required_experience}</p>
									</div>
									<div className="info-group">
										<label>Preferred Degree:</label>
										<p>{selectedJob.preferred_degree}</p>
									</div>
									<div className="info-group">
										<label>Preferred Experience:</label>
										<p>{selectedJob.preferred_experience}</p>
									</div>
								</div>
								<div>
									<div className="info-group">
										<label>Job Location: </label>
										<p>{selectedJob.job_location}</p>
									</div>
									<div className="info-group">
										<label>Interview Location:</label>
										<p>{selectedJob.interview_location}</p>
									</div>
									<div className="info-group">
										<label>Contact Email:</label>

										<button className="link-button" onClick={handleEmail}>
											{selectedJob.contact_email}
										</button>
									</div>

									<div className="info-group">
										<button onClick={handleApply}>External Application</button>
									</div>
								</div>
							</div>
							<div className="delete-box">
								<button
									className="delete-button"
									onClick={() => handleDeleteJob(selectedJob.job_id)}
								>
									Delete Job
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
			{showDeleteConfirmation && (
				<DeleteConfirmation
					onCancel={() => setShowDeleteConfirmation(false)}
					onConfirm={confirmDeleteJob}
				/>
			)}
		</div>
	);
}

export default AdminJobs;
