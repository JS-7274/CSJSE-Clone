import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function JobListings() {
	// State to manage the visibility of the create job posting form
	const [showCreateJobPosting, setShowCreateJobPosting] = useState(false);
	const [schoolId, setSchoolId] = useState(null);
	const [jobList, setJobList] = useState([]);
	const [editJobId, setEditJobId] = useState(null);
	const [degreeOptions] = useState(["Bachelor", "Master", "PhD", "Associate"]); // Define degree options
	const [selectedPreferredDegree, setSelectedPreferredDegree] = useState(""); // State to manage selected degree
	const [selectedRequiredDegree, setSelectedRequiredDegree] = useState(""); // State to manage selected degree

	const [location, setLocation] = useState(""); // State to manage the location input
	const [applicationUrl, setApplicationUrl] = useState("");

	const { school_id } = useParams();
	const job_location = location;
	const application_url = applicationUrl;

	const [jobData, setJobData] = useState({
		school_id,
		job_title: "",
		job_description: "",
		job_location,
		job_zip: "",
		interview_location: "",
		contact_email: "",
		salary_range: "",
		preferred_degree: "",
		required_degree: "",
		preferred_experience: "",
		required_experience: "",
		application_url,
	});

	//resets create form after a job has been created
	const clearFormFields = () => {
		setJobData({
			school_id,
			job_title: "",
			job_description: "",
			job_location: "",
			job_zip: "",
			interview_location: "",
			contact_email: "",
			salary_range: "",
			preferred_degree: "",
			required_degree: "",
			preferred_experience: "",
			required_experience: "",
			application_url,
		});
		setLocation("");
		setApplicationUrl("");
		setSelectedPreferredDegree("");
		setSelectedRequiredDegree("");
	};

	//opens the job posting creation form
	const handleCreate = () => {
		setShowCreateJobPosting(true);
		clearFormFields();
	};

	//fetches the school id from the school_profile table
	useEffect(() => {
		const fetchSchoolId = async () => {
			try {
				const response = await fetch(
					`http://localhost:5000/api/school/users/${school_id}`
				);
				const data = await response.json();

				if (data.success) {
					setSchoolId(data.school_id); // Corrected function name
				} else {
					console.error("Error fetching user data:", data.message);
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		fetchSchoolId();
	}, [school_id]);

	//closes the job posting creation or edit form
	const handleCancel = () => {
		setShowCreateJobPosting(false);
		setEditJobId(null);
	};

	//saves the job data from create job posting form to database
	//updates viewable job list
	const handleSave = async (e) => {
		e.preventDefault();
		try {
			// Update jobData with the location state and applicationUrl state
			setJobData({
				...jobData,
				job_location: location,
				application_url: applicationUrl,
			});

			const response = await fetch(
				"http://localhost:5000/api/createJobPosting/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(jobData),
				}
			);

			// Parse the response as JSON
			const data = await response.json();

			console.log(data.success);

			// If response is successful, ...
			if (data.success) {
				setShowCreateJobPosting(false);
				setEditJobId(null);
				fetchJobList();
			} else {
				console.error("Error during job posting creation:", data.error);
			}
		} catch (error) {
			console.error("Error during job posting creation:", error);
		}
	};

	//fetches list of jobs a school has posted
	const fetchJobList = async () => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/school/users/${school_id}/jobPosting`
			);
			const data = await response.json();

			if (data.success) {
				setJobList(data.job || []); // Make sure to handle the case when job is null
			} else {
				console.error("Error fetching job data:", data.message);
			}
		} catch (error) {
			console.error("Error fetching job data:", error);
		}
	};
	useEffect(() => {
		const fetchJobData = async () => {
			try {
				await fetchJobList();
			} catch (error) {
				console.error("Error fetching job data:", error);
			}
		};

		fetchJobData();
	}, [school_id, fetchJobList]);

	//opens edit job posting form for speific job in viewable list
	// opens edit job posting form for specific job in viewable list
	const handleEdit = async (jobId) => {
		try {
			console.log("Editing job with ID:", jobId); // Add this console statement

			const response = await fetch(
				`http://localhost:5000/api/getJobPostingInfo?jobId=${jobId}`
			);
			const data = await response.json();
			if (data.success) {
				const job = data.job;
				setJobData({
					school_id: job.school_id,
					job_title: job.job_title,
					job_description: job.job_description,
					job_location: job.job_location,
					job_zip: job.job_zip,
					interview_location: job.interview_location,
					contact_email: job.contact_email,
					salary_range: job.salary_range,
					preferred_degree: job.preferred_degree,
					required_degree: job.required_degree,
					preferred_experience: job.preferred_experience,
					required_experience: job.required_experience,
					application_url: job.application_url, // Update this line
				});
				setEditJobId(jobId);
				// Set the location state when editing a job
				setLocation(job.job_location);
				// Set the selected preferred degree when editing a job
				setSelectedPreferredDegree(job.preferred_degree);
				// Set the selected degree when editing a job
				setSelectedRequiredDegree(job.required_degree);
				// Set the url when editing a job
				setApplicationUrl(job.application_url);
			} else {
				console.error("Error fetching job data:", data.error);
			}
		} catch (error) {
			console.error("Error fetching job data:", error);
		}
	};

	//updates the value in specific input fields as they are changed in edit form
	const handleChange = (e, jobId) => {
		const { name, value } = e.target;
		if (name === "location") {
			setLocation(value);
		} else {
			setJobData({
				...jobData,
				[name]: value,
			});
		}
	};

	// Update handleDegreeChange to set the required_degree field
	const handleRequiredDegreeChange = (degree) => {
		setSelectedRequiredDegree(degree);
		// Set the required_degree field in jobData
		setJobData({ ...jobData, required_degree: degree });
	};

	const handlePreferredDegreeChange = (degree) => {
		setSelectedPreferredDegree(degree);
		// Set the required_degree field in jobData
		setJobData({ ...jobData, preferred_degree: degree });
	};

	// Update handleLocationChange to capture location input
	const handleLocationChange = (e) => {
		setLocation(e.target.value);
	};

	// Update handleApplicationChange to capture the link
	const handleApplicationUrlChange = (e) => {
		setApplicationUrl(e.target.value);
	};

	//saves the edited job data from edit form to database
	//updates viewable job list
	const handleUpdate = async (e) => {
		e.preventDefault();

		try {
			console.log("Sending application URL to backend:", applicationUrl);

			// Explicitly set the application_url property of jobData
			const updatedJobData = { ...jobData, application_url: applicationUrl };

			const response = await fetch(
				"http://localhost:5000/api/updateJobPosting",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ jobId: editJobId, jobData: updatedJobData }),
				}
			);

			const data = await response.json();

			if (data.success) {
				setEditJobId(null);
				fetchJobList();
			} else {
				console.error("Error during job posting update:", data.error);
			}
		} catch (error) {
			console.error("Error during job posting update:", error);
		}
	};

	return (
		<div className="profile-content">
			<div className="section-header">
				<h2>Job Postings</h2>
				{/* Header buttons */}
				<div>
					{/* Edit button toggles editing state */}
					<input type="submit" value="Add a Posting" onClick={handleCreate} />
				</div>
			</div>

			{showCreateJobPosting && (
				//if create button is clicted the create form opens
				<form className="create-listing">
					<h2>Create a Job Posting</h2>
					<p>
						Please complete all information and click "Save" before exiting this
						page.
					</p>
					<div className="form-group">
						<label className="label">Job Title</label>
						<input
							className="input-field"
							value={jobData.job_title}
							onChange={handleChange}
							type="text"
							id="job_title"
							name="job_title"
							required
						/>
					</div>
					<div className="form-group">
						<label className="label">Job Description</label>
						<textarea
							value={jobData.job_description}
							onChange={handleChange}
							type="text"
							id="job_description"
							name="job_description"
							required
						/>
					</div>
					<div className="form-group">
						<label className="label">Job Location State</label>
						<input
							className="input-field"
							value={jobData.job_location}
							onChange={handleChange}
							type="text"
							id="job_location"
							name="job_location" // Make sure the name attribute matches
							required
						/>
					</div>
					<div className="form-group">
						<label className="label">Job Location Zip</label>
						<p>First 3 Numbers Only</p>

						<input
							className="input-field"
							value={jobData.job_zip}
							onChange={handleChange}
							type="text"
							id="job_zip"
							name="job_zip" // Make sure the name attribute matches
							required
						/>
					</div>
					<div className="form-group">
						<label className="label">Interview Location</label>
						<input
							className="input-field"
							value={jobData.interview_location}
							onChange={handleChange}
							type="text"
							id="interview_location"
							name="interview_location"
							required
						/>
					</div>
					<div className="form-group">
						<label className="label">Contact Email</label>
						<input
							className="input-field"
							value={jobData.contact_email}
							onChange={handleChange}
							type="text"
							id="contact_email"
							name="contact_email"
							required
						/>
					</div>
					<div className="form-group">
						<label className="label">Application Link</label>
						<input
							className="input-field"
							value={applicationUrl}
							onChange={handleApplicationUrlChange}
							type="text"
							id="application_url"
							name="application_url"
						/>
					</div>
					<div className="form-group">
						<label className="label">Salary Range</label>
						<input
							className="input-field"
							value={jobData.salary_range}
							onChange={handleChange}
							type="text"
							id="salary_range"
							name="salary_range"
						/>
					</div>
					<div className="form-group">
						<label className="label">Preferred Degree</label>
						{/* Map over degree options to render radio buttons */}
						{degreeOptions.map((option) => (
							<label className="radio-label" key={option}>
								<input
									type="radio"
									name="preferred_degree"
									id="preferred_degree"
									value={option}
									checked={selectedPreferredDegree === option}
									onChange={() => handlePreferredDegreeChange(option)}
								/>
								{option}
							</label>
						))}
					</div>
					<div className="form-group">
						<label className="label">Required Degree</label>
						{/* Map over degree options to render radio buttons */}
						{degreeOptions.map((option) => (
							<label className="radio-label" key={option}>
								<input
									type="radio"
									name="required_degree"
									id="required_degree"
									value={option}
									checked={selectedRequiredDegree === option}
									onChange={() => handleRequiredDegreeChange(option)}
								/>
								{option}
							</label>
						))}
					</div>
					<div className="form-group">
						<label className="label">Preferred Experience</label>
						<textarea
							value={jobData.preferred_experience}
							onChange={handleChange}
							type="text"
							id="preferred_experience"
							name="preferred_experience"
						/>
					</div>
					<div className="form-group">
						<label className="label">Required Experience</label>
						<textarea
							value={jobData.required_experience}
							onChange={handleChange}
							type="text"
							id="required_experience"
							name="required_experience"
							required
						/>
					</div>

					<div className="option-buttons">
						<input
							type="button"
							value="Cancel"
							className="cancel-button"
							onClick={handleCancel}
						></input>
						<input type="submit" value="Save" onClick={handleSave}></input>
					</div>
				</form>
			)}

			{jobList &&
				jobList
					.toReversed() //reverses jobList array so that the most recently created job is first
					.map((job) => (
						<div className="job-item" key={job.job_id}>
							{editJobId === job.job_id ? (
								// if edit button is clicked on a job in list, edit form opends
								<form className="create-listing">
									<div className="form-group">
										<label className="label">Job Title</label>
										<input
											className="input-field"
											value={jobData.job_title}
											onChange={handleChange}
											type="text"
											id="job_title"
											name="job_title"
											required
										/>
									</div>
									<div className="form-group">
										<label className="label">Job Description</label>
										<textarea
											value={jobData.job_description}
											onChange={handleChange}
											type="text"
											id="job_description"
											name="job_description"
											required
										/>
									</div>

									<div className="form-group">
										<label className="label">Job Location State</label>
										<input
											className="input-field"
											value={jobData.job_location}
											onChange={handleChange}
											type="text"
											id="job_location"
											name="job_location" // Make sure the name attribute matches
										/>
									</div>
									<div className="form-group">
										<label className="label">Job Location Zip</label>
										<p>First 3 Numbers Only</p>

										<input
											className="input-field"
											value={jobData.job_zip}
											onChange={handleChange}
											type="text"
											id="job_zip"
											name="job_zip" // Make sure the name attribute matches
										/>
									</div>
									<div className="form-group">
										<label className="label">Interview Location</label>
										<input
											className="input-field"
											value={jobData.interview_location}
											onChange={handleChange}
											type="text"
											id="interview_location"
											name="interview_location"
											required
										/>
									</div>
									<div className="form-group">
										<label className="label">Contact Email</label>
										<input
											className="input-field"
											value={jobData.contact_email}
											onChange={handleChange}
											type="text"
											id="contact_email"
											name="contact_email"
											required
										/>
									</div>
									<div className="form-group">
										<label className="label">Application Link</label>
										<input
											className="input-field"
											value={applicationUrl}
											onChange={handleApplicationUrlChange}
											type="text"
											id="application_url"
											name="application_url"
										/>
									</div>
									<div className="form-group">
										<label className="label">Salary Range</label>
										<input
											className="input-field"
											value={jobData.salary_range}
											onChange={handleChange}
											type="text"
											id="salary_range"
											name="salary_range"
										/>
									</div>
									<div className="form-group">
										<label className="label">Preferred Degree</label>
										{degreeOptions.map((option) => (
											<label className="radio-label" key={option}>
												<input
													type="radio"
													name="preferred_degree"
													id="preferred_degree"
													value={option}
													checked={selectedPreferredDegree === option}
													onChange={() => handlePreferredDegreeChange(option)}
												/>
												{option}
											</label>
										))}
									</div>
									<div className="form-group">
										<label className="label">Required Degree</label>
										{/* Map over degree options to render radio buttons */}
										{degreeOptions.map((option) => (
											<label className="radio-label" key={option}>
												<input
													type="radio"
													name="required_degree"
													value={option}
													checked={selectedRequiredDegree === option}
													onChange={() => handleRequiredDegreeChange(option)}
												/>
												{option}
											</label>
										))}
									</div>
									<div className="form-group">
										<label className="label">Preferred Experience</label>
										<textarea
											value={jobData.preferred_experience}
											onChange={handleChange}
											type="text"
											id="preferred_experience"
											name="preferred_experience"
										/>
									</div>
									<div className="form-group">
										<label className="label">Required Experience</label>
										<textarea
											value={jobData.required_experience}
											onChange={handleChange}
											type="text"
											id="required_experience"
											name="required_experience"
											required
										/>
									</div>

									<div className="option-buttons">
										<input
											type="button"
											value="Cancel"
											className="cancel-button"
											onClick={handleCancel}
										></input>
										<input
											type="submit"
											value="Save"
											onClick={handleUpdate}
										></input>
									</div>
								</form>
							) : (
								// if the job posting is not being edited, it shows up in list view
								<div className="job-posting">
									<p>{job.job_title}</p>
									<div className="job-buttons">
										{/*<input type="submit" value="View Applicants"></input>*/}
										<input
											type="submit"
											value="Edit"
											onClick={() => handleEdit(job.job_id)}
										></input>
									</div>
								</div>
							)}
						</div>
					))}
		</div>
	);
}
