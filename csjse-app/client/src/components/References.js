/* This file handles the display of references in profiles. */

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function References() {
	// State for managing editing mode
	const [isEditing, setIsEditing] = useState(false);
	const [id, setId] = useState("");
	const { teacher_staff_id } = useParams();
	console.log("ID:", id);

	const [referencesData, setReferencesData] = useState({
		teacher_staff_id,
		r1_name: "",
		r1_relationship: "",
		r1_relation_type: "",
		r1_phone_number: "",
		r1_email: "",
		r2_name: "",
		r2_relationship: "",
		r2_relation_type: "",
		r2_phone_number: "",
		r2_email: "",
		r3_name: "",
		r3_relationship: "",
		r3_relation_type: "",
		r3_phone_number: "",
		r3_email: "",
	});

	useEffect(() => {
		const fetchId = async () => {
			try {
				const response = await fetch(
					`http://localhost:5000/api/teachers/users/${teacher_staff_id}`
				);
				const data = await response.json();

				if (data.success) {
					setReferencesData(
						setReferencesData({
							...referencesData,
							[teacher_staff_id]: data.teacher_staff_id,
						})
					); // Corrected function name
				} else {
					console.error("Error fetching user data:", data.message);
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		fetchId();
	}, [teacher_staff_id]);

	// Function to toggle editing mode
	const toggleEditing = () => {
		setIsEditing(!isEditing);
	};

	// Function to handle saving changes
	const handleSave = async (e) => {
		e.preventDefault();
		try {
			// Update jobData with the location state and applicationUrl state
			setReferencesData({
				...referencesData,
			});

			const response = await fetch(
				"http://localhost:5000/api/updateReferences/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(referencesData),
				}
			);

			// Parse the response as JSON
			const data = await response.json();

			console.log(data.success);

			// If response is successful, ...
			if (data.success) {
				setIsEditing(!isEditing);
			} else {
				console.error("Error during job posting creation:", data.error);
			}
		} catch (error) {
			console.error("Error during job posting creation:", error);
		}
	};

	// Function to handle input changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setReferencesData({
			...referencesData,
			[name]: value,
		});
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
					id="r1_name"
					name="r1_name"
					value={referencesData.r1_name}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Relationship</label>
				<input
					className="input-field"
					type="text"
					id="r1_relationship"
					name="r1_relationship"
					value={referencesData.r1_relationship}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Type of Relationship</label>
				<label className="radio-label">
					<input
						type="radio"
						id="r1_relation_type"
						name="r1_relation_type"
						value="professional"
						disabled={!isEditing}
						onChange={handleChange}
					/>
					Professional
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="r1_relation_type"
						name="r1_relation_type"
						value="pastoral"
						disabled={!isEditing}
						onChange={handleChange}
					/>
					Pastoral
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="r1_relation_type"
						name="r1_relation_type"
						value="academic"
						disabled={!isEditing}
						onChange={handleChange}
					/>
					Academic
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="r1_relation_type"
						name="r1_relation_type"
						value="personal"
						disabled={!isEditing}
						onChange={handleChange}
					/>
					Personal
				</label>
			</div>
			<div className="form-group">
				<label>Phone Number</label>
				<input
					className="input-field"
					type="text"
					id="r1_phone_number"
					name="r1_phone_number"
					value={referencesData.r1_phone_number}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Email</label>
				<input
					className="input-field"
					type="text"
					id="r1_email"
					name="r1_email"
					value={referencesData.r1_email}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>

			{/* Reference 2 */}
			<h3>Reference 2</h3>
			<div className="form-group">
				<label>Name</label>
				<input
					className="input-field"
					type="text"
					id="r2_name"
					name="r2_name"
					value={referencesData.r2_name}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Relationship</label>
				<input
					className="input-field"
					type="text"
					id="r2_relationship"
					name="r2_relationship"
					value={referencesData.r2_relationship}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Type of Relationship</label>
				<label className="radio-label">
					<input
						type="radio"
						id="r2_relation_type"
						name="r2_relation_type"
						value="professional"
						disabled={!isEditing}
						onChange={handleChange}
					/>
					Professional
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="r2_relation_type"
						name="r2_relation_type"
						value="pastoral"
						disabled={!isEditing}
						onChange={handleChange}
					/>
					Pastoral
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="r2_relation_type"
						name="r2_relation_type"
						value="academic"
						disabled={!isEditing}
						onChange={handleChange}
					/>
					Academic
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="type-of-relationship"
						name="type-of-relationship"
						value="personal"
						disabled={!isEditing}
						onChange={handleChange}
					/>
					Personal
				</label>
			</div>
			<div className="form-group">
				<label>Phone Number</label>
				<input
					className="input-field"
					type="text"
					id="r2_phone-number"
					name="r2_phone-number"
					value={referencesData.r2_phone_number}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Email</label>
				<input
					className="input-field"
					type="text"
					id="r2_email"
					name="r2_email"
					value={referencesData.r2_email}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>

			{/* Reference 3 */}
			<h3>Reference 3</h3>
			<div className="form-group">
				<label>Name</label>
				<input
					className="input-field"
					type="text"
					id="r3_name"
					name="r3_name"
					value={referencesData.r3_name}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Relationship</label>
				<input
					className="input-field"
					type="text"
					id="r3_relationship"
					name="r3_relationship"
					value={referencesData.r3_relationship}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Type of Relationship</label>
				<label className="radio-label">
					<input
						type="radio"
						id="r3_relation_type"
						name="r3_relation_type"
						value="professional"
						disabled={!isEditing}
						onChange={handleChange}
					/>
					Professional
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="r3_relation_type"
						name="r3_relation_type"
						value="pastoral"
						disabled={!isEditing}
						onChange={handleChange}
					/>
					Pastoral
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="r3_relation_type"
						name="r3_relation_type"
						value="academic"
						disabled={!isEditing}
						onChange={handleChange}
					/>
					Academic
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="r3_relation_type"
						name="r3_relation_type"
						value="personal"
						disabled={!isEditing}
						onChange={handleChange}
					/>
					Personal
				</label>
			</div>
			<div className="form-group">
				<label>Phone Number</label>
				<input
					className="input-field"
					type="text"
					id="r3_phone-number"
					name="r3_phone-number"
					value={referencesData.r3_phone_number}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Email</label>
				<input
					className="input-field"
					type="text"
					id="r3_email"
					name="r3_email"
					value={referencesData.r3_email}
					disabled={!isEditing}
					onChange={handleChange}
				/>
			</div>
		</div>
	);
}
