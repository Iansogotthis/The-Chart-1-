const r = require('rethinkdb');
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
require("dotenv").config(); // Load environment variables from .env file

// Initialize Express application
const app = express();
const port = process.env.PORT || 3000; // Define the port for the server

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse incoming request bodies in JSON format

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',   // Replace with your MySQL host, if not running locally
  user     : 'me',          // Replace 'me' with your MySQL username
  password : 'secret',      // Replace 'secret' with your MySQL password
  database : 'my_db'        // Replace 'my_db' with the name of your database
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

connection.end();
// Route to handle form submission
app.post('/save', async (req, res) => {
  const {
    title,
    plane,
    purpose,
    delineator,
    notations,
    details,
    extraData,
    class: squareClass,
    parent,
    depth,
    name,
    size,
    color,
    type,
    parent_id
  } = req.body;

  const query = `INSERT INTO squares (title, plane, purpose, delineator, notations, details, extraData, class, parent, depth, name, size, color, type, parent_id)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  try {
    pool.getConnection((err, conn) => {
      if (err) {
        console.error('Error getting connection:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      conn.query(query, [
        title,
        plane,
        purpose,
        delineator,
        notations,
        details,
        extraData,
        squareClass,
        parent,
        depth,
        name,
        size,
        color,
        type,
        parent_id
      ], (error, results) => {
        conn.release();
        if (error) {
          console.error('Error creating square:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        // Redirect back to index.html after saving
        res.redirect('/');
      });
    });
  } catch (err) {
    console.error('Error creating square:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const startServer = async () => {
  try {
    await connectToRethinkDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();
module.exports = { connectToRethinkDB };