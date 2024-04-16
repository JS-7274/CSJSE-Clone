/* This file will handle displaying a list of jobs in conjunction with other files. 

   People who have worked on this file: Autumn, Josh
   Last worked on: 4/4/2024*/


import React, { useEffect, useState } from "react";

function JobList({ onSelectJob, searchResult, searchTerm, filterOptions }) {
	const [allJobs, setAllJobs] = useState([]); // State to store all jobs
	const [filteredJobs, setFilteredJobs] = useState([]); // State to store filtered jobs
	const { selectedLocation, requiredDegree } = filterOptions;

	useEffect(() => {
		// Fetch all jobs when the component mounts
		fetch("http://localhost:5000/api/jobs")
			.then((response) => response.json())
			.then((data) => {
				setAllJobs(data.jobs);
				setFilteredJobs(data.jobs); // Initially set filtered jobs to all jobs
			})
			.catch((error) => console.error("Error fetching all jobs:", error));
	}, []);

	useEffect(() => {
		// Update filtered jobs when search term or filter options change
		const filtered = allJobs.filter(
			(job) =>
				(!searchTerm ||
					job.job_title.toLowerCase().includes(searchTerm.toLowerCase())) &&
				(!filterOptions.job_location ||
					job.job_location
						.toLowerCase()
						.includes(filterOptions.job_location.toLowerCase())) &&
				(!filterOptions.required_degree ||
					job.required_degree.toLowerCase() ===
						filterOptions.required_degree.toLowerCase())
		);

		// Sort the filtered jobs by posted date
		filtered.sort((a, b) => new Date(b.posted_date) - new Date(a.posted_date));

		setFilteredJobs(filtered); // Update filtered jobs based on filters and sorting
	}, [
		searchTerm,
		filterOptions.job_location,
		filterOptions.required_degree,
		allJobs,
	]);

	useEffect(() => {}, [filteredJobs]);

	useEffect(() => {}, [filterOptions]);

	return (
		<div className="list-side">
			<h2>Jobs List</h2>
			<div className="list-sidebar">
				{filteredJobs && filteredJobs.length > 0 ? (
					filteredJobs.map((job) => (
						<button key={job.job_id} onClick={() => onSelectJob(job)}>
							{job.job_title}
						</button>
					))
				) : (
					<p>No Jobs Found</p>
				)}
			</div>
		</div>
	);
}

export default JobList;
