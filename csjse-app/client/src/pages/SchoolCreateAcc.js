import React, { useState } from "react";
import "../styles/LoginandCreate.css";
//Page made by Josh with some code from others where specified

//this function will be called to bring up a form to create a new account for a school

//create and export function 'SchoolCreateAcc' so that other pages can import and use the function
export default function SchoolCreateAcc() {
	//declares variables for information that will be used to create account as well as the functions to update those variables
	const [schoolName, setSchoolName] = useState("");
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
				schoolName,
				pass,
				email,
			};

			const res = await fetch("http://localhost:5000/api/sCreateAccount", {
				//sets method to post indicating a change in the database
				method: "POST",
				//ensures this returns a json file
				headers: {
					"Content-Type": "application/json",
				},
				//sends the userData information as a json file as strings
				body: JSON.stringify(userData),
			})
				// Receives response
				.then((response) => response.json())
				.catch((error) =>
					console.error("Error during account creation:", error)
				);
			console.log(res.success); // This is the information that you are checking for.

			//If response is successful, move to profile page.
			if (res.success) {
				window.location.href = "/schoolprofile";
			}
		}
	};

	// Made by
	// Used for when the "Already have an Account?" button is clicked to redirect the user to the login page.
	const handleAlreadyHaveAccount = () => {
		window.location.href = "/SchoolLogin";
	};

	return (
		//puts everything in a container to change bg color
		<div className="backgroundColor">
			{/*another container to style the form*/}
			<div className="login-container">
				{/*creates a form that will take in the function 'handleSubmit' when the form receives a submti request*/}
				<form className="login-form" onSubmit={handleSubmit}>
					{/*Sets the header to 'Create School Account' and uses styling for header 2*/}
					<h2>Create School Account</h2>
					{/*Creates a container for a specific items in the form*/}
					<div className="form-group">
						{/*creates a label that says 'School Name'*/}
						<label className="label" htmlFor="schoolName">
							School Name
						</label>
						{/*creates an input field that will take in text and give it the id schoolName*/}
						<input
							className="input-field"
							value={schoolName}
							onChange={(e) => setSchoolName(e.target.value)}
							type="text"
							placeholder="Southwest Baptist University"
							id="schoolName"
							name="schoolName"
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
							name="confirmP	assword"
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
			</div>
		</div>
	);
}
