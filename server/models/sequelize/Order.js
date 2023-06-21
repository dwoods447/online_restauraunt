module.exports = function(sequelize, DataTypes) {
    const Order = sequelize.define('Order', {
        order_date: {
            type: DataTypes.STRING,
        },
        payment_method: {
            type: DataTypes.STRING,
        },
        order_method: {
            type: DataTypes.STRING,
        },
        order_comments: {
            type: DataTypes.TEXT,
        },
        order_total: {
            type: DataTypes.STRING,
        }
       
    })
   
    Order.associate = function(models){
        Order.belongsTo(models.Customer);

   }

    return Order;    
}