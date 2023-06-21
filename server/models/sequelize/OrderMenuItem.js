module.exports = function (sequelize, DataTypes) {
    const OrderMenuItem = sequelize.define('OrderMenuItem', {
        qty: {
            type: DataTypes.INTEGER   
        },
        price: {
            type: DataTypes.DECIMAL(10,2)  
        },
    })


   
    OrderMenuItem.associate = function(models){
        OrderMenuItem.belongsTo(models.Order);
        OrderMenuItem.belongsTo(models.MenuItem);
        // OrderMenuItem.belongsTo(models.AddOn);

   }

    return OrderMenuItem;    
}