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

const jwt = require("jsonwebtoken");

// API for teacher login
app.post("/api/tlogin", (req, res) => {
	console.log("Received login request", req.body);

	const { email, pass } = req.body;

	const sql =
		"SELECT * FROM teacher_staff_profile WHERE email = ? AND password = ?;";
	db.query(sql, [email, pass], (err, results) => {
		if (err) {
			return res.status(500).json({ error: "Internal Server Error" });
		}

		if (results.length > 0) {
			// Login successful
			const userId = results[0].teacher_id;
			const token = jwt.sign({ email }, process.env.JWT_SECRET, {
				expiresIn: "1h",
			});
			return res.json({ success: true, token, userId });
		} else {
			// Invalid credentials
			return res.json({ success: false });
		}
	});
});

// API for school login
app.post("/api/slogin", (req, res) => {
	console.log("Received login request", req.body);

	const { email, pass } = req.body;

	const sql = "SELECT * FROM school_profile WHERE email = ? AND password = ?;";
	db.query(sql, [email, pass], (err, results) => {
		if (err) {
			return res.status(500).json({ error: "Internal Server Error" });
		}

		if (results.length > 0) {
			// Login successful
			const schoolId = results[0].school_id; // Update the key based on your actual database schema
			const token = jwt.sign({ email }, process.env.JWT_SECRET, {
				expiresIn: "1h",
			});
			return res.json({ success: true, token, userId: schoolId });
		} else {
			// Invalid credentials
			return res.json({ success: false });
		}
	});
});

// Api to handle requests from teachers to create account
app.post("/api/tCreateAccount", (req, res) => {
	console.log("Received account creation request", req.body);

	// turns the information received into variables that can be used for db insertion
	const { firstName, lastName, email, pass } = req.body;

	// updates the teacher_profile database so it can get the automatically generated ID
	const insertProfileSql = `
    INSERT INTO Teacher_Staff_Profile (
        first_name, last_name, looking, phone, email, password, home_church, resume, testimony, cover_letter, headshot, last_accessed
    ) VALUES (?, ?, NULL, NULL, ?, ?, NULL, NULL, NULL, NULL, NULL, NOW()) `;

	db.query(
		insertProfileSql,
		[firstName, lastName, email, pass],
		(profileErr, profileResults) => {
			if (profileErr) {
				console.error("Error creating teacher profile:", profileErr.message);
				return res.status(500).json({ error: "Internal Server Error" });
			}

			// Retrieve the auto-generated teacher_id
			const newTeacherId = profileResults.insertId;

			// Account creation successful
			const token = jwt.sign({ email }, process.env.JWT_SECRET, {
				expiresIn: "1h",
			});
			return res.json({ success: true, userId: newTeacherId });
		}
	);
});

app.post("/api/sCreateAccount", (req, res) => {
	console.log("Received account creation request", req.body);

	// turns the information received into variables that can be used for db insertion
	const { schoolName, email, pass } = req.body;

	// updates the school_profile database first so it can get the automatically generated ID
	const insertProfileSql = `
    INSERT INTO School_Profile (
        school_name, primary_location, campus_number, phone, hiring, website, statement_of_faith, accreditation, teachers_employed, student_enrollment, email, password, photo, logo, last_accessed
    ) VALUES (?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ?, ?, NULL, NULL, NOW())
    `;

	db.query(
		insertProfileSql,
		[schoolName, email, pass],
		(profileErr, profileResults) => {
			if (profileErr) {
				console.error("Error creating school profile:", profileErr.message);
				return res.status(500).json({ error: "Internal Server Error" });
			}

			// Retrieve the auto-generated school_id
			const newSchoolId = profileResults.insertId;

			// Account creation was successful
			const token = jwt.sign({ email }, process.env.JWT_SECRET, {
				expiresIn: "1h",
			});
			return res.json({ success: true, userId: newSchoolId });
		}
	);
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
app.get("/api/school/users/:id", (req, res) => {
	const { id } = req.params;

	// Choose the appropriate SQL query based on the user type
	const sql = "SELECT * FROM school_profile WHERE school_id = ?";

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

app.post("/api/createJobPosting", (req, res) => {
	console.log("Received job posting creation request", req.body);

	// turns the information received into variables that can be used for db insertion
	const {
		school_id,
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
	const checkSchoolIdSql = `SELECT * FROM school_profile WHERE school_id = ?`;

	db.query(checkSchoolIdSql, [school_id], (err, schoolResults) => {
		if (err) {
			console.error("Error checking school_id:", err.message);
			return res.status(500).json({ error: "Internal Server Error" });
		}

		// If the school_id doesn't exist, return an error
		if (schoolResults.length === 0) {
			return res.status(400).json({ error: "Invalid school_id" });
		}

		// updates the school_profile database first so it can get the automatically generated ID
		const insertJobPostingSql = `
		INSERT INTO Job_Posting (
			school_id, job_title, job_description, job_location, interview_location, contact_email, salary_range, preferred_degree, required_degree, preferred_experience, required_experience, posted_date 
		) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
		`;

		db.query(
			insertJobPostingSql,
			[
				school_id,
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

app.listen(port, () => {
	console.log("Server started on port " + port);
});
