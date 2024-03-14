const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const port = process.env.PORT || 5000;

// This document will establish a connection to the database as well as
// create all the APIs that the frontend will call to interact with the database

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Use JSON parser for incoming requests

dotenv.config({ path: "./.env" });

// Set up MySQL Connection
const db = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE,
});

// Connect MySQL
db.connect((err) => {
	if (err) {
		throw err;
	}
	console.log("Connected to MySQL");
});

// Api to handle requests from teachers to create account
app.post("/api/tCreateAccount", (req, res) => {
	try {
		console.log("Received account creation request", req.body);

		// Destructuring the information received from the request body
		const { userId, firstName, lastName, email } = req.body;

		// SQL query to insert a new record into the Teacher_Profile table
		const insertProfileSql = `
            INSERT INTO Teacher_Profile (
                teacher_id, first_name, last_name, contact_email, last_accessed
            ) VALUES (?, ?, ?, ?, NOW())
        `;

		// Execute the SQL query with parameters
		db.query(
			insertProfileSql,
			[userId, firstName, lastName, email],
			(profileErr) => {
				if (profileErr) {
					console.error("Error creating teacher profile:", profileErr.message);
					console.log("Request body:", req.body);
					console.log("Request params:", req.params);
					console.log("Request query:", req.query);
					return res
						.status(500)
						.json({ success: false, error: "Internal Server Error" });
				}

				// Account creation successful, return the Firebase-generated userId
				return res.json({ success: true, userId });
			}
		);
	} catch (error) {
		console.error("Error during database operation:", error);

		// Log additional information about the request
		console.log("Request body:", req.body);
		console.log("Request params:", req.params);
		console.log("Request query:", req.query);

		// Send an error response
		res.status(500).json({ success: false, error: "Internal Server Error" });
	}
});

// Api to handle requests from schools to create account
app.post("/api/sCreateAccount", (req, res) => {
	try {
		console.log("Received account creation request", req.body);

		// Destructuring the information received from the request body
		const { userId, schoolName, email } = req.body;

		// SQL query to insert a new record into the Teacher_Profile table
		const insertProfileSql = `
            INSERT INTO School_Profile (
                school_id, school_name, contact_email, last_accessed
            ) VALUES (?, ?, ?, NOW())
        `;

		// Execute the SQL query with parameters
		db.query(insertProfileSql, [userId, schoolName, email], (profileErr) => {
			if (profileErr) {
				console.error("Error creating school profile:", profileErr.message);
				console.log("Request body:", req.body);
				console.log("Request params:", req.params);
				console.log("Request query:", req.query);
				return res
					.status(500)
					.json({ success: false, error: "Internal Server Error" });
			}

			// Account creation successful, return the Firebase-generated userId
			return res.json({ success: true, userId });
		});
	} catch (error) {
		console.error("Error during database operation:", error);

		// Log additional information about the request
		console.log("Request body:", req.body);
		console.log("Request params:", req.params);
		console.log("Request query:", req.query);

		// Send an error response
		res.status(500).json({ success: false, error: "Internal Server Error" });
	}
});

// API to fetch user information by ID
app.get("/api/teacher/users/:id", (req, res) => {
	const { id } = req.params;

	// Choose the appropriate SQL query based on the user type
	const sql = "SELECT * FROM teacher_profile WHERE teacher_id = ?";

	db.query(sql, [id], (err, results) => {
		if (err) {
			return res.status(500).json({ error: "Internal Server Error" });
		}

		if (results.length > 0) {
			// User information found
			return res.json({ success: true, user: results[0] });
		} else {
			// User not found
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}
	});
});

// API to fetch user information by ID
app.get("/api/school/users/:school_id", (req, res) => {
	const { school_id } = req.params;

	// Choose the appropriate SQL query based on the user type
	const sql = "SELECT * FROM school_profile WHERE school_id = ?";

	db.query(sql, [school_id], (err, results) => {
		if (err) {
			return res.status(500).json({ error: "Internal Server Error" });
		}

		if (results.length > 0) {
			// User information found
			return res.json({ success: true, user: results[0] });
		} else {
			// User not found
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}
	});
});

