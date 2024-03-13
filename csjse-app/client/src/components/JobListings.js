import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function JobListings() {
	// State to manage the visibility of the create job posting form
	const [showCreateJobPosting, setShowCreateJobPosting] = useState(false);
	//const [userData, setUserData] = useState(null);
	const [jobList, setJobList] = useState([]);
	const [editJobId, setEditJobId] = useState(null);
	const [title, setTitle] = useState("");
	const [des, setDes] = useState("");
	const [loc, setLoc] = useState("");
	const [interviewLoc, setInterviewLoc] = useState("");
	const [email, setEmail] = useState("");
	const [salary, setSalary] = useState("");
	const [prefDeg, setPrefDeg] = useState("");
	const [reqDeg, setReqDeg] = useState("");
	const [prefExp, setPrefExp] = useState("");
	const [reqExp, setReqExp] = useState("");

	const { school_id } = useParams();

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

	const handleCreate = () => {
		setShowCreateJobPosting(true);
	};

	const handleCancel = () => {
		setShowCreateJobPosting(false);

		setEditJobId(null);
	};

	const handleEdit = (jobId) => {
		setEditJobId(jobId);
	};

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await fetch(
					`http://localhost:5000/api/school/users/${school_id}`
				);
				const data = await response.json();

				if (data.success) {
					//setUserData(data.user); // Set the user data directly
				} else {
					console.error("Error fetching user data:", data.message);
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		fetchUserData();
	}, [school_id]);

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

	const handleSave = async (e) => {
		e.preventDefault();
		//creates an object to pass the job data to backend
		const jobData = {
			school_id,
			title,
			des,
			loc,
			interviewLoc,
			email,
			salary,
			prefDeg,
			reqDeg,
			prefExp,
			reqExp,
		};

		try {
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

	const handleInputChange = (e, jobId) => {
		console.log("handleInputChange called");
		const { name, value } = e.target;
		console.log("name:", name);
		console.log("value:", value);
		if (name === "job_title") {
			setTitle(value);
		}
	};

	const handleUpdate = async (e, jobId) => {
		e.preventDefault();
		//creates an object to pass the job data to backend
		const jobData = {
			job_id: jobId,
			title, // Use the state variables directly here
			des,
			loc,
			interviewLoc,
			email,
			salary,
			prefDeg,
			reqDeg,
			prefExp,
			reqExp,
		};

		try {
			const response = await fetch(
				"http://localhost:5000/api/updateJobPosting/",
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
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							type="text"
							id="jobTitle"
							name="jobTitle"
							required
						/>
					</div>
					<div className="form-group">
						<label className="label">Job Description</label>
						<textarea
							value={des}
							onChange={(e) => setDes(e.target.value)}
							type="text"
							id="jobDescription"
							name="jobDescription"
							//required
						/>
					</div>
					<div className="form-group">
						<label className="label">Job Location</label>
						<input
							className="input-field"
							value={loc}
							onChange={(e) => setLoc(e.target.value)}
							type="text"
							id="location"
							name="location"
							//required
						/>
					</div>
					<div className="form-group">
						<label className="label">Interview Location</label>
						<input
							className="input-field"
							value={interviewLoc}
							onChange={(e) => setInterviewLoc(e.target.value)}
							type="text"
							id="interviewLocation"
							name="interviewLocation"
							//required
						/>
					</div>
					<div className="form-group">
						<label className="label">Contact Email</label>
						<input
							className="input-field"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="text"
							id="contactEmail"
							name="contactEmail"
							//required
						/>
					</div>
					<div className="form-group">
						<label className="label">Salary Range</label>
						<input
							className="input-field"
							value={salary}
							onChange={(e) => setSalary(e.target.value)}
							type="text"
							id="salaryRange"
							name="salaryRange"
						/>
					</div>
					<div className="form-group">
						<label className="label">Preferred Degree</label>
						<input
							className="input-field"
							value={prefDeg}
							onChange={(e) => setPrefDeg(e.target.value)}
							type="text"
							id="preferredDegree"
							name="preferredDegree"
						/>
					</div>
					<div className="form-group">
						<label className="label">Required Degree</label>
						<input
							className="input-field"
							value={reqDeg}
							onChange={(e) => setReqDeg(e.target.value)}
							type="text"
							id="requiredDegree"
							name="requiredDegree"
							//required
						/>
					</div>
					<div className="form-group">
						<label className="label">Preferred Experience</label>
						<textarea
							value={prefExp}
							onChange={(e) => setPrefExp(e.target.value)}
							type="text"
							id="preferredExperience"
							name="preferredExperience"
						/>
					</div>
					<div className="form-group">
						<label className="label">Required Experience</label>
						<textarea
							value={reqExp}
							onChange={(e) => setReqExp(e.target.value)}
							type="text"
							id="requiredExperience"
							name="requiredExperience"
							//required
						/>
					</div>
					<div className="option-buttons">
						<input
							type="submit"
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
								<form className="create-listing">
									<div className="form-group">
										<label className="label">Job Title</label>
										<input
											className="input-field"
											placeholder={job.job_title}
											value={title}
											onChange={(e) => handleInputChange(e, job.job_title)}
											type="text"
											id={`jobTitle-${job.job_id}`}
											name="job_title"
											required
										/>
									</div>
									<div className="form-group">
										<label className="label">Job Description</label>
										<textarea
											value={job.job_description}
											onChange={(e) => setDes(e.target.value)}
											type="text"
											id="jobDescription"
											name="jobDescription"
											//required
										/>
									</div>
									<div className="form-group">
										<label className="label">Job Location</label>
										<input
											className="input-field"
											value={job.job_location}
											onChange={(e) => setLoc(e.target.value)}
											type="text"
											id="location"
											name="location"
											//required
										/>
									</div>
									<div className="form-group">
										<label className="label">Interview Location</label>
										<input
											className="input-field"
											value={job.interview_location}
											onChange={(e) => setInterviewLoc(e.target.value)}
											type="text"
											id="interviewLocation"
											name="interviewLocation"
											//required
										/>
									</div>
									<div className="form-group">
										<label className="label">Contact Email</label>
										<input
											className="input-field"
											value={job.contact_email}
											onChange={(e) => setEmail(e.target.value)}
											type="text"
											id="contactEmail"
											name="contactEmail"
											//required
										/>
									</div>
									<div className="form-group">
										<label className="label">Salary Range</label>
										<input
											className="input-field"
											value={job.salary_range}
											onChange={(e) => setSalary(e.target.value)}
											type="text"
											id="salaryRange"
											name="salaryRange"
										/>
									</div>
									<div className="form-group">
										<label className="label">Preferred Degree</label>
										<input
											className="input-field"
											value={job.preferred_degree}
											onChange={(e) => setPrefDeg(e.target.value)}
											type="text"
											id="preferredDegree"
											name="preferredDegree"
										/>
									</div>
									<div className="form-group">
										<label className="label">Required Degree</label>
										<input
											className="input-field"
											value={job.required_degree}
											onChange={(e) => setReqDeg(e.target.value)}
											type="text"
											id="requiredDegree"
											name="requiredDegree"
											//required
										/>
									</div>
									<div className="form-group">
										<label className="label">Preferred Experience</label>
										<textarea
											value={job.preferred_experience}
											onChange={(e) => setPrefExp(e.target.value)}
											type="text"
											id="preferredExperience"
											name="preferredExperience"
										/>
									</div>
									<div className="form-group">
										<label className="label">Required Experience</label>
										<textarea
											value={job.required_experience}
											onChange={(e) => setReqExp(e.target.value)}
											type="text"
											id="requiredExperience"
											name="requiredExperience"
											//required
										/>
									</div>
									<div className="option-buttons">
										<input
											type="submit"
											value="Cancel"
											className="cancel-button"
											onClick={handleCancel}
										></input>
										<input
											type="submit"
											value="Save"
											onClick={() => handleUpdate(job.job_id)}
										></input>
									</div>
								</form>
							) : (
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
