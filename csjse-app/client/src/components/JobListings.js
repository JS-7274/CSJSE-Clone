import React, { useState } from "react";
import CreateJobPosting from "./CreateJobListing";

export default function JobListings() {
	const [showCreateJobPosting, setShowCreateJobPosting] = useState(false); // State to manage the visibility of the logout confirmation popup

	const handleCreate = () => {
		setShowCreateJobPosting(true);
	};
	return (
		<div className="profile-content">
			<div className="section-header">
				<h2>Job Postings</h2>
				{/* Header buttons */}
				<div>
					{/* Edit button toggles editing state */}
					<input type="submit" value="Create" onClick={handleCreate} />
				</div>
			</div>

			{showCreateJobPosting && <CreateJobPosting />}

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
