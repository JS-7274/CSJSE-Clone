import React, { useState } from "react";
import "../styles/JobListings.css";

export default function JobListings() {
	const [showCreateJobPosting, setShowCreateJobPosting] = useState(false); // State to manage the visibility of the logout confirmation popup

	const handleCreate = () => {
		setShowCreateJobPosting(true);
	};

	const handleCancel = () => {
		setShowCreateJobPosting(false);
	};

	const handleSave = () => {};

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
						<input className="input-field" />
					</div>
					<div className="form-group">
						<label className="label">Job Description</label>
						<input className="input-field" />
					</div>
					<div className="form-group">
						<label className="label">Job Location</label>
						<input className="input-field" />
					</div>
					<div className="form-group">
						<label className="label">Interview Location</label>
						<input className="input-field" />
					</div>
					<div className="form-group">
						<label className="label">Contact Email</label>
						<input className="input-field" />
					</div>
					<div className="form-group">
						<label className="label">Salary Range</label>
						<input className="input-field" />
					</div>
					<div className="form-group">
						<label className="label">Preferred Degree</label>
						<input className="input-field" />
					</div>
					<div className="form-group">
						<label className="label">Required Degree</label>
						<input className="input-field" />
					</div>
					<div className="form-group">
						<label className="label" htmlFor="password">
							Preferred Experience
						</label>
						<input className="input-field" />
					</div>
					<div className="form-group">
						<label className="label">Required Experience</label>
						<input className="input-field" />
					</div>
					<div>
						<button type="button" className="button">
							Save
						</button>
						<button type="button" className="button" onClick={handleCancel}>
							Cancel
						</button>
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
