import React from "react";

export default function CreateJobPosting() {
	return (
		//Puts everything in a container to change bg color
		<div className="backgroundColor">
			{/*Another container to change style*/}
			<div className="login-container">
				{/*Creates a form using the login-form styling and the handleSubmit functoin when the form is submitted*/}
				<form className="create-listing" onSubmit={handleSubmit}>
					{/*Creates a header with the text "Login"*/}
					<h2>Create a Job Posting</h2>
					{/*Creates a container for a specific item in the form*/}
					<div className="form-group">
						{/*Names the item "Email" with the given styling*/}
						<label className="label" htmlFor="email">
							Job Title
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
						/>
					</div>
					<div className="form-group">
						{/*Creates a label with the text "Password"*/}
						<label className="label" htmlFor="password">
							Job Description
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
						/>
					</div>
					<div className="form-group">
						{/*Creates a label with the text "Password"*/}
						<label className="label" htmlFor="password">
							Job Description
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
						/>
					</div>
					<div className="form-group">
						{/*Creates a label with the text "Password"*/}
						<label className="label" htmlFor="password">
							Salary
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
						/>
					</div>
					<div className="form-group">
						{/*Creates a label with the text "Password"*/}
						<label className="label" htmlFor="password">
							Preferred Degree
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
						/>
					</div>
					<div className="form-group">
						{/*Creates a label with the text "Password"*/}
						<label className="label" htmlFor="password">
							Required Degree
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
						/>
					</div>
					<div className="form-group">
						{/*Creates a label with the text "Password"*/}
						<label className="label" htmlFor="password">
							Preferred Experience
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
						/>
					</div>
					<div className="form-group">
						{/*Creates a label with the text "Password"*/}
						<label className="label" htmlFor="password">
							Required Experience
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
						/>
					</div>
					{/*Creates a button that will use the handleCreateAccount function to send someone to the create account page for their specified account type with the text "Create Account" displayed*/}
					<button
						type="button"
						className="button"
						onClick={handleCreateAccount}
					>
						Create Posting
					</button>
				</form>
				<Link to="/SchoolProfile">Back to Profile</Link>
			</div>
		</div>
	);
}
