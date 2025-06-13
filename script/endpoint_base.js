const express = require('express');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/lzdb.db');

// tao bo dinh tuyen
const router = express.Router();


// lay tat ca base avatar
router.get('/', (req,res) => {
    db.all("SELECT * FROM base", [], (err,rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        else {
            res.json(rows);
        }
    });
});

module.exports = router;