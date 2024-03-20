/* This file handles the display of references in profiles. */

import React, { useState } from "react";

export default function References() {
	// State for managing editing mode
	const [isEditing, setIsEditing] = useState(false);
	// State for tracking reference 1 details
	const [R1Name, setR1Name] = useState("");
	const [R1Relationship, setR1Relationship] = useState("");
	const [setR1RelationType] = useState("");
	const [R1PhoneNumber, setR1PhoneNumber] = useState("");
	const [R1Email, setR1Email] = useState("");
	// State for tracking reference 2 details
	const [R2Name, setR2Name] = useState("");
	const [R2Relationship, setR2Relationship] = useState("");
	const [setR2RelationType] = useState("");
	const [R2PhoneNumber, setR2PhoneNumber] = useState("");
	const [R2Email, setR2Email] = useState("");
	// State for tracking reference 3 details
	const [R3Name, setR3Name] = useState("");
	const [R3Relationship, setR3Relationship] = useState("");
	const [setR3RelationType] = useState("");
	const [R3PhoneNumber, setR3PhoneNumber] = useState("");
	const [R3Email, setR3Email] = useState("");

	// Function to toggle editing mode
	const toggleEditing = () => {
		setIsEditing(!isEditing);
	};

	// Function to handle saving changes
	const handleSave = () => {
		setIsEditing(false); // Disable editing mode
	};

	// Function to handle input changes
	const handleInputChange = (event, setter) => {
		setter(event.target.value);
	};

	return (
		<div>
			<div className="section-header">
				<h2>References</h2>
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
			{/* Reference 1 */}
			<h3>Reference 1</h3>
			<div className="form-group">
				<label>Name</label>
				<input
					className="input-field"
					type="text"
					value={R1Name}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setR1Name)}
				/>
			</div>
			<div className="form-group">
				<label>Relationship</label>
				<input
					className="input-field"
					type="text"
					value={R1Relationship}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setR1Relationship)}
				/>
			</div>
			<div className="form-group">
				<label>Type of Relationship</label>
				<label className="radio-label">
					<input
						type="radio"
						id="type-of-relationship"
						value="professional"
						disabled={!isEditing}
						onChange={(event) => handleInputChange(event, setR1RelationType)}
					/>
					Professional
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="type-of-relationship"
						value="professional"
						disabled={!isEditing}
						onChange={(event) => handleInputChange(event, setR1RelationType)}
					/>
					Pastoral
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="type-of-relationship"
						value="academic"
						disabled={!isEditing}
						onChange={(event) => handleInputChange(event, setR1RelationType)}
					/>
					Academic
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="type-of-relationship"
						value="personal"
						disabled={!isEditing}
						onChange={(event) => handleInputChange(event, setR1RelationType)}
					/>
					Personal
				</label>
			</div>
			<div className="form-group">
				<label>Phone Number</label>
				<input
					className="input-field"
					type="text"
					value={R1PhoneNumber}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setR1PhoneNumber)}
				/>
			</div>
			<div className="form-group">
				<label>Email</label>
				<input
					className="input-field"
					type="text"
					value={R1Email}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setR1Email)}
				/>
			</div>

			{/* Reference 2 */}
			<h3>Reference 2</h3>
			<div className="form-group">
				<label>Name</label>
				<input
					className="input-field"
					type="text"
					value={R2Name}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setR2Name)}
				/>
			</div>
			<div className="form-group">
				<label>Relationship</label>
				<input
					className="input-field"
					type="text"
					value={R2Relationship}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setR2Relationship)}
				/>
			</div>
			<div className="form-group">
				<label>Type of Relationship</label>
				<label className="radio-label">
					<input
						type="radio"
						id="type-of-relationship"
						value="professional"
						disabled={!isEditing}
						onChange={(event) => handleInputChange(event, setR2RelationType)}
					/>
					Professional
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="type-of-relationship"
						value="professional"
						disabled={!isEditing}
						onChange={(event) => handleInputChange(event, setR1RelationType)}
					/>
					Pastoral
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="type-of-relationship"
						value="academic"
						disabled={!isEditing}
						onChange={(event) => handleInputChange(event, setR2RelationType)}
					/>
					Academic
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="type-of-relationship"
						value="personal"
						disabled={!isEditing}
						onChange={(event) => handleInputChange(event, setR2RelationType)}
					/>
					Personal
				</label>
			</div>
			<div className="form-group">
				<label>Phone Number</label>
				<input
					className="input-field"
					type="text"
					value={R2PhoneNumber}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setR2PhoneNumber)}
				/>
			</div>
			<div className="form-group">
				<label>Email</label>
				<input
					className="input-field"
					type="text"
					value={R2Email}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setR2Email)}
				/>
			</div>

			{/* Reference 3 */}
			<h3>Reference 3</h3>
			<div className="form-group">
				<label>Name</label>
				<input
					className="input-field"
					type="text"
					value={R3Name}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setR3Name)}
				/>
			</div>
			<div className="form-group">
				<label>Relationship</label>
				<input
					className="input-field"
					type="text"
					value={R3Relationship}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setR3Relationship)}
				/>
			</div>
			<div className="form-group">
				<label>Type of Relationship</label>
				<label className="radio-label">
					<input
						type="radio"
						id="type-of-relationship"
						value="professional"
						disabled={!isEditing}
						onChange={(event) => handleInputChange(event, setR3RelationType)}
					/>
					Professional
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="type-of-relationship"
						value="professional"
						disabled={!isEditing}
						onChange={(event) => handleInputChange(event, setR1RelationType)}
					/>
					Pastoral
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="type-of-relationship"
						value="academic"
						disabled={!isEditing}
						onChange={(event) => handleInputChange(event, setR3RelationType)}
					/>
					Academic
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="type-of-relationship"
						value="personal"
						disabled={!isEditing}
						onChange={(event) => handleInputChange(event, setR3RelationType)}
					/>
					Personal
				</label>
			</div>
			<div className="form-group">
				<label>Phone Number</label>
				<input
					className="input-field"
					type="text"
					value={R3PhoneNumber}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setR3PhoneNumber)}
				/>
			</div>
			<div className="form-group">
				<label>Email</label>
				<input
					className="input-field"
					type="text"
					value={R3Email}
					disabled={!isEditing}
					onChange={(event) => handleInputChange(event, setR3Email)}
				/>
			</div>
		</div>
	);
}
