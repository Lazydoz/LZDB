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
            image TEXT,
            source TEXT,
            download TEXT
        )
    `);

    //insert(6214004,"Skimmia","https://booth.pximg.net/af3e0f0e-13f8-436b-b90b-e3a2ed57ca12/i/6214004/dd3cee5c-c52b-4bf4-b2ef-7fa3c15fae47_base_resized.jpg","https://booth.pm/ja/items/6214004","https://drive.google.com/file/d/1Z4q49o_NgT7T6xHmAFfQuBYLD0I9CEwr/view?usp=sharing");

    // XEM KIEU JSON
    db.all("SELECT * FROM base", [], (err, rows) => {
        console.table(rows);
    });
    

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