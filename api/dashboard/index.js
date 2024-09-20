const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Pool } = require('pg');

// Connect to PostgreSQL (replace 'yourPostgresConnectionString' with the actual connection string)
const pool = new Pool({
  connectionString: 'yourPostgresConnectionString',
});

app.use(bodyParser.json());

// API Endpoints

// Fetch all appointments
app.get('/api/appointments', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM appointments');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new appointment
app.post('/api/appointments', async (req, res) => {
  const { date, time, description, user_id } = req.body;
  const query = 'INSERT INTO appointments (date, time, description, user_id) VALUES ($1, $2, $3, $4) RETURNING *';
  
  try {
    const result = await pool.query(query, [date, time, description, user_id]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Fetch all medications
app.get('/api/medications', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM medications');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new medication
app.post('/api/medications', async (req, res) => {
  const { name, time, user_id } = req.body;
  const query = 'INSERT INTO medications (name, time, user_id) VALUES ($1, $2, $3) RETURNING *';
  
  try {
    const result = await pool.query(query, [name, time, user_id]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Fetch all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new task
app.post('/api/tasks', async (req, res) => {
  const { task, dueDate, user_id } = req.body;
  const query = 'INSERT INTO tasks (task, dueDate, user_id) VALUES ($1, $2, $3) RETURNING *';
  
  try {
    const result = await pool.query(query, [task, dueDate, user_id]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Fetch all caregiver tasks
app.get('/api/caregiver-tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM caregiver_tasks');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new caregiver task
app.post('/api/caregiver-tasks', async (req, res) => {
  const { task, dueDate, user_id } = req.body;
  const query = 'INSERT INTO caregiver_tasks (task, dueDate, user_id) VALUES ($1, $2, $3) RETURNING *';
  
  try {
    const result = await pool.query(query, [task, dueDate, user_id]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
