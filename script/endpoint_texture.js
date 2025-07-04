const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/lzdb.db');

// tao bo dinh tuyen
const router = express.Router();

// lay tat ca texture avatar
router.get('/', (req, res) => {
    db.all("SELECT * FROM texture", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// them texture avatar
router.post('/', (req, res) => {
    const { texture_id, booth_id, texture_name, image, source, download } = req.body;
    db.run("INSERT INTO texture (texture_id, booth_id, texture_name, image, source, download) VALUES (?, ?, ?, ?, ?, ?)",
        [texture_id, booth_id, texture_name, image, source, download],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: this.lastID });
        });
});

// sua texture avatar
router.put('/:id', (req, res) => { 
    const { id } = req.params;
    const { texture_id, booth_id, texture_name, image, source, download } = req.body;
    db.run("UPDATE texture SET texture_id = ?, booth_id = ?, texture_name = ?, image = ?, source = ?, download = ? WHERE texture_id = ?",
        [texture_id, booth_id, texture_name, image, source, download, id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ changes: this.changes });
        });
});

// xoa texture avatar
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM texture WHERE texture_id = ?", [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ changes: this.changes });
    });
});