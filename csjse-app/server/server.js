const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv');
const port = process.env.PORT || 5000

// This document will establish a connection to the database as well as
// create all the APIs that the frontend will call to interact with the database

app.use(cors()) // Enable CORS for all routes
app.use(bodyParser.json()) // Use JSON parser for incoming requests

dotenv.config({ path: './.env'} );

// Set up MySQL Connection
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

// Connect MySQL
db.connect((err) => {
    if (err) {
        throw err
    }
    console.log('Connected to MySQL')
})

// API for teacher login
app.post('/api/tlogin', (req, res) => {
    console.log('Received login request', req.body);

    const { email, pass } = req.body;

    const sql = "SELECT * FROM teacher_profile WHERE email = ? AND password = ?;";
    db.query(sql, [email, pass], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length > 0) {
            // Login successful
            const userId = results[0].teacher_id;
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.json({ success: true, token, userId });
        } else {
            // Invalid credentials
            return res.json({ success: false });
        }
    });
});

// API for school login
app.post('/api/slogin', (req, res) => {
    console.log('Received login request', req.body);

    const { email, pass } = req.body;

    const sql = "SELECT * FROM school_profile WHERE email = ? AND password = ?;";
    db.query(sql, [email, pass], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length > 0) {
            // Login successful
            const schoolId = results[0].school_id; // Update the key based on your actual database schema
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.json({ success: true, token, userId: schoolId });
        } else {
            // Invalid credentials
            return res.json({ success: false });
        }
    });
});

// Api to handle requests from teachers to create account
app.post('/api/tCreateAccount', (req, res) => {
    try {
        console.log('Received account creation request', req.body);

        // Destructuring the information received from the request body
        const { userId, firstName, lastName, email } = req.body;

        // SQL query to insert a new record into the Teacher_Profile table
        const insertProfileSql = `
            INSERT INTO Teacher_Profile (
                teacher_id, first_name, last_name, contact_email, last_accessed
            ) VALUES (?, ?, ?, ?, NOW())
        `;

        // Execute the SQL query with parameters
        db.query(insertProfileSql, [userId, firstName, lastName, email], (profileErr) => {
            if (profileErr) {
                console.error('Error creating teacher profile:', profileErr.message);
                console.log('Request body:', req.body);
                console.log('Request params:', req.params);
                console.log('Request query:', req.query);
                return res.status(500).json({ success: false, error: 'Internal Server Error' });
            }

            // Account creation successful, return the Firebase-generated userId
            return res.json({ success: true, userId });
        });
    } catch (error) {
        console.error('Error during database operation:', error);

        // Log additional information about the request
        console.log('Request body:', req.body);
        console.log('Request params:', req.params);
        console.log('Request query:', req.query);

        // Send an error response
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

app.post('/api/sCreateAccount', (req, res) => {
    console.log('Received account creation request', req.body);

    // turns the information received into variables that can be used for db insertion
    const { schoolName, email, pass } = req.body;

    // updates the school_profile database first so it can get the automatically generated ID
    const insertProfileSql = `
        INSERT INTO School_Profile (
            school_name, school_population, statement_of_faith, covenantal, teacher_count, administrative_structure, phone, email, location, campus_number, accreditation, grade_range, about, school_profile_graphic, last_accessed, password
        ) VALUES (?, NULL, NULL, NULL, NULL, NULL, NULL, ?, NULL, NULL, NULL, NULL, NULL, NULL, NOW(), ?)
    `;

    db.query(insertProfileSql, [schoolName, email, pass], (profileErr, profileResults) => {
        if (profileErr) {
            console.error('Error creating school profile:', profileErr.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Retrieve the auto-generated school_id
        const newSchoolId = profileResults.insertId;

        // Account creation was successful
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ success: true, userId: newSchoolId });
    });
});

// API to fetch user information by ID
app.get('/api/teacher/users/:id', (req, res) => {
    const { id } = req.params;

    // Choose the appropriate SQL query based on the user type
    const sql = "SELECT * FROM teacher_profile WHERE teacher_id = ?";

    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length > 0) {
            // User information found
            return res.json({ success: true, user: results[0] });
        } else {
            // User not found
            return res.status(404).json({ success: false, message: 'User not found' });
        }
    });
});

// API to fetch user information by ID
app.get('/api/school/users/:id', (req, res) => {
    const { id } = req.params;

    // Choose the appropriate SQL query based on the user type
    const sql = "SELECT * FROM school_profile WHERE school_id = ?";

    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length > 0) {
            // User information found
            return res.json({ success: true, user: results[0] });
        } else {
            // User not found
            return res.status(404).json({ success: false, message: 'User not found' });
        }
    });
});

app.listen(port, () => {console.log("Server started on port " + port)})