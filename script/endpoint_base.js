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

// them base avatar
router.post('/', (req, res) => {
    const { base_id, booth_id, base_name, image, source, download } = req.body;
    db.run("INSERT INTO base (base_id, booth_id, base_name, image, source, download) VALUES (?, ?, ?, ?, ?, ?)",
        [base_id, booth_id, base_name, image, source, download],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: this.lastID });
        });
});

// sua base avatar  
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { base_id, booth_id, base_name, image, source, download } = req.body;
    db.run("UPDATE base SET base_id = ?, booth_id = ?, base_name = ?, image = ?, source = ?, download = ?  WHERE base_id = ?",
        [base_id, booth_id, base_name, image, source, download, id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ changes: this.changes });
        });
});

// xoa base avatar
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM base WHERE base_id = ?", [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ changes: this.changes });
    });
});

// lay base avatar theo id
router.get('/:id', (req, res) => {
    db.get("SELECT * FROM base WHERE base_id = ?", [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
});