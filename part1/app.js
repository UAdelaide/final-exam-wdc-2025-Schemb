var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql2/promise');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let db;

(async () => {
  try {
    // Connect to the database
    db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'DogWalkService'
    });

    // Insert data if Users is empty
    var [rows] = await db.execute('SELECT COUNT(*) AS count FROM Users');
    if (rows[0].count === 0) {
      await db.execute(`
        INSERT INTO Users (username, email, password_hash, role) VALUES
        ('alice123', 'alice@example.com', 'hashed123', 'owner'),
        ('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
        ('carol123', 'carol@example.com', 'hashed789', 'owner'),
        ('deanweb', 'dean@example.com', 'password123', 'walker'),
        ('josephs', 'joseph@example.com', 'password456', 'owner')
      `);
    }

    // Insert data if Dogs is empty
    [rows] = await db.execute('SELECT COUNT(*) AS count FROM Dogs');
    if (rows[0].count === 0) {
      await db.execute(`
        INSERT INTO Dogs (owner_id, name, size)
        SELECT user_id, 'Max', 'medium' FROM Users WHERE username = 'alice123' AND role = 'owner' LIMIT 1
      `);
      await db.execute(`
        INSERT INTO Dogs (owner_id, name, size)
        SELECT user_id, 'Bella', 'small' FROM Users WHERE username = 'carol123' AND role = 'owner' LIMIT 1
      `);
      await db.execute(`
        INSERT INTO Dogs (owner_id, name, size)
        SELECT user_id, 'Luna', 'medium' FROM Users WHERE username = 'josephs' AND role = 'owner' LIMIT 1
      `);
      await db.execute(`
        INSERT INTO Dogs (owner_id, name, size)
        SELECT user_id, 'Clifford', 'large' FROM Users WHERE username = 'alice123' AND role = 'owner' LIMIT 1
      `);
      await db.execute(`
        INSERT INTO Dogs (owner_id, name, size)
        SELECT user_id, 'Pipsqueak', 'small' FROM Users WHERE username = 'carol123' AND role = 'owner' LIMIT 1
      `);
    }

    // Insert data if WalkRequests is empty
    [rows] = await db.execute('SELECT COUNT(*) AS count FROM Dogs');
    if (rows[0].count === 0) {
      await db.execute(`
        INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status)
        SELECT dog_id, '2025-06-10 08:00:00', 30, 'Parklands', 'open' FROM Dogs WHERE name = 'Max' LIMIT 1
      `);
      await db.execute(`
        INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status)
        SELECT dog_id, '2025-06-10 08:00:00', 30, 'Parklands', 'open' FROM Dogs WHERE name = 'Max' LIMIT 1
      `);
      await db.execute(`
        INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status)
        SELECT dog_id, '2025-06-10 08:00:00', 30, 'Parklands', 'open' FROM Dogs WHERE name = 'Max' LIMIT 1
      `);
      await db.execute(`
        INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status)
        SELECT dog_id, '2025-06-10 08:00:00', 30, 'Parklands', 'open' FROM Dogs WHERE name = 'Max' LIMIT 1
      `);
      await db.execute(`
        INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status)
        SELECT dog_id, '2025-06-10 08:00:00', 30, 'Parklands', 'open' FROM Dogs WHERE name = 'Max' LIMIT 1
      `);
    }
  } catch (err) {
    console.error('Error connecting to database. Ensure dogwalks.sql is loaded into MySQL.', err);
  }
})();

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
