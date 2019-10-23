 const { Order, OrderMenuItems, Customer }  = require('../models/sequelize')

module.exports = {
    async createOrder(req, res){
        console.log(`Creating Order.... ${  JSON.stringify(req.body.customer.email, null, 2)}`);
        try {
            let todayDate = new Date().toISOString().slice(0,10);
            // Get customer email 
            if(req.body.customer.email !== ''){
                console.log(`Email set: ${req.body.customer.email}`);
             // Check if already existing customer
                let customer = await Customer.findOne({
                    where:{email: req.body.customer.email}
                })
                console.log(`Customer Result: ${JSON.stringify(customer)}`);
                if(customer !== null){
                     // if customer exists dont save in Customers table and get id
                     console.log(`Customer exists ${JSON.stringify(customer)}`);

                     let customerId = customer.id;

                     console.log(`Customer Id ${customerId}`);

                      // create order, save in Orders with existing customer id
                    //   let orderSaved = Order.create({
                    //     order_date: req.body.order_details.pickupDate || todayDate,
                    //     payment_method: req.body.payment_method,
                    //     order_method: req.body.order_details.order_method,
                    //     order_comments: req.body.order_comments,
                    //     order_total: req.body.orderTotal,
                    //     CustomerId: customerId
                    //   })

                       // loop through and get menu items and save in OrderMenu table 
                        //   if(orderSaved){
                        //     console.log(`addons array: ${JSON.stringify(req.body.menu_items, null, 2)}`);
                        //     req.body.add_ons.forEach(function(element) {
                        //         console.log(JSON.stringify(element.item.item_name));
                        //         let orderItem = OrderMenuItems.create({
                        //             qty: element.quantity,
                        //             price: element.item.price
                        //             OrderId: orderSaved.id 
                        //             MenuItemId: element.item.id
                        //             addOnAmt: req.body.addOnAmt
                        //         })
                        //      });   
                        //   }
                     
                     res.send('Customer Found');
                } else {
                     // if customer doesnt exists save in Customers table and get id
                     console.log(`Customer DOESNT exists Email not found : ${JSON.stringify(customer)}`);
                     if(req.body.order_details.order_method === 'delivery'){
                        console.log(`Creating Customer 'with' Delivery Address`);
                        res.send('Customer Created with Delivery Address');
                        // Customer.create({
                        //     first_name: req.body.customer.firstname,
                        //     last_name: req.body.customer.lastname,
                        //     email: req.body.customer.email,
                        //     delivery_address: req.body.order_details.delivery_address
                        // })
                     } else {
                        console.log(`Creating Customer 'without' Delivery Address`);
                        res.send('Customer Created without Delivery Address');
                        // Customer.create({
                        //     first_name: req.body.customer.firstname,
                        //     last_name: req.body.customer.lastname,
                        //     email: req.body.customer.email
                        // })
                     }
                     
                }
               
                    
                       
               
                    // create order, save in Orders with new customer id
                        // loop through and get menu items and save in OrderMenu table 
            }
           
        } catch (err){
            console.log(`Error: ${err}`);
            res.send({error: err});
        }   
    },

    async getOrder(req, res){
        res.send('Getting One Order');
    },

    async getAllOrders(req, res){
        res.send('Getting All Orders');
    },
}