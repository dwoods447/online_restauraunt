module.exports = (sequelize, DataTypes) => {
    const FoodCategory = sequelize.define('FoodCategory', {
        category_name: {
            type: DataTypes.STRING,
        }
    })

    return FoodCategory;    
}