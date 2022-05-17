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
app.get("/api/allGoods/sellerid/:sellerid", (req, res, next) => {
    var sql = "select * from bakedgoodsdata where SellerID = ?"
    var params = [req.params.sellerid]
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
app.post("/api/addProduct", (req, res, next) => {
    var errors = []
    if (!req.body.sellerID) {
        errors.push("No seller id provided");
    } 
    if (!req.body.productName) {
        errors.push("No product name provided");
    } 
    if (!req.body.description) {
        errors.push("No description provided");
    } 
    if (!req.body.price) {
        errors.push("No price provided");
    } 
    if (!req.body.zipcode) {
        errors.push("No zipcode provided");
    } 
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }
    var data = {
        goodsID: Date.now(),
        sellerID: req.body.sellerID,
        sellerName: req.body.sellerName,
        productName: req.body.productName,
        description: req.body.description,
        price: req.body.price,
        zipcode: req.body.zipcode,
    }
    var sql = 'INSERT INTO bakedgoodsdata (GoodsID,SellerID,Name,Description,Seller,Price,Zipcode) VALUES (?,?,?,?,?,?,?)';
    var params = [data.goodsID,data.sellerID,data.productName,data.description,data.sellerName,data.price,data.zipcode]
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
app.delete("/api/removeItem/goodsID/:goodsid", (req, res, next) => {
    db.run(
        'DELETE FROM bakedgoodsdata WHERE GoodsID = ?',
        req.params.goodsid, 
        function (err, result){
            if(err) {
                res.status(400).json({"error": res.message})
                console.log(err);
                return;
                
            }
            res.status(200).json({"message": "deleted", changes: this.changes})

        });
})
app.listen(port);