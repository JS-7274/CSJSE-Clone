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
    console.log('Received login request', req.body)

    const {email, pass} = req.body

    const sql = "SELECT * FROM teacher_profile WHERE email = ? AND password = ?;"
    db.query(sql, [email, pass], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error'})
        }

        if (results.length > 0) {
            // Login successful
            return res.json({success: true})
        } else {
            // Invalid credentials
            return res.json({success: false})
        }
    })
})

// API for school login
app.post('/api/slogin', (req, res) => {
    console.log('Received login request', req.body)

    const {email, pass} = req.body

    const sql = "SELECT * FROM school_profile WHERE email = ? AND password = ?;"
    db.query(sql, [email, pass], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error'})
        }

        if (results.length > 0) {
            // Login successful
            return res.json({success: true})
        } else {
            // Invalid credentials
            return res.json({success: false})
        }
    })
})

// Api to handle requests from teachers to create account
app.post('/api/tCreateAccount', (req, res) => {
    console.log('Received account creation request', req.body);

    // turns the information received into variables that can be used for db insertion
    const { firstName, lastName, email, pass } = req.body;

    // updates the teacher_profile database so it can get the automatically generated ID
    const insertProfileSql = `
        INSERT INTO Teacher_Profile (
            first_name, last_name, phone, email, home_church, education, experience, certifications, why_christian_ed, job_resume, testimony, personal_references, last_accessed, password
        ) VALUES (?, ?, NULL, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NOW(), ?)
    `;

    

    db.query(insertProfileSql, [firstName, lastName, email, pass], (profileErr, profileResults) => {
        if (profileErr) {
            console.error('Error creating teacher profile:', profileErr.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Retrieve the auto-generated teacher_id
        const newTeacherId = profileResults.insertId;

        // Account creation successful
        return res.json({ success: true });
    });
});

// Api to handle requests from schools to create account
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
        return res.json({ success: true });
    });
});


app.listen(port, () => {console.log("Server started on port " + port)})