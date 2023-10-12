const express = require("express");
const bodyParser = require('body-parser');
const con = require('./connection');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/create_account.html');
});

app.post('/', function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    con.connect(function(error) {
        if (error) throw error;

        const sql = "INSERT INTO student (username, password) VALUES (?, ?)";
        con.query(sql, [username, password], function(error, result) {
            if (error) throw error;
            res.send("User registered successfully. ID: " + result.insertId);
            res.end();
        });

    });
});

app.listen(8888, function() {
    console.log('Server running at http://localhost:8888/');
});
