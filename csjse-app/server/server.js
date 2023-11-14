const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 5000

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
    const {email, password} = req.body

    const sql = 'SELECT * FROM teachers_accounts WHERE email = ? AND password = ?'
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error'})
        }

        if (results.length > 0) {
            // Login successful
            return res.json({success: true})
        } else {
            // Invalid credentials
            return res.status(401).json({error: 'Invalid email or password'})
        }
    })
})

app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"] })
})

app.listen(port, () => {console.log("Server started on port " + port)})