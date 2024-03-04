import React, { useState } from "react";

export default function JobListings() {
	// State to manage the visibility of the create job posting form
	const [showCreateJobPosting, setShowCreateJobPosting] = useState(false);
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

	const handleCreate = () => {
		setShowCreateJobPosting(true);
	};

	const handleCancel = () => {
		setShowCreateJobPosting(false);
	};

	const handleSave = async (e) => {
		e.preventDefault();
		//creates an object to pass the job data to backend
		const jobData = {
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
				"http://localhost:5000/api/createJobPosting",
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
			} else {
				console.error("Error during job posting creation:", data.error);
			}
		} catch (error) {
			console.error("Error during job posting creation:", error);
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
				<form className="create-listing" onSubmit={handleSave}>
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
							required
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
							required
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
							required
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
							required
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
							required
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
							required
						/>
					</div>
					<div className="option-buttons">
						<input
							type="submit"
							value="Cancel"
							className="cancel-button"
							onClick={handleCancel}
						></input>
						<input type="submit" value="Save"></input>
					</div>
				</form>
			)}

			<div className="job-item">
				<div className="job-posting">
					<p>[Position Title]</p>
					<div className="job-buttons">
						<input type="submit" value="View Applicants"></input>
						<input type="submit" value="Edit"></input>
					</div>
				</div>
			</div>
		</div>
	);
}
