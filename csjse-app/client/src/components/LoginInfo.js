import React, { useState } from "react";

export default function LoginInfo() {
	const [isEditing, setIsEditing] = useState(false);
	const [email, setEmail] = useState(""); // State to track email input value
	const [password, setPassword] = useState(""); // State to track password input value

	const toggleEditing = () => {
		setIsEditing(!isEditing);
	};

	const handleSave = () => {
		setIsEditing(false);
	};

	const handleEmailChange = (event) => {
		setEmail(event.target.value); // Update email state with user input
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value); // Update password state with user input
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
				<input
					className="input-field"
					type="email"
					value={email}
					disabled={!isEditing}
					onChange={handleEmailChange}
				/>
			</div>
			<div className="form-group">
				<label>Password</label>
				{/* Input field enabled based on editing state */}
				<input
					className="input-field"
					type="password"
					value={password}
					disabled={!isEditing}
					onChange={handlePasswordChange}
				/>
			</div>
		</div>
	);
}
