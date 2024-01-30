import React, { useState } from "react";

export default function LoginInfo() {
	const [isEditing, setIsEditing] = useState(false);

	const toggleEditing = () => {
		setIsEditing(!isEditing);
	};

	const handleSave = () => {
		setIsEditing(false);
	};

	return (
		<div>
			<div className="section-header">
				<h2>Login Information</h2>
				<div className="header-buttons">
					{/* Edit button toggles editing state */}
					<input
						type="submit"
						value="Edit"
						disabled={isEditing}
						onClick={toggleEditing}
					/>
					{/* Save button enabled only when in editing mode */}
					<input
						type="submit"
						value="Save"
						disabled={!isEditing}
						onClick={handleSave}
					/>
				</div>
			</div>
			<div className="form-group">
				<label>Email</label>
				{/* Input field enabled based on editing state */}
				<input className="input-field" type="email" disabled={!isEditing} />
			</div>
			<div className="form-group">
				<label>Password</label>
				{/* Input field enabled based on editing state */}
				<input className="input-field" type="password" disabled={!isEditing} />
			</div>
		</div>
	);
}
