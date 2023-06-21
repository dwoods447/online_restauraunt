const { sequelize } = require('../models/sequelize');
//Bring in BlueBird
const Promise = require('bluebird');

// Bring in models
const { FoodCategory } = require('../models/sequelize');
// const { AddOn } = require('../models/sequelize');
// const { Customer } = require('../models/sequelize');
// const { Ingredient } = require('../models/sequelize');
 const { MenuItem } = require('../models/sequelize');
// const { Order } = require('../models/sequelize');
// const { OrderProduct  } = require('../models/sequelize');
//  const { Product  } = require('../models/sequelize');

 const { AddOn  } = require('../models/sequelize');
// Bring in seed files

const foodcategories = require('./food-categories.json');
// const products = require('./products.json');
const menuItems = require('./menu-items.json');
const addons = require('./addons.json');


sequelize.sync({force: true})
.then(async function(){

    await Promise.all(
        foodcategories.map(foodcategory => {
            FoodCategory.create(foodcategory)
        })
    )
    
    // await Promise.all(
    //     products.map(product => {
    //         Product.create(product)
    //     })
    // )
    await Promise.all(
        menuItems.map(menuItem => {
            MenuItem.create(menuItem)
        })
    )
    await Promise.all(
        addons.map(addon => {
            AddOn.create(addon)
        })
    )

})