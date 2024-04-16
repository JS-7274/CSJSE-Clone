/* This file handles the display of references in profiles. 

   People who have worked on this file: Autumn
   Last worked on: 4/8/15*/

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function References() {
	// State for managing editing mode
	const [isEditing, setIsEditing] = useState(false);
	//const [id, setId] = useState("");
	const { teacher_staff_id } = useParams();

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

	const [r1RelationType, setR1RelationType] = useState("");
	const [r2RelationType, setR2RelationType] = useState("");
	const [r3RelationType, setR3RelationType] = useState("");

	useEffect(() => {
		const fetchTeachStaffId = async () => {
			try {
				const response = await fetch(
					`http://localhost:5000/api/teacher/users/${teacher_staff_id}`
				);
				const data = await response.json();

				if (data.success) {
					setReferencesData((prevState) => ({
						...prevState,
						teacher_staff_id: data.teacher_staff_id,
					}));
				} else {
					console.error("Error fetching user data:", data.message);
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};
		fetchTeachStaffId();
	}, [teacher_staff_id]);

	// Function to toggle editing mode
	const toggleEditing = () => {
		setIsEditing(!isEditing);
	};

	const fetchReferencesData = async (teacher_staff_id) => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/getReferences?teacher_staff_id=${teacher_staff_id}`
			);
			const data = await response.json();

			if (data.success) {
				setReferencesData(data.reference || []);
				setR1RelationType(data.reference.r1_relation_type || "");
				setR2RelationType(data.reference.r2_relation_type || "");
				setR3RelationType(data.reference.r3_relation_type || "");
			} else {
				console.error("Failed to fetch references data");
			}
		} catch (error) {
			console.error("Error during API call:", error);
		}
	};

	console.log(referencesData);

	useEffect(() => {
		// Fetch data here
		fetchReferencesData(teacher_staff_id);
	}, []);

	// Function to handle saving changes
	const handleSave = async (e) => {
		try {
			const response = await fetch(
				"http://localhost:5000/api/updateReferences/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						...referencesData,
						r1_relation_type: r1RelationType,
						r2_relation_type: r2RelationType,
						r3_relation_type: r3RelationType,
					}),
				}
			);

			// Parse the response as JSON
			const data = await response.json();

			console.log(data.success);

			// If response is successful, ...
			if (data.success) {
				setIsEditing(false);
				fetchReferencesData(teacher_staff_id);
			} else {
				console.error("Error during references update:", data.error);
			}
		} catch (error) {
			console.error("Error during references update:", error);
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
						checked={r1RelationType === "professional"}
						disabled={!isEditing}
						onChange={() => setR1RelationType("professional")}
					/>
					Professional
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="r1_relation_type"
						name="r1_relation_type"
						value="pastoral"
						checked={r1RelationType === "pastoral"}
						disabled={!isEditing}
						onChange={() => setR1RelationType("pastoral")}
					/>
					Pastoral
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="r1_relation_type"
						name="r1_relation_type"
						value="academic"
						checked={r1RelationType === "academic"}
						disabled={!isEditing}
						onChange={() => setR1RelationType("academic")}
					/>
					Academic
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="r1_relation_type"
						name="r1_relation_type"
						value="personal"
						checked={r1RelationType === "personal"}
						disabled={!isEditing}
						onChange={() => setR1RelationType("personal")}
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
						checked={r2RelationType === "professional"}
						disabled={!isEditing}
						onChange={() => setR2RelationType("professional")}
					/>
					Professional
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="r2_relation_type"
						name="r2_relation_type"
						value="pastoral"
						checked={r2RelationType === "pastoral"}
						disabled={!isEditing}
						onChange={() => setR2RelationType("pastoral")}
					/>
					Pastoral
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="r2_relation_type"
						name="r2_relation_type"
						value="academic"
						checked={r2RelationType === "academic"}
						disabled={!isEditing}
						onChange={() => setR2RelationType("academic")}
					/>
					Academic
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="r2_relation_type"
						name="r2_relation_type"
						value="personal"
						checked={r2RelationType === "personal"}
						disabled={!isEditing}
						onChange={() => setR2RelationType("personal")}
					/>
					Personal
				</label>
			</div>
			<div className="form-group">
				<label>Phone Number</label>
				<input
					className="input-field"
					type="text"
					id="r2_phone_number"
					name="r2_phone_number"
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
						checked={r3RelationType === "professional"}
						disabled={!isEditing}
						onChange={() => setR3RelationType("professional")}
					/>
					Professional
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="r3_relation_type"
						name="r3_relation_type"
						value="pastoral"
						checked={r3RelationType === "pastoral"}
						disabled={!isEditing}
						onChange={() => setR3RelationType("pastoral")}
					/>
					Pastoral
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="r3_relation_type"
						name="r3_relation_type"
						value="academic"
						checked={r3RelationType === "academic"}
						disabled={!isEditing}
						onChange={() => setR3RelationType("academic")}
					/>
					Academic
				</label>
				<label className="radio-label">
					<input
						type="radio"
						id="r3_relation_type"
						name="r3_relation_type"
						value="personal"
						checked={r3RelationType === "personal"}
						disabled={!isEditing}
						onChange={() => setR3RelationType("personal")}
					/>
					Personal
				</label>
			</div>
			<div className="form-group">
				<label>Phone Number</label>
				<input
					className="input-field"
					type="text"
					id="r3_phone_number"
					name="r3_phone_number"
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
