const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/lzdb.db');

// tao bo dinh tuyen
const router = express.Router();

// lay tat ca cloth avatar
router.get('/', (req,res) =>  {
    db.all("SELECT  * FROM cloth", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        else{
            res.json(rows);
        }
    })
})

// them cloth avatar
router.post('/', (req, res) => {
    const { cloth_id, booth_id, cloth_name, image, source, download } = req.body;
    db.run("INSERT INTO cloth (cloth_id, booth_id, cloth_name, image, source, download) VALUES (?, ?, ?, ?, ?, ?)",
        [cloth_id, booth_id, cloth_name, image, source, download],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: this.lastID });
        });
});

// sua cloth avatar 
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { cloth_id, booth_id, cloth_name, image, source, download } = req.body;
    db.run("UPDATE cloth SET cloth_id = ?, booth_id = ?, cloth_name = ?, image = ?, source = ?, download = ? WHERE cloth_id = ?",
        [cloth_id, booth_id, cloth_name, image, source, download, id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ changes: this.changes });
        });
});

// xoa cloth avatar
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM cloth WHERE cloth_id = ?", [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ changes: this.changes });
    });
});