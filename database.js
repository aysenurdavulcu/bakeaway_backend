var sqlite3 = require('sqlite3').verbose()
//var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE bakedgoodsdata (
            "GoodsID" INTEGER PRIMARY KEY AUTOINCREMENT,
            "SellerID" INT,
            "Name" TEXT,
            "Description" TEXT,
            "Seller" TEXT,
            "Price" TEXT,
            "Zipcode" INT
            )`,
            (err) => {
                if (err) {
                    // Table already created
                    //console.log(err);
                } else {
                    // Table just created, creating some rows
                    var insert = 'INSERT INTO bakedgoodsdata (GoodsID,SellerID,Name,Description,Seller,Price,Zipcode) VALUES (?,?,?,?,?,?,?)';

                    db.run(insert, [20,'101', 'Chocolate Cupcakes', 'description', 'Kate S', '1.25', '11223'])
                    db.run(insert, [21, '102', 'Red Velvet Cupcakes', 'description','Elaine R', '1.50', '11223'])
                    db.run(insert, [22, '103', 'Sugar Cookies', 'description', 'James T', '0.99', '11223'])
                    db.run(insert, [23, '103', 'Cinnamum Buns', 'description', 'Amy R', '2.25', '11223'])
                    db.run(insert, [24, '103', 'Reeses Cups', 'description','Sarah P', '1.75', '11223'])
                    db.run(insert, [25, '103', 'Strawberry Cheesecake', 'description','Claire S', '7.95', '11223'])
                }
            })
        db.run(`CREATE TABLE userdata(
            "UserID" INTEGER PRIMARY KEY AUTOINCREMENT,
            "Username" TEXT NOT NULL UNIQUE,
            "Password" TEXT NOT NULL,
            "Type" TEXT NOT NULL,
            "FirstName" TEXT NOT NULL,
            "LastName" TEXT NOT NULL
            )`,
            (err) => {
                if (err) {
                    // Table already created
                    console.log(err);
                } else {
                    // Table just created, creating some rows
                    
                    var insert = 'INSERT INTO userdata (UserID,Username,Password,Type,FirstName,LastName) VALUES (?,?,?,?,?,?)';
                    db.run(insert, [null,'apple', 'abc123', 'buyer', 'John', 'Castillo']);
                    db.run(insert, [null, 'ayse1', 'abc456', 'seller', 'Ayse', 'Davulcu']);
                    console.log("it ran");
                    
                }
            });
        }
});

module.exports = db