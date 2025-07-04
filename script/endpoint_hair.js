const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/lzdb.db');

// tao bo dinh tuyen
const router = express.Router();

// lay tat ca hair avatar
router.get('/', (req, res) => {
    db.all("SELECT * FROM hair", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
}); 

// them hair avatar
router.post('/', (req, res) => {
    const { hair_id, booth_id, hair_name, image, source, download } = req.body;
    db.run("INSERT INTO hair (hair_id, booth_id, hair_name, image, source, download) VALUES (?, ?, ?, ?, ?, ?)",
        [hair_id, booth_id, hair_name, image, source, download],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: this.lastID });
        });
});

// sua hair avatar
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { hair_id, booth_id, hair_name, image, source, download } = req.body;
    db.run("UPDATE hair SET hair_id = ?, booth_id = ?, hair_name = ?, image = ?, source = ?, download = ? WHERE hair_id = ?",
        [hair_id, booth_id, hair_name, image, source, download, id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ changes: this.changes });
        });
});

// xoa hair avatar
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM hair WHERE hair_id = ?", [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ changes: this.changes });
    });
});