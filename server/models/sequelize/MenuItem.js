module.exports  = function (sequelize, DataTypes)  {
    const MenuItem = sequelize.define('MenuItem', {
        item_name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
        },
        imageUrl: {
            type: DataTypes.STRING,
        },
        item_available: {
            type: DataTypes.BOOLEAN,
        },
        price: {
            type: DataTypes.STRING,
        }
    })


   
    MenuItem.associate = function(models){
        MenuItem.belongsTo(models.FoodCategory);

   }

    return MenuItem;    
}