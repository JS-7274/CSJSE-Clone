import React from "react";

export default function LoginInfo() {
	return (
		<div>
			<div className="section-header">
				<h2>Login Information</h2>
				<div className="header-buttons">
					<button>Edit</button>
					<input type="submit" value="Save" disabled />
				</div>
			</div>
			<div className="form-group">
				<label>Email</label>
				<input className="input-field" type="email" value="" disabled />
			</div>
			<div className="form-group">
				<label>Password</label>
				<input className="input-field" type="password" value="" disabled />
			</div>
		</div>
	);
}
