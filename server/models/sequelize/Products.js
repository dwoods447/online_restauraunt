module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        product_id: {
            type: DataTypes.INTEGER,
        },
        price: {
            type: DataTypes.STRING,
        },
      
       
    })


   
   

    return Product;    
}