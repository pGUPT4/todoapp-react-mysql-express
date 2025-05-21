let mysql = require('mysql');

let db = mysql.createConnection({
    host: process.env.DB_HOST, 
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) return console.error('Error connecting to the database: ', err.message);

    console.log('Connected to the database.');
})

module.exports = db;