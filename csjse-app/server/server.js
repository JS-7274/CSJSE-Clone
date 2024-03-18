/* This document will establish a connection to the database as well as
   create all the APIs that the frontend will call to interact with the database. */

const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv');
const port = process.env.PORT || 5000

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

// Api to handle requests from schools to create account
app.post('/api/sCreateAccount', (req, res) => {
    try {
        console.log('Received account creation request', req.body);

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
                console.error('Error creating school profile:', profileErr.message);
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

// API to fetch information for all teachers with optional search query and filter queries
app.get('/api/teachers', (req, res) => {
    console.log('Request Query:', req.query); // Log request query parameters
    // Extract the search query, degree, and location from the request parameters
    const { searchQuery, degree, location } = req.query;

    // SQL query to select specific fields from the Teacher_Profile table for all teachers
    let sql = "SELECT teacher_id, first_name, last_name, contact_email, experience, testimony, degree, location FROM Teacher_Profile WHERE 1 = 1";

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

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching filtered teachers list:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Teachers information found
        return res.json({ success: true, teachers: results });
    });
});

// API to fetch information for all schools with optional search query and filter queries
app.get('/api/schools', (req, res) => {
    console.log('Request Query:', req.query); // Log request query parameters
    // Extract the search query, grade range, and location from the request parameters
    const { searchQuery, gradeRange, location } = req.query;

    // SQL query to select specific fields from the School_Profile table for all schools
    let sql = "SELECT school_id, school_name, school_population, statement_of_faith, covenantal, teacher_count, administrative_structure, phone, contact_email, location, campus_number, accreditation, grade_range, about FROM School_Profile WHERE 1 = 1";

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

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching filtered schools list:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Schools information found
        return res.json({ success: true, schools: results });
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error occurred:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// 404 Not Found middleware
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

app.listen(port, () => {console.log("Server started on port " + port)})