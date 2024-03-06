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

app.listen(port, () => {console.log("Server started on port " + port)})