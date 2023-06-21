
module.exports = function (sequelize, DataTypes)  {
    const AddOn = sequelize.define('AddOn', {
        name: {
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.STRING,  
        }
    })

    AddOn.associate = function(models){
        AddOn.belongsTo(models.FoodCategory);

   }

    return AddOn;    
}