<template>
    <div>
       <div class="container">
           <button class="btn btn-danger"><router-link :to="{name: 'menu'}">Back to Cart</router-link></button>
        <div class="row">
            <div class="col-lg-12">
                <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                        CART CONTENTS
                    </b-card-header>
                    <b-card-body>
                        <b-card-text v-if="items.length > 0">
             
                            <b-table :fields="fields" :items="items">
                                 <template v-slot:cell()="data">
                                    {{ data.item.quantity }}
                                 </template>
                                 <template v-slot:cell(item)="data">
                                    {{ data.item.item.item_name }}
                                        <ul v-if="data.item.item.options.length > 0">
                                            <li v-for="option in data.item.item.options" :key="option.id">+ &nbsp;{{ option.name }} &mdash;&nbsp;<span>${{ option.price}}</span></li>
                                        </ul>
                                 </template>
                                 <template v-slot:cell(price)="data">
                                    {{ data.item.item.price }}
                                 </template>
                                  
                            </b-table>
                         
                        </b-card-text>
                        <hr>
                        <div class="row">
                            
                            <div class="col-lg-9">
                                Order Total:
                            </div>
                            <div class="col-lg-3" style="text-algin:center;">
                                 <p style="margin-left: 50px; padding: 1em; text-algin:center; width: 35%;"> ${{this.$store.getters.getOrderTotal}}  </p>
                            </div>        
                        </div>
                    </b-card-body>
                </b-card>
            </div>
       </div><!-- end of row -->
        <div class="row">
            <div class="col-lg-12">
                <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                        CUSTOMER CONTACT
                    </b-card-header>
                    <b-card-body>
                        <div class="row">
                             <div class="col-lg-12">
                                <b-form-input  placeholder="Enter your Email"></b-form-input>
                            </div>
                        </div>  
                       
                    </b-card-body>
                </b-card>
            </div>
       </div><!-- end of row -->

        <div class="row">
            <div class="col-lg-12">
                <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                        CUSTOMER DETAILS
                    </b-card-header>
                    <b-card-body>
                             <div class="row">
                            <div class="col-lg-6">
                                <b-form-input placeholder="Enter your First Name"></b-form-input>
                            </div>
                             <div class="col-lg-6">
                                <b-form-input placeholder="Enter your Last Name"></b-form-input>
                            </div>
                        </div>
                        <br/>
                        <div class="row">
                             <div class="col-lg-6">
                                <b-form-input  placeholder="Enter your Email"></b-form-input>
                            </div>
                             <div class="col-lg-6">
                              
                            </div>
                        </div>
                    </b-card-body>
                </b-card>
            </div>
       </div><!-- end of row -->

        <!-- <div class="row">
            <div class="col-lg-12">
                <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                        BILLING DETAILS
                    </b-card-header>
                    <b-card-body>
                     
                    </b-card-body>
                </b-card>
            </div>
       </div> -->

          <div class="row">
            <div class="col-lg-6">
                <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                        PAYMENT METHOD
                    </b-card-header>
                    <b-card-body>
                       <div class="row">
                           <div class="col-lg-6">
                                <b-form-group label="Select a payment method from the following options.">
                                <b-form-radio v-model="paymethod" name="payment" value="card">Card Payment</b-form-radio>
                                <b-form-radio v-model="paymethod" name="payment" value="cash">Cash On Delivery</b-form-radio>
                                </b-form-group>
                           </div>
                           <div class="col-lg-6">
                               <ul>
                                   <li><strong>Order total</strong>&nbsp;&nbsp;&nbsp;{{ this.$store.getters.getOrderTotal }}</li>
                               </ul>
                           </div>
                       </div>
                    </b-card-body>
                </b-card>
            </div>
             <div class="col-lg-6">
                <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                        ORDER COMMENTS
                    </b-card-header>
                    <b-card-body>
                         <b-form-textarea
                            id="textarea"
                            v-model="ordercomments"
                            placeholder="Use this area for special instructions or questions regarding your order."
                            rows="3"
                            max-rows="6"
                            ></b-form-textarea>
                    </b-card-body>
                </b-card>
            </div>
         </div><!-- end of row -->
         <div class="row">
                <div class="col-lg-4">
                     <button class="btn btn-danger"><router-link :to="{name: 'home'}">Cancel</router-link></button>
                     <button class="btn btn-danger"><router-link :to="{name: 'home'}">Proceed</router-link></button>
                     
                </div> 
                <div class="col-lg-8">
                     <strong>Hitting 'Proceed' will take you back to the homepage.</strong>
                </div> 
         </div>    
       </div>
    </div>
</template>

<script>
    export default {
        mounted(){
            console.log(`Shopping Cart${JSON.stringify(this.$store.getters.getCart, null, 2)}`);
            this.items = this.$store.getters.getCart;
        },
        data(){
            return {
                fields: [{key: 'qauntity', label: 'Qty'},{key: 'item', label: 'Products'},{key: 'price', label: 'Price'} ],
                items: [],
                paymethod: '',
                ordercomments: '',
            }
        }
    }
</script>

<style scoped>
.btn-custom{
    display: block;
    width: 95%;
    margin: 15px auto;
}
.btn {
    margin: 10px;
}
.btn > a{
    color: #fff;
}
.table thead th{
    border: 0 !important;
    border: none;
}
.table th, .table td{
    border: 0 !important;
    border: none;
}
</style>