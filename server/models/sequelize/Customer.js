module.exports = function (sequelize, DataTypes) {
    const Customer = sequelize.define('Customer', {
        first_name: {
            type: DataTypes.STRING,
        },
        last_name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        delivery_address:{
            type: DataTypes.STRING,
        }
    })

    return Customer;    
}