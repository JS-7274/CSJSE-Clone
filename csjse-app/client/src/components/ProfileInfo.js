import React from "react";

export default function ProfileInfo() {
	return (
		<div>
			<div className="section-header">
				<h2>Profile Information</h2>
				<div className="header-buttons">
					<button>Edit</button>
					<input type="submit" value="Save" disabled />
				</div>
			</div>
			<div className="form-group">
				<label>First Name</label>
				<input className="input-field" type="text" value="" disabled />
			</div>
			<div className="form-group">
				<label>Last Name</label>
				<input className="input-field" type="text" value="" disabled />
			</div>
			<div className="form-group">
				<label>Looking for a Job?</label>
				<label className="radio-label">
					<input type="radio" id="looking-for-job" value="Yes" disabled />
					Yes
				</label>
				<label className="radio-label">
					<input type="radio" id="looking-for-job" value="No" disabled />
					No
				</label>
			</div>
			<div className="form-group">
				<label>Phone Number</label>
				<input className="input-field" type="text" value="" disabled />
			</div>
			<div className="form-group">
				<label>Home Church</label>
				<input className="input-field" type="text" value="" disabled />
			</div>

			<div className="form-group">
				<label>Resume</label>
				<input className="" type="file" value="" disabled />
			</div>
			<div className="form-group">
				<label>Testimony</label>
				<input className="input-field" type="text" value="" disabled />
			</div>
		</div>
	);
}
