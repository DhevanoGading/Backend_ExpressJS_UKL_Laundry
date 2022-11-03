const mysql = require('mysql');

//connect
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ukl_laundry"
});

module.exports = db;