console.log(`Starting Regify Server...`);
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log('DB connected:', res.rows);
  }
});

pool.query(`
  CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title TEXT,
    date TEXT,
    description TEXT
  );
`);

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})
app.get("/create", (req, res) => {
  res.sendFile(path.join(__dirname,"create.html"))
});

app.post("/events", (req, res) => {
  const {id, name, date, description} = req.query;
  
  pool.query(`INSERT INTO events (id, title, date, description) VALUES ($1,$2,$3,$4)`,[id, name, date, description ])
  
});

// Start the server
app.listen(port,"0.0.0.0", () => {
  console.log(`Server is running at http://0.0.0.0:${port}`);
});