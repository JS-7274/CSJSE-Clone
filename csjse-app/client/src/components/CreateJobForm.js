import React, { useState } from "react";

export default function CreateJobForm(onSave, onCancel) {
	const [jobData, setJobData] = useState({
		job_title: "",
		job_description: "",
		job_location: "",
		interview_location: "",
		contact_email: "",
		salary_range: "",
		preferred_degree: "",
		required_degree: "",
		preferred_experience: "",
		required_experience: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setJobData((prevJobData) => ({
			...prevJobData,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSave(jobData);
	};

	return (
		<form className="create-listing" onSubmit={handleSubmit}>
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
					value={jobData.job_descriptiondes}
					onChange={handleChange}
					type="text"
					id="job_description"
					name="job_description"
					//required
				/>
			</div>
			<div className="form-group">
				<label className="label">Job Location</label>
				<input
					className="input-field"
					value={jobData.job_location}
					onChange={handleChange}
					type="text"
					id="job_location"
					name="job_location"
					//required
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
					//required
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
					//required
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
				<input
					className="input-field"
					value={jobData.preferred_degree}
					onChange={handleChange}
					type="text"
					id="preferred_degree"
					name="preferred_degree"
				/>
			</div>
			<div className="form-group">
				<label className="label">Required Degree</label>
				<input
					className="input-field"
					value={jobData.required_degree}
					onChange={handleChange}
					type="text"
					id="required_degree"
					name="required_degree"
					//required
				/>
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
					//required
				/>
			</div>
			<div className="option-buttons">
				<input
					type="button"
					value="Cancel"
					className="cancel-button"
					onClick={onCancel}
				></input>
				<input type="submit" value="Save"></input>
			</div>
		</form>
	);
}