app.post("/api/createJobPosting", (req, res) => {
	console.log("Received job posting creation request", req.body);

	// turns the information received into variables that can be used for db insertion
	const {
		school_id,
		job_title,
		job_description,
		job_location,
		interview_location,
		contact_email,
		salary_range,
		preferred_degree,
		required_degree,
		preferred_experience,
		required_experience,
	} = req.body;
	console.log("School ID:", school_id);

	// Check if the provided school_id exists in the school_profile table
	const checkSchoolIdSql = `SELECT * FROM school_profile WHERE school_id = ?`;
	//console.log("School ID:", school_id);

	db.query(checkSchoolIdSql, [school_id], (err, schoolResults) => {
		if (err) {
			console.error("Error checking school_id:", err.message);
			return res.status(500).json({ error: "Internal Server Error" });
		}

		// If the school_id doesn't exist, return an error
		if (schoolResults.length === 0) {
			console.log("School ID:", school_id);
			return res.status(400).json({ error: "Invalid school_id" });
		}

		// updates the sjob_posting database first so it can get the automatically generated ID
		const insertJobPostingSql = `
		INSERT INTO Job_Posting (
			school_id, job_title, job_description, job_location, interview_location, contact_email, salary_range, preferred_degree, required_degree, preferred_experience, required_experience, posted_date 
		) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
		`;

		db.query(
			insertJobPostingSql,
			[
				school_id,
				job_title,
				job_description,
				job_location,
				interview_location,
				contact_email,
				salary_range,
				preferred_degree,
				required_degree,
				preferred_experience,
				required_experience,
			],
			(err, results) => {
				if (err) {
					console.error("Error creating job posting:", err.message);
					return res.status(500).json({ error: "Internal Server Error" });
				}

				// Retrieve the auto-generated job posting id
				const newJobPostingId = results.insertId;

				// Job Posting creation was successful

				return res.json({ success: true, job_id: newJobPostingId });
			}
		);
	});
});

app.get("/api/school/users/:school_id/jobPosting", (req, res) => {
	const { school_id } = req.params;

	// Choose the appropriate SQL query based on the user type
	const sql = "SELECT * FROM job_posting WHERE school_id = ?";

	db.query(sql, [school_id], (err, results) => {
		if (err) {
			return res.status(500).json({ error: "Internal Server Error" });
		}

		if (results.length > 0) {
			// User information found
			return res.json({ success: true, job: results });
		} else {
			// User not found
			return res
				.status(404)
				.json({ success: false, message: "No job postings found" });
		}
	});
});

app.post("/api/updateJobPosting", (req, res) => {
	console.log("Received job posting update request", req.body);

	// turns the information received into variables that can be used for db insertion
	const {
		job_id,
		title,
		des,
		loc,
		interviewLoc,
		email,
		salary,
		prefDeg,
		reqDeg,
		prefExp,
		reqExp,
	} = req.body;

	// Check if the provided school_id exists in the school_profile table
	const checkJobIdSql = `SELECT * FROM job_posting WHERE job_id = ?`;

	db.query(checkJobIdSql, [job_id], (err, jobResults) => {
		if (err) {
			console.error("Error checking job_id:", err.message);
			return res.status(500).json({ error: "Internal Server Error" });
		}

		// If the job_id doesn't exist, return an error
		if (jobResults.length === 0) {
			return res.status(400).json({ error: "Invalid job_id" });
		}

		// updates the school_profile database first so it can get the automatically generated ID
		const insertJobPostingSql = `
		INSERT INTO Job_Posting (
			 job_title, job_description, job_location, interview_location, contact_email, salary_range, preferred_degree, required_degree, preferred_experience, required_experience, posted_date 
		) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
		`;

		db.query(
			insertJobPostingSql,
			[
				title,
				des,
				loc,
				interviewLoc,
				email,
				salary,
				prefDeg,
				reqDeg,
				prefExp,
				reqExp,
			],
			(err, results) => {
				if (err) {
					console.error("Error updating job posting:", err.message);
					return res.status(500).json({ error: "Internal Server Error" });
				}

				return res.json({ success: true });
			}
		);
	});
});

app.listen(port, () => {
	console.log("Server started on port " + port);
});
