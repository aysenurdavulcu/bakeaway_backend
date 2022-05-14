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

                    db.run(insert, [20,'101', 'Chocolate Cupcakes', 'These super moist chocolate cupcakes pack TONS of chocolateflavor in each cupcake wrapper! Made from simple everyday ingredients', 'Kate S', '1.25', '11223'])
                    db.run(insert, [21, '102', 'Red Velvet Cupcakes', 'Moist and fluffy red velvet cupcakes topped with a big dollop of cream cheese frosting are beyond delicious. There’s something so addictive about cream cheese frosting; sweetness is tempered with a bit of tang, the texture is creamy and luscious','Elaine R', '1.50', '11223'])
                    db.run(insert, [22, '103', 'Sugar Cookies', 'Sugar Cookies are a sweet and tender cookie with wonderfully crisp edges. They are truly an American favorite', 'James T', '0.99', '11223'])
                    db.run(insert, [23, '103', 'Cinnamon Buns', 'Sweet baked dough filled with a cinnamon-sugar filling. Made with a rich dough leavened with yeast, their characteristic form is due to rolling a dough sheet containing sweetened cinnamon filling', 'Amy R', '2.25', '11223'])
                    db.run(insert, [24, '103', 'Reeses Cups', "The classic combination of chocolate and peanut butter, REESE'S Peanut Butter Cups are the perfect companion for movies, sports and parties",'Sarah P', '1.75', '11223'])
                    db.run(insert, [25, '103', 'Strawberry Cheesecake', 'Bright, beautiful, and luscious Strawberry Cheesecake. This silky smooth cheesecake has a layer of easy homemade strawberry spread on the bottom and then a swirl of it through the top. Fresh strawberry flavors with creamy cheesecake is a perfect pair','Claire S', '7.95', '11223'])
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