import React, { useState } from "react";
import "../styles/LoginandCreate.css";

export default function SchoolLogin() {
	//creates two variables (email and pass) along with 2 functions to change them, useState being empty means they start off empty
	//useState allows us to edit variables based on inputs we get to my understanding
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");

	//passes in (e) as a parameter, e.preventDefault() forces the page to not reload on subission, console.log(email) puts whatever is input for email into the console, probably replace for actual login code
	const handleSubmit = async (e) => {
		e.preventDefault();

		//login logic here
		const res = await fetch("http://localhost:5000/api/slogin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, pass }),
		})
		.then((response) => response.json())
		.catch(error => console.error('Error during login:', error))
		console.log(res.success) // This is the information that you are checking for.

		//authentification logic here?
		if (res.success) {
		window.location.href = "/profile";
		}
	};

	// Used for changing the page to the School Account Creation for whenever the 'Create Account' button is clicked on the school login
	const handleCreateAccount = () => {
		window.location.href = "/SchoolCreateAcc";
	}

	return (
		// Puts everything in a container to change bg color
		<div className="backgroundColor">
			{/*Another container to change style*/}
			<div className="login-container">
				{/*Creates a form using the login-form styling and the handleSubmit functoin when the form is submitted*/}
				<form className="login-form" onSubmit={handleSubmit}>
					{/*Creates a header with the text "Login"*/}
					<h2>Login</h2>
					{/*Creates a container for a specific item in the form*/}
					<div className="form-group">
						{/*Names the item "Email" with the given styling*/}
						<label className="label" htmlFor="email">
							Email
						</label>
						{/*Creates an input field that will take in text of type email and give it the id email*/}
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
						{/*Creates a label with the text "Password"*/}
						<label className="label" htmlFor="password">
							Password
						</label>
						{/*Creates an input that will take in a text of type password and give it the id password*/}
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
					{/*Creates a button that will serve as the sign to submit the fields given using the styling from "button" with the text "Log In" displayed*/}
					<button type="submit" className="button">
						Log In
					</button>
					{/*Creates a button that will use the handleCreateAccount function to send someone to the create account page for their specified account type with the text "Create Account" displayed*/}
					<button type="button" className="button" onClick={handleCreateAccount}>Create Account</button>
				</form>
			</div>
		</div>
	);
}
