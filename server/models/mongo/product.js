const getDb = require('../../utils/mongo-database').getDb

class Product {
    constructor(price, qty){
        this.price = price;
        this.qty = qty;
    }

    save(){
       const db = getDb();
       db.collection('products').insertOne(this)
       .then((result) =>{
        console.log(result);
       })
       .catch((err) =>{
        console.log(err);
       });
    }

    static findAllProducts(){
        const db = getDb();
        return db.collection('products')
        .find()
        .toArray()
        .then(products =>{
            console.log(products);
            return products;
        }).catch((err) =>{
            console.log(err);
        });
    }
}


module.exports = Product;
