const sqlite3 = require('sqlite3').verbose();

/*----- KET NOI TOI CO SO DU LIEU -----*/ 
const db = new sqlite3.Database('./data/lzdb.db', (err) => {

    if (err) {
        console.err("Lỗi kết nối CSDDL : ",err.message)
    }
    else {
        console.log("Kết nối thành công đến cơ sở dữ liệu.");
    }
});

/* HAM CHEN DU LIEU */
const insert = (booth_id, base_name, image, source, download) => {
    db.run(`
        INSERT INTO base (booth_id, base_name, image, source, download) VALUES (?, ?, ?, ?, ?)`, 
        [booth_id, base_name, image, source, download], 
        function(err) {
            if (err){
                console.error("Lỗi khi chèn dữ liệu:", err.message);
            }
            else {
                console.log(`Dữ liệu đã được chèn với ID: ${this.booth_id}`);
            }
        }
    );
}

db.serialize(() => {
    
    /*----- TAO BANG -----*/

    // BANG BASE
    db.run(`
        CREATE TABLE IF NOT EXISTS base (
            base_id INTEGER PRIMARY KEY AUTOINCREMENT,
            booth_id INTEGER,
            base_name TEXT,
            image TEXT,
            source TEXT,
            download TEXT
        )
    `);

    // BANG CLOTH
    db.run(`
        CREATE TABLE IF NOT EXISTS cloth (
            cloth_id INTEGER PRIMARY KEY AUTOINCREMENT,
            booth_id INTEGER,
            cloth_name TEXT,
            for TEXT,
            image TEXT,
            source TEXT,
            download TEXT
        );
    `);

    // BANG HAIR
    db.run(`
        CREATE TABLE IF NOT EXISTS hair (
            hair_id INTEGER PRIMARY KEY AUTOINCREMENT,
            booth_id INTEGER,
            hair_name TEXT,
            for TEXT,
            image TEXT,
            source TEXT,
            download TEXT
        );
    `);

    // BANG ASSET
    db.run(`
        CREATE TABLE IF NOT EXISTS asset (
            asset_id INTEGER PRIMARY KEY AUTOINCREMENT,
            booth_id INTEGER,
            asset_name TEXT,
            for TEXT,
            image TEXT,
            source TEXT,
            download TEXT
        );
    `);

    // BANG TEXTURE
    db.run(`
        CREATE TABLE IF NOT EXISTS texture (
            texture_id INTEGER PRIMARY KEY AUTOINCREMENT,
            booth_id INTEGER,
            texture_name TEXT,
            for TEXT,
            image TEXT,
            source TEXT,
            download TEXT
        );
    `);


    // XEM THONG TIN BANG
    db.all("PRAGMA table_info(base)", [], (err, rows) => {
        console.table(rows);
    });
 
    db.all("PRAGMA table_info(hair)", [], (err, rows) => {
        console.table(rows);
    });

    db.all("PRAGMA table_info(cloth)", [], (err, rows) => {
        console.table(rows);
    });

    db.all("PRAGMA table_info(asset)", [], (err, rows) => {
        console.table(rows);
    });

    db.all("PRAGMA table_info(texture)", [], (err, rows) => {
        console.table(rows);
    });

/*
    // XEM DU LIEU TRONG BANG 
    db.all("SELECT * FROM hair", [], (err,rows) => {
        if (err){
            console.error(err.message);
        }
        else {
            console.log(rows);
        }
    });
*/
});

/*----- DONG KET NOI TOI CO SO DU LIEU -----*/
db.close((err) => {

    if (err) {
        console.error("Lỗi : ",err.message);
    }

    else{
        console.log("Đã đóng kết nối tới cơ sở dữ liệu.");
    }
});