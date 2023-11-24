import React, { useState } from "react";
import "../styles/LoginandCreate.css";

//This function will be called to bring up a form to create a new account for a teacher

//create and export function 'TeacherCreateAcc' so that other pages can import and use the function
export default function TeacherCreateAcc() {
	//declares variables for information that will be used to create account as well as the functions to update those variables
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		//creates an object to pass the user data to backend
		const userData = {
			firstName,
			lastName,
			pass,
			email,
		};

		const res = await fetch("http://localhost:5000/api/tCreateAccount", {
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
			.catch((error) => console.error("Error during account creation:", error));
		console.log(res.success); // This is the information that you are checking for.

		//If response is successful, move to profile page.
		if (res.success) {
			window.location.href = "/profile";
		}
	};

	// Used for when the "Already have an Account?" button is clicked to redirect the user to the login page.
	const handleAlreadyHaveAccount = () => {
		window.location.href = "/TeacherLogin";
	}

	return (
		//puts everything in a container to change bg color
		<div className="backgroundColor">
			{/*another container to style the form*/}
			<div className="login-container">
				{/*creates a form that will take in the function 'handleSubmit' when the form receives a submti request*/}
				<form className="login-form" onSubmit={handleSubmit}>
					{/*Sets the header to 'Create Teacher Account' and uses styling for header 2*/}
					<h2>Create Teacher Account</h2>
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
						/>
					</div>
					{/*creates a button that will serve as the submit for the form and will have styling from the 'button' styling with text 'Create Account'*/}
					<button type="submit" className="button">
						Create Account
					</button>
					<button type="button" className="button" onClick={handleAlreadyHaveAccount}>Already Have An Account?</button>
				</form>
			</div>
		</div>
	);
}
