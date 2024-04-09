/* This document will establish a connection to the database as well as
   create all the APIs that the frontend will call to interact with the database. */

const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const port = process.env.PORT || 5000;

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
/* db.connect((err) => {
	if (err) {
		throw err;
	}
	console.log("Connected to MySQL");
}); */

// Api to handle requests from teachers to create account
app.post("/api/tCreateAccount", (req, res) => {
	try {
		console.log("Received account creation request", req.body);

		// Destructuring the information received from the request body
		const { userId, firstName, lastName, email } = req.body;

		// SQL query to insert a new record into the Teacher_Profile table
		const insertProfileSql = `
            INSERT INTO Teacher_Staff_Profile (
                teacher_staff_id, first_name, last_name, contact_email, last_accessed
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
app.get("/api/teacher/users/:teacher_staff_id", (req, res) => {
	const { teacher_staff_id } = req.params;

	// Choose the appropriate SQL query based on the user type
	const sql = "SELECT * FROM teacher_staff_profile WHERE teacher_staff_id = ?";

	db.query(sql, [teacher_staff_id], (err, results) => {
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

// API to fetch information for all teachers with optional search query and filter queries
app.get("/api/teachers", (req, res) => {
	// Extract the search query, degree, location, zip, and looking from the request parameters
	const { searchQuery, degree, location, zip, looking } = req.query;

	// SQL query to select specific fields from the Teacher_Profile table for all teachers
	let sql =
		"SELECT teacher_staff_id, first_name, last_name, looking, phone, contact_email, home_church, resume, testimony, cover_letter, degree, location, zip FROM Teacher_Staff_Profile WHERE 1 = 1";

	// If a search query is provided, add a WHERE clause to filter by name
	if (searchQuery) {
		sql += ` AND (first_name LIKE '%${searchQuery}%' OR last_name LIKE '%${searchQuery}%')`;
	}

	// If a degree filter is provided, add a WHERE clause to filter by degree
	if (degree) {
		sql += ` AND degree = '${degree}'`;
	}

	// If a location filter is provided, add a WHERE clause to filter by location
	if (location) {
		sql += ` AND location LIKE '%${location}%'`; // Use LIKE for partial matches
	}

	// If a zip is provided, add a WHERE clause to filter by zip
	if (zip !== undefined && zip !== "") {
		sql += ` AND LEFT(zip, 3) = '${zip}'`; // Filter by first 3 digits of zip code
	}

	// If looking filter is provided, add a WHERE clause to filter by looking
	if (looking === "true") {
		sql += ` AND looking = true`;
	}

	db.query(sql, (err, results) => {
		if (err) {
			console.error("Error fetching filtered teachers list:", err);
			return res.status(500).json({ error: "Internal Server Error" });
		}

		// Teachers information found
		return res.json({ success: true, teachers: results });
	});
});

// API to fetch information for all schools with optional search query and filter queries
app.get("/api/schools", (req, res) => {
	// Extract the search query, grade range, location, and zip code from the request parameters
	const { searchQuery, gradeRange, location, zip, looking } = req.query;

	// SQL query to select specific fields from the School_Profile table for all schools
	let sql =
		"SELECT school_id, school_name, location, campus_number, phone, looking, website, statement_of_faith, accreditation, teachers_employed, student_enrollment, contact_email, grade_range, zip FROM School_Profile WHERE 1 = 1";

	// If a search query is provided, add a WHERE clause to filter by school name
	if (searchQuery) {
		sql += ` AND school_name LIKE '%${searchQuery}%'`;
	}

	// If a grade range filter is provided, add a WHERE clause to filter by grade range
	if (gradeRange) {
		sql += ` AND grade_range = '${gradeRange}'`;
	}

	// If a location filter is provided, add a WHERE clause to filter by location
	if (location) {
		sql += ` AND location LIKE '%${location}%'`; // Use LIKE for partial matches
	}

	// If a zip is provided, add a WHERE clause to filter by zip
	if (zip) {
		sql += ` AND LEFT(zip, 3) = '${zip}'`; // Use LEFT function to extract first 3 digits of zip code
	}

	// If looking filter is provided, add a WHERE clause to filter by looking
	if (looking === "true") {
		sql += ` AND looking = true`;
	}

	db.query(sql, (err, results) => {
		if (err) {
			console.error("Error fetching filtered schools list:", err);
			return res.status(500).json({ error: "Internal Server Error" });
		}

		// Schools information found
		return res.json({ success: true, schools: results });
	});
});

// API to fetch information for all jobs with optional search query and filter queries
app.get("/api/jobs", (req, res) => {
	// Extract the search query, job_location, and required_degree from the request parameters
	const { searchTerm, job_location, required_degree } = req.query;

	// SQL query to select specific fields from the Job_Posting table for all jobs
	let sql =
		"SELECT job_id, job_title, job_description, job_location, interview_location, contact_email, salary_range, preferred_degree, required_degree, preferred_experience, required_experience, posted_date, application_url FROM Job_Posting WHERE 1 = 1";

	// If a search term is provided, add a WHERE clause to filter by job title
	if (searchTerm) {
		sql += ` AND job_title LIKE '%${searchTerm}%'`;
	}

	// If a job_location filter is provided, add a WHERE clause to filter by job_location
	if (job_location) {
		sql += ` AND job_location LIKE '%${job_location}%'`;
	}

	// If a required degree filter is provided, add a WHERE clause to filter by required degree
	if (required_degree) {
		sql += ` AND required_degree LIKE '%${required_degree}%'`;
	}

	db.query(sql, (err, results) => {
		if (err) {
			console.error("Error fetching filtered jobs list:", err);
			return res.status(500).json({ error: "Internal Server Error" });
		}

		// Jobs information found
		return res.json({ success: true, jobs: results });
	});
});

//api that adds a job posting to the database
app.post("/api/createJobPosting", (req, res) => {
	console.log("Received job posting creation request", req.body);

	// turns the information received into variables that can be used for db insertion
	const {
		school_id,
		job_title,
		job_description,
		job_location,
		job_zip,
		interview_location,
		contact_email,
		salary_range,
		preferred_degree,
		required_degree,
		preferred_experience,
		required_experience,
		application_url,
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
			school_id, job_title, job_description, job_location, job_zip, interview_location, contact_email, salary_range, preferred_degree, required_degree, preferred_experience, required_experience, posted_date, application_url 
		) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)
		`;

		db.query(
			insertJobPostingSql,
			[
				school_id,
				job_title,
				job_description,
				job_location,
				job_zip,
				interview_location,
				contact_email,
				salary_range,
				preferred_degree,
				required_degree,
				preferred_experience,
				required_experience,
				application_url,
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

//api that gets a schools list of jobs to view
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

//api that gets the info of a job posting to edit
app.get("/api/getJobPostingInfo", (req, res) => {
	const jobId = req.query.jobId; // Access jobId from query parameters

	// getting the job info using the job id
	const sql = "SELECT * FROM job_posting WHERE job_id = ?";
	db.query(sql, [jobId], (err, results) => {
		if (err) {
			console.error("Error fetching job data:", err.message);
			return res.status(500).json({ error: "Internal Server Error" });
		}

		if (results.length === 0) {
			return res.status(404).json({ error: "Job not found" });
		}

		const job = results[0];

		// Send the job information as a JSON response
		res.json({ success: true, job });
	});
});

//api that updates the info of a job posting in the database
app.post("/api/updateJobPosting", (req, res) => {
	console.log("Received job posting update request", req.body);

	// getting jobId and jobData from req.body
	const { jobId, jobData } = req.body;

	// Checking if the job exists
	const checkJobIdSql = `SELECT * FROM job_posting WHERE job_id = ?`;

	db.query(checkJobIdSql, [jobId], (err, jobResults) => {
		if (err) {
			console.error("Error checking job_id:", err.message);
			return res.status(500).json({ error: "Internal Server Error" });
		}

		// If the jobId doesn't exist, return an error
		if (jobResults.length === 0) {
			return res.status(400).json({ error: "Invalid jobId" });
		}

		// Update the job posting in the database
		const updateJobPostingSql = `
            UPDATE job_posting 
            SET 
                job_title = ?, 
                job_description = ?, 
                job_location = ?, 
				job_zip = ?,
                interview_location = ?, 
                contact_email = ?, 
                salary_range = ?, 
                preferred_degree = ?, 
                required_degree = ?, 
                preferred_experience = ?, 
                required_experience = ?,
				application_url = ?
            WHERE job_id = ?
        `;

		db.query(
			updateJobPostingSql,
			[
				jobData.job_title,
				jobData.job_description,
				jobData.job_location,
				jobData.job_zip,
				jobData.interview_location,
				jobData.contact_email,
				jobData.salary_range,
				jobData.preferred_degree,
				jobData.required_degree,
				jobData.preferred_experience,
				jobData.required_experience,
				jobData.application_url,
				jobId, // jobId used in the WHERE
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

// API to check if user exists in the Admin table
app.get("/api/checkAdminAccount/:uid", (req, res) => {
	const { uid } = req.params;

	// SQL query to check if the user exists in the Admin table
	const sql = "SELECT * FROM Admin WHERE admin_id = ?";

	db.query(sql, [uid], (err, results) => {
		if (err) {
			console.error("Error checking admin account:", err);
			return res
				.status(500)
				.json({ success: false, error: "Internal Server Error" });
		}

		// Check if any results are returned
		if (results.length > 0) {
			// User exists in the Admin table
			return res.json({ success: true, exists: true });
		} else {
			// User does not exist in the Admin table
			return res.json({ success: true, exists: false });
		}
	});
});

// API to delete a job posting
app.delete("/api/deleteJob/:jobId", (req, res) => {
	const { jobId } = req.params;

	// SQL query to delete the job posting with the given jobId
	const sql = "DELETE FROM Job_Posting WHERE job_id = ?";

	db.query(sql, [jobId], (err, results) => {
		if (err) {
			console.error("Error deleting job:", err);
			return res
				.status(500)
				.json({ success: false, error: "Internal Server Error" });
		}

		// Check if any rows were affected (i.e., if the job was deleted)
		if (results.affectedRows > 0) {
			return res.json({ success: true, message: "Job deleted successfully" });
		} else {
			return res.status(404).json({ success: false, error: "Job not found" });
		}
	});
});

// DELETE endpoint for deleting records from Job_Posting table by school_id
app.delete("/api/deleteJobPostingsBySchool/:schoolId", (req, res) => {
	const { schoolId } = req.params;
	const query = "DELETE FROM Job_Posting WHERE school_id = ?";
	console.log(query);
	console.log(schoolId);
	db.query(query, [schoolId], (error, result) => {
		if (error) {
			console.error("Error deleting from Job_Posting table:", error);
			return res
				.status(500)
				.json({ success: false, error: "Internal Server Error" });
		}
		res.status(200).json({
			success: true,
			message: "Records deleted from Job_Posting table successfully",
		});
	});
});

// DELETE endpoint for deleting records from School_Profile table
app.delete("/api/deleteSchool/:schoolId", (req, res) => {
	const { schoolId } = req.params;
	const query = "DELETE FROM School_Profile WHERE school_id = ?";
	console.log(query);
	console.log(schoolId);
	db.query(query, [schoolId], (error, result) => {
		if (error) {
			console.error("Error deleting from School_Profile table:", error);
			return res
				.status(500)
				.json({ success: false, error: "Internal Server Error" });
		}
		res.status(200).json({
			success: true,
			message: "Record deleted from School_Profile table successfully",
		});
	});
});

// DELETE endpoint for deleting records from Saved_Jobs table
app.delete("/api/deleteSavedJobs/:teacherId", (req, res) => {
	const { teacherId } = req.params;
	const query = "DELETE FROM Saved_Jobs WHERE teacher_staff_id = ?";
	console.log(query);
	console.log(teacherId);
	db.query(query, [teacherId], (error, result) => {
		if (error) {
			console.error("Error deleting from Saved_Jobs table:", error);
			return res
				.status(500)
				.json({ success: false, error: "Internal Server Error" });
		}
		res.status(200).json({
			success: true,
			message: "Records deleted from Saved_Jobs table successfully",
		});
	});
});

// DELETE endpoint for deleting records from Job_Applications table
app.delete("/api/deleteJobApplications/:teacherId", (req, res) => {
	const { teacherId } = req.params;
	const query = "DELETE FROM Job_Applications WHERE teacher_staff_id = ?";
	db.query(query, [teacherId], (error, result) => {
		if (error) {
			console.error("Error deleting from Job_Applications table:", error);
			return res
				.status(500)
				.json({ success: false, error: "Internal Server Error" });
		}
		res.status(200).json({
			success: true,
			message: "Records deleted from Job_Applications table successfully",
		});
	});
});

// DELETE endpoint for deleting records from Reference table
app.delete("/api/deleteReference/:teacherId", (req, res) => {
	const { teacherId } = req.params;
	const query = "DELETE FROM Reference WHERE teacher_staff_id = ?";
	db.query(query, [teacherId], (error, result) => {
		if (error) {
			console.error("Error deleting from Reference table:", error);
			return res
				.status(500)
				.json({ success: false, error: "Internal Server Error" });
		}
		res.status(200).json({
			success: true,
			message: "Records deleted from Reference table successfully",
		});
	});
});

// DELETE endpoint for deleting records from Teacher_Staff_Profile table
app.delete("/api/deleteTeacherProfile/:teacherId", (req, res) => {
	const { teacherId } = req.params;
	const query = "DELETE FROM Teacher_Staff_Profile WHERE teacher_staff_id = ?";
	db.query(query, [teacherId], (error, result) => {
		if (error) {
			console.error("Error deleting from Teacher_Staff_Profile table:", error);
			return res
				.status(500)
				.json({ success: false, error: "Internal Server Error" });
		}
		res.status(200).json({
			success: true,
			message: "Records deleted from Teacher_Staff_Profile table successfully",
		});
	});
});

// API to check if user exists in the Teacher table
app.get("/api/checkTeacherAccount/:teacherId", (req, res) => {
	const { teacherId } = req.params;

	// SQL query to check if the user exists in the Teacher table
	const sql = "SELECT * FROM Teacher_Staff_Profile WHERE teacher_staff_id = ?";

	db.query(sql, [teacherId], (err, results) => {
		if (err) {
			console.error("Error checking teacher account:", err);
			return res
				.status(500)
				.json({ success: false, error: "Internal Server Error" });
		}

		// Check if any results are returned
		if (results.length > 0) {
			// User exists in the Teacher table
			return res.json({ success: true, exists: true });
		} else {
			// User does not exist in the Teacher table
			return res.json({ success: true, exists: false });
		}
	});
});

// API to check if user exists in the School table
app.get("/api/checkSchoolAccount/:schoolId", (req, res) => {
	const { schoolId } = req.params;

	// SQL query to check if the user exists in the School table
	const sql = "SELECT * FROM School_Profile WHERE school_id = ?";

	db.query(sql, [schoolId], (err, results) => {
		if (err) {
			console.error("Error checking school account:", err);
			return res
				.status(500)
				.json({ success: false, error: "Internal Server Error" });
		}

		// Check if any results are returned
		if (results.length > 0) {
			// User exists in the School table
			return res.json({ success: true, exists: true });
		} else {
			// User does not exist in the School table
			return res.json({ success: true, exists: false });
		}
	});
});

// Error handling middleware
app.use((err, req, res, next) => {
	console.error("Error occurred:", err.stack);
	res.status(500).json({ error: "Internal Server Error" });
});

// 404 Not Found middleware
app.use((req, res, next) => {
	res.status(404).json({ error: "Not Found" });
});

app.get("/api/getProfileInfo", (req, res) => {
	const teacher_staff_id = req.query.teacher_staff_id;

	// getting the reference info using the teacher_staff_id
	const sql = "SELECT * FROM teacher_staff_id WHERE teacher_staff_id = ?";
	db.query(sql, [teacher_staff_id], (err, results) => {
		if (err) {
			console.error("Error fetching references data:", err.message);
			return res.status(500).json({ error: "Internal Server Error" });
		}

		if (results.length === 0) {
			return res.status(404).json({ error: "Proffile info not found" });
		}

		const info = results[0];

		// Send the reference information as a JSON response
		res.json({ success: true, info });
	});
});

// API to Update Profile Information on Edit
app.post("/api/updateProfileInfo/", (req, res) => {
	console.log("Received profile information update request", req.body);

	const {
		teacher_staff_id,
		first_name,
		last_name,
		looking,
		phone,
		contact_email,
		home_church,
		resume,
		testimony,
		cover_letter,
		headshot,
		degree,
		location,
		zip,
	} = req.body;

	// Checking if the job exists
	const checkTeacherIdSql = `SELECT * FROM teacher_staff_profile WHERE teacher_staff_id =?`;

	db.query(checkTeacherIdSql, [teacher_staff_id], (err, teacherResults) => {
		if (err) {
			console.error("Error checking teacher_staff_id:", err.message);
			return res.status(500).json({ error: "Internal Server Error" });
		}

		// If the teacherId doesn't exist return an error
		if (teacherResults.length > 0) {
			// Update the teacher profile in the database
			const updateTeacherSql = `
                UPDATE teacher_staff_profile
                SET
                    first_name = ?,
                    last_name = ?,
                    looking = ?,
                    phone = ?,
                    contact_email = ?,
                    home_church = ?,
                    resume = ?,
                    testimony = ?,
                    cover_letter = ?,
                    headshot = ?,
                    degree = ?,
                    location = ?,
                    zip = ?
                WHERE teacher_staff_id = ?
            `;

			db.query(
				updateTeacherSql,
				[
					teacher_staff_id,
					first_name,
					last_name,
					looking,
					phone,
					contact_email,
					home_church,
					resume,
					testimony,
					cover_letter,
					headshot,
					degree,
					location,
					zip,
				],
				(err, results) => {
					if (err) {
						console.error("Error updating teacher profile:", err.message);
						return res.status(500).json({ error: "Internal Server Error" });
					}
					return res.json({ success: true });
				}
			);
		} else {
			const insertTeacherSQL = `
                INSERT INTO teacher_staff_profile (
                    teacher_staff_id,
                    first_name,
                    last_name,
                    looking,
                    phone,  
                    contact_email,
                    home_church,
                    resume,
                    testimony,
                    cover_letter,
                    headshot,
                    degree,
                    location,
                    zip
                ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
            `;
			db.query(
				insertTeacherSQL,
				[
					teacher_staff_id,
					first_name,
					last_name,
					looking,
					phone,
					contact_email,
					home_church,
					resume,
					testimony,
					cover_letter,
					headshot,
					degree,
					location,
					zip,
				],
				(err, results) => {
					if (err) {
						console.error(
							"Error inserting teacher profile information:",
							err.message
						);
						return res.status(500).json({ error: "Internal Server Error" });
					}

					return res.json({ success: true });
				}
			);
		}
	});
});

app.listen(port, () => {
	console.log("Server started on port " + port);
});
