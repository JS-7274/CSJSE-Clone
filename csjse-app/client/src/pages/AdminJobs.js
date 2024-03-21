import React, { useState, useEffect } from "react";
import { AdminHeader } from "../components/Headers";
import "../styles/Jobs.css";
import JobList from "../components/JobList";

function AdminJobs() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    job_location: "",
    required_degree: ""
  });

  useEffect(() => {
    fetchJobs();
  }, [filterOptions, searchTerm]);

  const fetchJobs = () => {
    const { job_location, required_degree } = filterOptions;
    let url = `http://localhost:5000/api/jobs?searchTerm=${encodeURIComponent(searchTerm)}`;

    if (job_location) url += `&job_location=${encodeURIComponent(job_location)}`;
    if (required_degree) url += `&required_degree=${encodeURIComponent(required_degree)}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setSearchResult(data.jobs);
      })
      .catch(error => console.error('Error fetching filtered jobs list:', error));
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleSelectJob = (job) => {
    setSelectedJob(job);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterOptions({ ...filterOptions, [name]: value });
  };

  const handleLocationChange = (event) => {
    const { value } = event.target;
    setFilterOptions({ ...filterOptions, job_location: value });
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilterOptions({
      job_location: "",
      required_degree: ""
    });
  };

  const handleDeleteJob = async (jobId) => {
    try {
        const response = await fetch(`http://localhost:5000/api/deleteJob/${jobId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete job');
        }
        // After successful deletion, refetch the jobs
        fetchJobs();
        // Clear the selected job
        setSelectedJob(null);
    } catch (error) {
        console.error('Error deleting job:', error);
        // Handle error as needed
    }
};

  return (
    <div>
      <AdminHeader />
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by job title"
        />
        <input
          type="text"
          name="job_location"
          value={filterOptions.job_location}
          onChange={handleLocationChange}
          placeholder="Enter State, City"
        />
        <select name="required_degree" value={filterOptions.required_degree} onChange={handleFilterChange}>
          <option value="">Any Degree</option>
          <option value="Associate">Associate's</option>
          <option value="Bachelor">Bachelor's</option>
          <option value="Master">Master's</option>
          <option value="PhD">PhD</option>
        </select>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div className="info-display">
        <div className="columns-container">
          <div className="job-list-column">
            <JobList
              onSelectJob={handleSelectJob}
              searchResult={searchResult}
              searchTerm={searchTerm}
              filterOptions={filterOptions}
              onDeleteJob={handleDeleteJob} // Pass the delete handler to JobList component
            />
          </div>
          <div className="job-info-column">
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
                {/* Button to delete the selected job */}
                <button onClick={() => handleDeleteJob(selectedJob.job_id)}>Delete Job</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminJobs;