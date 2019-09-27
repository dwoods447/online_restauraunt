const getDb = require('../../utils/mongo-database').getDb

class FoodCategory {
    constructor(category_id, category_name){
        this.category_id = category_id;
        this.category_name = category_name;
    }

    save(){
       const db = getDb();
       db.collection('food-categories').insertOne(this)
       .then((result) =>{
        console.log(result);
       })
       .catch((err) =>{
        console.log(err);
       });
    }

    static findAllCategories(){
        const db = getDb();
        return db.collection('food-categories')
        .find()
        .toArray()
        .then(categories =>{
            console.log(categories);
            return categories;
        }).catch((err) =>{
            console.log(err);
        });
    }
}


module.exports = FoodCategory;
