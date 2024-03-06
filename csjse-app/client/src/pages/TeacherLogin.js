import React, { useState } from "react";
import "../styles/LoginandCreate.css";
import "../styles/FailedLogin.css";
import LoginFailed from "../components/FailedLogin";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function TeacherLogin() {
	//creates two variables (email and pass) along with 2 functions to change them, useState being empty means they start off empty
	//useState allows us to edit variables based on inputs we get to my understanding
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");

	//Creates a variable to manage whether a component appears or not (appears if someone fails login)
	const [showFailedLogin, setFailedLogin] = useState(false);

	//passes in (e) as a parameter, e.preventDefault() forces the page to not reload on subission, console.log(email) puts whatever is input for email into the console, probably replace for actual login code
	const handleSubmit = async (e) => {
		e.preventDefault();
	
		//login logic here
		try {
			// Use Firebase to sign in with email and password
			const userCredential = await signInWithEmailAndPassword(auth, email, pass);
	  
			// Get the user object from the credential
			const user = userCredential.user;
	  
			// Now, you can use the 'user' object to perform additional tasks if needed
	  
			// If login successful, go to the profile page
			window.location.href = `/TeacherStaffProfile/${user.uid}`;
		  } catch (error) {
			console.error("Error during login:", error.message);
			// Show component if login failed
			setFailedLogin(true);
		  }
	};

	// Used for changing the page to the Teacher Account Creation for whenever the 'Create Account' button is clicked on the Teacher login
	const handleCreateAccount = () => {
		window.location.href = "/TeacherCreateAcc";
	};

	return (
		//Puts everything in a container to change bg color
		<div className="backgroundColor">
			{/*Another container to change style*/}
			<div className="login-container">
				{showFailedLogin && <div className="overlay" />}

				{/*Shows a component that tells the user the information entered is incorrect if the login attempt failed*/}
				{showFailedLogin && (
					<LoginFailed onClose={() => setFailedLogin(false)} />
				)}
				{/*Creates a form using the login-form styling and the handleSubmit functoin when the form is submitted*/}
				<form className="login-form" onSubmit={handleSubmit}>
					{/*Creates a header with the text "Login"*/}
					<h2>Teacher & Staff Login</h2>
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
							required
							disabled={showFailedLogin}
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
							required
							disabled={showFailedLogin}
						/>
					</div>
					{/*Creates a button that will serve as the sign to submit the fields given using the styling from "button" with the text "Log In" displayed*/}
					<button type="submit" className="button" disabled={showFailedLogin}>
						Log In
					</button>
					{/*Creates a button that will use the handleCreateAccount function to send someone to the create account page for their specified account type with the text "Create Account" displayed*/}
					<button
						type="button"
						className="button"
						onClick={handleCreateAccount}
						disabled={showFailedLogin}
					>
						Create Account
					</button>
				</form>
				<Link to="/">Back to Home</Link>
			</div>
		</div>
	);
}
