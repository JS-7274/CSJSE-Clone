const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

app.use(cors()) // Enable CORS for all routes
app.use(bodyParser.json()) // Use JSON parser for incoming requests

// Set up MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'team_user',
    password: 'TeamUser1234',
    database: 'csjse'
})

// Connect MySQL
db.connect((err) => {
    if (err) {
        throw err
    }
    console.log('Connected to MySQL')
})

app.post('/api/login', (req, res) => {
    console.log('Received login request', req.body)

    const {email, pass} = req.body

    const sql = "SELECT * FROM teachers_accounts WHERE email = ? AND password = ?;"
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

//api to handle requests from teachers to create account
app.post('/api/tCreateAccount', (req, res) => {
    console.log('Received account creation request', req.body);

    //turns the information received into variables that can be used for db insertion
    const { firstName, lastName, pass, email } = req.body;

    //updates the teacher_profile database first so it can get the automatically generated ID
    const insertProfileSql = `
        INSERT INTO Teacher_Profile (
            first_name, last_name, phone, email, home_church, education, experience, certifications, why_christian_ed, job_resume, testimony, personal_references, last_accessed
        ) VALUES (?, ?, NULL, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NOW())
    `;

    

    db.query(insertProfileSql, [firstName, lastName, email], (profileErr, profileResults) => {
        if (profileErr) {
            console.error('Error creating teacher profile:', profileErr.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Retrieve the auto-generated teacher_id
        const newTeacherId = profileResults.insertId;

        // Insert into teachers_accounts
        const insertAccountSql = 'INSERT INTO teachers_accounts (teacher_id, first_name, last_name, password, email) VALUES (?, ?, ?, ?, ?)';
        
        db.query(insertAccountSql, [newTeacherId, firstName, lastName, pass, email], (accountErr, accountResults) => {
            if (accountErr) {
                console.error('Error creating teacher account:', accountErr.message);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            // Account creation successful
            return res.json({ success: true });
        });
    });
});

//api to handle requests from schools to create account
app.post('/api/sCreateAccount', (req, res) => {
    console.log('Received account creation request', req.body);

    //turns the information received into variables that can be used for db insertion
    const { schoolName, pass, email } = req.body;

    //updates the school_profile database first so it can get the automatically generated ID
    const insertProfileSql = `
        INSERT INTO School_Profile (
            school_name, school_population, statement_of_faith, covenantal, teacher_count, administrative_structure, phone, email, location, campus_number, accreditation, grade_range, about, school_profile_graphic, last_accessed
        ) VALUES (?, NULL, NULL, NULL, NULL, NULL, NULL, ?, NULL, NULL, NULL, NULL, NULL, NULL, NOW())
    `;

    
    
    db.query(insertProfileSql, [schoolName, email], (profileErr, profileResults) => {
        if (profileErr) {
            console.error('Error creating school profile:', profileErr.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Retrieve the auto-generated school_id
        const newSchoolId = profileResults.insertId;

        // Insert into schools_accounts
        const insertAccountSql = 'INSERT INTO schools_accounts (school_id, school_name, password, email) VALUES (?, ?, ?, ?)';
        
        db.query(insertAccountSql, [newSchoolId, schoolName, pass, email], (accountErr, accountResults) => {
            if (accountErr) {
                console.error('Error creating school account:', accountErr.message);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            // Account creation successful
            return res.json({ success: true });
        });
    });
});


app.listen(port, () => {console.log("Server started on port " + port)})