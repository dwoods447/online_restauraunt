

require('dotenv').config()
const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const path = require('path');
const port = config.port;
const app = express();
const bodyParser = require('body-parser');


// const mongoConnect = require('./utils/mongo-database.js').mongoConnect;
const {sequelize} = require('./models/sequelize');


app.use(cors());
app.use(bodyParser.json());



const addresses = require('./routes/addresses');
const foodcatgories = require('./routes/food-categories');
const menuitems = require('./routes/menu-items');
const addons = require('./routes/addons');
const orders = require('./routes/orders');
// Front-End Client 
app.use('/', express.static(path.join(__dirname, '../client/dist')));


app.use('/address', addresses);
app.use('/categories', foodcatgories);
app.use('/menuitems', menuitems);
app.use('/addons', addons);
app.use('/orders', orders);

try {
    // mongoConnect(() =>{
    //      app.listen(process.env.PORT || port, ()=> console.log(`Application started on PORT ${port}.\r\n\r\n`));
    // })
    sequelize.sync().then(() =>{
        console.log(`Connection Successfull.....\r\n\r\n`);
        app.listen(process.env.PORT || port, ()=> console.log(`Application started on PORT ${port}.\r\n\r\n`));
    })
   
} catch (err){
    throw new Error(err);
}