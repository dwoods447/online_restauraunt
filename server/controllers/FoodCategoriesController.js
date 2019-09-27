//const FoodCategory = require('../models/mongo/food-category');
const { FoodCategory } = require('../models/sequelize')
module.exports = {
    // async getFoodCategories(req, res){
    //     try {
    //         const foodCategories = await FoodCategory.findAllCategories();
    //         if(foodCategories){
    //             console.log(`Food Categories ${JSON.stringify(foodCategories, null, 2)}`)
    //             res.json(foodCategories);
    //         }
    //     } catch (err){
    //          res.status(500).json({message: "Unable to return data."});
    //     }
    // }

     async getFoodCategories(req, res){
        try {
            const foodCategories = await FoodCategory.findAll();
            if(foodCategories){
                console.log(`Food Categories ${JSON.stringify(foodCategories, null, 2)}`)
                res.json(foodCategories);
            }
        } catch (err){
             res.status(500).json({message: "Unable to return data."});
        }
    },

    
}