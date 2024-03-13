import React from "react";

const EditJobListing = ({
	job,
	handleInputChange,
	handleUpdate,
	handleCancel,
	title,
	setTitle,
	des,
	setDes,
	loc,
	setLoc,
	interviewLoc,
	setInterviewLoc,
	email,
	setEmail,
	salary,
	setSalary,
	prefDeg,
	setPrefDeg,
	reqDeg,
	setReqDeg,
	prefExp,
	setPrefExp,
	reqExp,
	setReqExp,
}) => {
	return (
		<form className="create-listing">
			<div className="form-group">
				<label className="label">Job Title</label>
				<input
					className="input-field"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					type="text"
					id={`jobTitle`}
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
	);
};

export default EditJobListing;
