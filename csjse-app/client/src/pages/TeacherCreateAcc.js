import React, { useState } from "react";
import "../styles/LoginandCreate.css";
import { Link } from "react-router-dom";
import TeacherStaffProfile from "./TeacherStaffProfile";

//This function will be called to bring up a form to create a new account for a teacher

//create and export function 'TeacherCreateAcc' so that other pages can import and use the function
export default function TeacherCreateAcc() {
	//declares variables for information that will be used to create account as well as the functions to update those variables
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [confirmPass, setConfirmPass] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Check if the password and confirmation match
		if (pass !== confirmPass) {
			// Display an error message or handle the mismatch
			console.error("Password and Confirm Password do not match");
			return;
		} else {
			//creates an object to pass the user data to backend
			const userData = {
				firstName,
				lastName,
				pass,
				email,
			};

			try {
				const response = await fetch("http://localhost:5000/api/tCreateAccount", {
				  method: "POST",
				  headers: {
					"Content-Type": "application/json",
				  },
				  body: JSON.stringify(userData),
				});
			
				// Parse the response as JSON
				const data = await response.json();
			
				console.log(data.success);
			
				// If response is successful, move to the profile page.
				if (data.success) {
				  window.location.href = `/TeacherStaffProfile/${data.userId}`;
				} else {
				  console.error("Error during account creation:", data.error);
				}
			  } catch (error) {
				console.error("Error during account creation:", error);
			  }
		}
	};

	// Used for when the "Already have an Account?" button is clicked to redirect the user to the login page.
	const handleAlreadyHaveAccount = () => {
		window.location.href = "/TeacherLogin";
	};

	return (
		//puts everything in a container to change bg color
		<div className="backgroundColor">
			{/*another container to style the form*/}
			<div className="login-container">
				{/*creates a form that will take in the function 'handleSubmit' when the form receives a submti request, while keeping the styling from the login*/}
				<form className="login-form" onSubmit={handleSubmit}>
					{/*Sets the header to 'Create Teacher Account' and uses styling for header 2*/}
					<h2>Create Teacher or Staff Account</h2>
					{/*Creates a container for a specific items in the form*/}
					<div className="form-group">
						{/*creates a label that says 'First Name'*/}
						<label className="label" htmlFor="firstName">
							First Name
						</label>
						{/*creates an input field that will take in text and give it the id firstName*/}
						<input
							className="input-field"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							type="text"
							placeholder="John"
							id="firstName"
							name="firstName"
							required
						/>
					</div>
					<div className="form-group">
						{/*creates a label with the text 'Last Name'*/}
						<label className="label" htmlFor="lastName">
							Last Name
						</label>
						{/*creates an input field that will take in text and give it the id lastName*/}
						<input
							className="input-field"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							type="text"
							placeholder="Smith"
							id="lastName"
							name="lastName"
							required
						/>
					</div>
					<div className="form-group">
						{/*creates a label with the text 'Email'*/}
						<label className="label" htmlFor="email">
							Email
						</label>
						{/*creates an input field that will take in text of type email and will give it the id email*/}
						<input
							className="input-field"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							placeholder="youremail@domain.com"
							id="email"
							name="email"
							required
						/>
					</div>
					<div className="form-group">
						{/*creates a label with the text 'Password'*/}
						<label className="label" htmlFor="password">
							Password
						</label>
						{/*creates an input field that will take in text of type password and will give it the id password*/}
						<input
							className="input-field"
							value={pass}
							onChange={(e) => setPass(e.target.value)}
							type="password"
							placeholder="*******"
							id="password"
							name="password"
							required
						/>
					</div>
					<div className="form-group">
						{/*creates a label with the text 'Confirm Password'*/}
						<label className="label" htmlFor="confirmPassword">
							Confirm Password
						</label>
						{/*creates an input field that will take in text of type password and will give it the id confirmPassword*/}
						<input
							className="input-field"
							value={confirmPass}
							onChange={(e) => setConfirmPass(e.target.value)}
							type="password"
							placeholder="*******"
							id="confirmPassword"
							name="confirmPassword"
							required
						/>
					</div>
					{/*creates a button that will serve as the submit for the form and will have styling from the 'button' styling with text 'Create Account'*/}
					<button type="submit" className="button">
						Create Account
					</button>
					{/* Made by */}
					<button
						type="button"
						className="button"
						onClick={handleAlreadyHaveAccount}
					>
						Already Have An Account?
					</button>
				</form>
				<Link to="/">Back to Home</Link>
			</div>
		</div>
	);
}
