import React from "react";

export default function JobListings() {
	return (
		<div className="profile-content">
			<div className="section-header">
				<h2>Job Postings</h2>
				{/* Header buttons */}
				<div>
					{/* Edit button toggles editing state */}
					<input type="submit" value="Create" />
				</div>
			</div>

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
