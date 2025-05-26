console.log(`Starting Regify Server...`);
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // we'll set this in Railway
  ssl: {
    rejectUnauthorized: false
  }
});
// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.get("/create", (req, res) => {
  res.sendFile(path.join(__dirname, "create.html"))
});


// Start the server
app.listen(port,"0.0.0.0", () => {
  console.log(`Server is running at http://0.0.0.0:${port}`);
});