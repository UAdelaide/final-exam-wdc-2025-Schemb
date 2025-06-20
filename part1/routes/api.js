var express = require('express');
var router = express.Router();
var mysql = require('mysql2/promise');

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
        SELECT dog_id, '2025-06-10 09:30:00', 45, 'Beachside Ave', 'accepted' FROM Dogs WHERE name = 'Bella' LIMIT 1
      `);
      await db.execute(`
        INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status)
        SELECT dog_id, '2025-06-21 16:30:00', 60, 'North Terrace', 'accepted' FROM Dogs WHERE name = 'Luna' LIMIT 1
      `);
      await db.execute(`
        INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status)
        SELECT dog_id, '1963-10-03 6:15:00', 10, 'Birdwell Island', 'completed' FROM Dogs WHERE name = 'Clifford' LIMIT 1
      `);
      await db.execute(`
        INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status)
        SELECT dog_id, NOW(), 1, 'Tinyville', 'cancelled' FROM Dogs WHERE name = 'Pipsqueak' LIMIT 1
      `);

      // Insert data if WalkRatings is empty
    [rows] = await db.execute('SELECT COUNT(*) AS count FROM WalkRatings');
    if (rows[0].count === 0) {
      await db.execute(`
        INSERT INTO WalkRatings (request_id, walker_id, owner_id, rating, comments)
        SELECT WalkRequests.request_id, Dogs.size, Users.username AS owner_username FROM Dogs INNER JOIN Users ON Dogs.owner_id = Users.user_id LIMIT 1
      `);
      await db.execute(`
        INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status)
        SELECT dog_id, '2025-06-10 09:30:00', 45, 'Beachside Ave', 'accepted' FROM Dogs WHERE name = 'Bella' LIMIT 1
      `);
      await db.execute(`
        INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status)
        SELECT dog_id, '2025-06-21 16:30:00', 60, 'North Terrace', 'accepted' FROM Dogs WHERE name = 'Luna' LIMIT 1
      `);
      await db.execute(`
        INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status)
        SELECT dog_id, '1963-10-03 6:15:00', 10, 'Birdwell Island', 'completed' FROM Dogs WHERE name = 'Clifford' LIMIT 1
      `);
      await db.execute(`
        INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status)
        SELECT dog_id, NOW(), 1, 'Tinyville', 'cancelled' FROM Dogs WHERE name = 'Pipsqueak' LIMIT 1
      `);
    }
  } catch (err) {
    console.error('Error connecting to database. Ensure dogwalks.sql is loaded into MySQL.', err);
  }
})();

/* GET dogs page. */
router.get('/dogs', async (req, res) => {
  try {
    const [dogs] = await db.execute(`SELECT Dogs.name AS dog_name, Dogs.size, Users.username AS owner_username FROM Dogs INNER JOIN Users ON Dogs.owner_id = Users.user_id`);
    res.json(dogs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dogs' });
  }
});

/* GET open walk requests page. */
router.get('/walkrequests/open', async (req, res) => {
  try {
    const [openWalkRequests] = await db.execute(`SELECT WalkRequests.request_id, Dogs.name AS dog_name, WalkRequests.requested_time, WalkRequests.duration_minutes, WalkRequests.location, Users.username AS owner_username FROM WalkRequests INNER JOIN Dogs ON WalkRequests.dog_id = Dogs.dog_id INNER JOIN Users ON Dogs.owner_id = Users.user_id WHERE WalkRequests.status = 'open'`);
    res.json(openWalkRequests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch open walk requests' });
  }
});

module.exports = router;
