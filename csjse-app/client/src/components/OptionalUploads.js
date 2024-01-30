import React from "react";

export default function OptionalUploads() {
	return (
		<div>
			<div className="section-header">
				<h2>Optional Uploads</h2>
				<div className="header-buttons">
					<button>Edit</button>
					<input type="submit" value="Save" disabled />
				</div>
			</div>

			<div className="form-group">
				<label>Cover Letter</label>
				<input className="" type="file" value="" disabled />
			</div>
			<div className="form-group">
				<label>Headshot</label>
				<input className="" type="file" value="" disabled />
			</div>
		</div>
	);
}
