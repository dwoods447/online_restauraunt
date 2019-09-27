const { FoodCategory } = require('../models/sequelize');
const { AddOn } = require('../models/sequelize');
module.exports = {
    async getAddOns(req, res){
        const  { category_id } = req.params;
        try {
            const addOns = await AddOn.findAll({
                where: {FoodCategoryId: category_id}
            })
            res.json(addOns);
        } catch(err){
            res.status(500).json({message: 'An error occured: ' + err});
        }
    }
}