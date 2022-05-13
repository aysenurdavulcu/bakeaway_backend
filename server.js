const express = require('express')
const cors = require("cors");
const app = express()


app.use(cors())
const port = 8080;
const db = require("./database.js")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const uuid = require('uuid');
// console.log(uuid.v4())

app.get('/', (req,res)=>{
    console.log('Server started at http://localhost:' + port);
    res.send("Hello");
})

app.get("/api/allGoods", (req, res, next) => {
    var sql = "select * from bakedgoodsdata"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});
app.get("/api/allGoods/zipcode/:zipcode", (req, res, next) => {
    var sql = "select * from bakedgoodsdata where zipcode = ?"
    var params = [req.params.zipcode]
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});
//temporary
app.get("/api/allUsers", (req, res, next) => {
    var sql = "select * from userdata"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

app.get("/api/allUsers/:username/:password", (req, res, next) => {
    var sql = "select * from userdata where (username,password) = (?,?)"
    var params = [req.params.username, req.params.password]
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

app.post("/api/allUsers", (req, res, next) => {
    var errors = []
    if (!req.body.username) {
        errors.push("No username provided");
    } 
    if (!req.body.password) {
        errors.push("No password provided");
    } 
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }
    var data = {
        userID : req.body.userID,
        username : req.body.username,
        password : req.body.password,
        type : req.body.type,
        firstname : req.body.firstname,
        lastname : req.body.lastname
    }
    var sql = 'INSERT INTO userdata (UserID,Username,Password,Type,FirstName,LastName) VALUES (?,?,?,?,?,?)';
    var params = [data.userID,data.username,data.password,data.type,data.firstname,data.lastname]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id": this.lastID
        })
    });
})

app.listen(port);