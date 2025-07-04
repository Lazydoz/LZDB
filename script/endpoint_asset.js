const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/lzdb.db');

// tao bo dinh tuyen
const router = express.Router();

// lay tat ca asset avatar
router.get('/', (req, res) => {
    db.all("SELECT * FROM asset", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// them asset avatar
router.post('/', (req, res) => {
    const { asset_id, booth_id, asset_name, image, source, download } = req.body;
    db.run("INSERT INTO asset (asset_id, booth_id, asset_name, image, source, download) VALUES (?, ?, ?, ?, ?, ?)",
        [asset_id, booth_id, asset_name, image, source, download],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: this.lastID });
        });
});

// sua asset avatar
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { asset_id, booth_id, asset_name, image, source, download } = req.body;
    db.run("UPDATE asset SET asset_id = ?, booth_id = ?, asset_name = ?, image = ?, source = ?, download = ? WHERE asset_id = ?",
        [asset_id, booth_id, asset_name, image, source, download, id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ changes: this.changes });
        });
});

// xoa asset avatar
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM asset WHERE asset_id = ?", [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ changes: this.changes });
    });
});