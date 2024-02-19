import React from "react";
import "../styles/JobListings.css";

export default function CreateJobListing() {
	return (
		<form className="create-listing">
			<h2>Create a Job Posting</h2>
			<div className="form-group">
				<label className="label">Job Title</label>
				<input className="input-field" />
			</div>
			<div className="form-group">
				<label className="label">Job Description</label>
				<input className="input-field" />
			</div>
			<div className="form-group">
				<label className="label">Salary</label>
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
				<button type="button" className="button">
					Cancel
				</button>
			</div>
		</form>
	);
}
