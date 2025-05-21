const db = require('../db/database');

exports.createDB = (req, res) => {
    const sql = `CREATE DATABASE todoapp`;

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err });

        return res.status(201).json({ message: 'Database created successfully' });
    })

}


exports.createTable = (req, res) => {

    let sql = `CREATE TABLE if not exists todos(
        id int primary key auto_increment,
        firstName varchar(255) not null,
        lastName varchar(255) not null
    )`;

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err });

        return res.status(201).json({ message: 'Table created successfully' });
    })
}


exports.createList = (req, res) => {
    let sql = `INSERT INTO todos SET ?`;

    const {firstName, lastName} = req.body;

    db.query(sql, {firstName, lastName}, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        return res.status(201).json(result);
    })

}

exports.showList = (req, res) => {
    let sql = `SELECT * FROM todos`;

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        return res.status(200).json(result);
    })
}


exports.singleList = (req, res) => {
    let sql = `SELECT * FROM todos WHERE id = ${req.params.id}?`;

    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        return res.status(200).json(result);
    })
} 


exports.updateListItem = (req, res) => {
    let sql = `UPDATE todos SET ? WHERE id = ${req.params.id}`;

    const {firstName, lastName} = req.body;

    db.query(sql, {firstName, lastName}, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        return res.status(200).json(result);
    })
}


exports.deleteListItem = (req, res) => {
    let sql = `DELETE FROM todos WHERE id = ${req.params.id}`;

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        return res.status(200).json(result);
    })
}