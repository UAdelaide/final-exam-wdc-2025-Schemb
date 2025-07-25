const express = require('express');
const router = express.Router();
const db = require('../models/db');
var session = require('express-session');

// Create the express session
router.use(session({
  secret: 'DogsAreAwesome',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: false
  }
}));

// GET all users (for admin/testing)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT user_id, username, email, role FROM Users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST a new user (simple signup)
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const [result] = await db.query(`
      INSERT INTO Users (username, email, password_hash, role)
      VALUES (?, ?, ?, ?)
    `, [username, email, password, role]);

    res.status(201).json({ message: 'User registered', user_id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.get('/me', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  res.json(req.session.user);
});

// POST login (dummy version)
router.post('/login', async (req, res) => {
  var { username, password } = req.body;

  try {
    const [rows] = await db.query(`
      SELECT user_id, username, role FROM Users
      WHERE username = ? AND password_hash = ?
    `, [username, password]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    req.session.user_id = rows[0].user_id;
    req.session.username = rows[0].username;
    req.session.role = rows[0].role;

    res.json({ message: 'Login successful', user: rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

router.post('/logout', async (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.status(500).json({ message: 'Logout failed' });

    res.clearCookie('connect.sid');
    res.sendStatus(200);
  });
});

router.get('/fetchDogs', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT Dogs.name FROM Dogs INNER JOIN Users ON Dogs.owner_id = Users.user_id WHERE Users.user_id = ?
    `, [req.session.user_id]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ dogs: rows });
  } catch (error) {
    res.status(500).json({ error: 'Database access failed' });
  }
});

module.exports = router;
