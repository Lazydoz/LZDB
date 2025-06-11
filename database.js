const sqlite3 = require('sqlite3').verbose();

/* KET NOI TOI CO SO DU LIEU */ 
const db = new sqlite3.Database('./database.db', (err) => {

    if (err) {
        console.err("Lỗi kết nối CSDDL : ",err.message)
    }
    else {
        console.log("Kết nối thành công đến cơ sở dữ liệu.");
    }
});

/* TAO BANG */

/* DONG KET NOI TOI CO SO DU LIEU */
db.close((err) => {

    if (err) {
        console.error("Lỗi : ",err.message);
    }

    else{
        console.log("Đã đóng kết nối tới cơ sở dữ liệu.");
    }
});