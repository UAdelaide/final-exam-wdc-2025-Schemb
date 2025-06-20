var express = require('express');
var router = express.Router();

/* GET dogs page. */
router.get('/', async (req, res) => {
  try {
    const [dogs] = await db.execute('SELECT * FROM books');
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dogs' });
  }
});

module.exports = router;
