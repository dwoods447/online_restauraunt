const { MenuItem } = require('../models/sequelize')

module.exports = {
    async getFoodsInCategory(req, res){
        const { id } = req.params;
        try{
            const foodsInCategory = await MenuItem.findAll({
                where: { FoodCategoryId: id }
            });
    
            if(foodsInCategory){
                console.log(`Foods in Category: ${id} ${JSON.stringify(foodsInCategory, null, 2)}`);
                res.json(foodsInCategory);
            }
        } catch(err){
            res.status(500).json({message: "Error"});
        }
        
    }
}