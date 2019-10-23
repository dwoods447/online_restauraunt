<template>
    <div class="shopping-cart-container">
        <h3 class="cart-title">Your Order</h3>
        <div class="shoping-cart">
            <div class="shopping-cart-header">
                
            </div>
             <div class="shopping-cart-body">
                    <div class="empty-cart" v-if="shoppingCart.length == 0">
                        <div class="cart-img-container">
                            <img src="../assets/cart-img.png" alt="">
                        </div>
                        <p>Your cart is empty</p>
                        <p>Looks like you have not made your choice yet.</p>
                    </div>
                    <div class="cart-items" v-if="shoppingCart.length > 0">
                        <ul>
                            <li v-for="(item, index) in shoppingCart" :key="item.item.id+'-'+index">
                               <span class="item-cart-text"> <span><a href="javascript:void(0);" @click="removeItemFromCart(item, index)"><i class="material-icons">delete</i></a></span>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="javascript:void(0);" @click="openModal('edit-modal-'+item.item.id)"><i class="material-icons">create</i></a></span>&nbsp;<span class="item-cart-text item-name-text">{{  item.item.item_name }} |  Qty: {{  item.quantity }}</span>&nbsp;&nbsp; <span>${{ item.item.price }}  <span><span @click="decreaseQty(item)"><i class="material-icons"> remove_circle_outline </i></span><span>{{ item.quantity}}</span><span @click="increaseQty(item)"><i class="material-icons"> add_circle_outline </i></span></span></span> 
                                <div v-if="item.item.FoodCategoryId === 1 || item.item.FoodCategoryId === 2">
                                     <topping :index="index" :item="item"></topping>
                                </div>

                                 <div v-if="item.item.FoodCategoryId !== 1 && item.item.FoodCategoryId !== 2">
                                     <topping :index="index" :item="item"></topping>
                                 </div>

                                 
                              
                            </li>
                        </ul>
                        <hr/>
                         <div style="padding: 1em;">
                                   <div class="row">
                                    <div class="col-lg-9">
                                        <p>Total</p>
                                    </div>
                                    <div class="col-lg-3">
                                        <p>${{ orderTotal.toFixed(2) }}</p>
                                    </div>
                                </div>
                         </div>
                    </div>
             </div>
              <div class="shopping-cart-footer">
                  <router-link :to="{name: 'checkout'}" style="color: #fff;"><button class="btn btn-danger btn-custom" :disabled="isDisabled">CheckOut</button></router-link>
              </div>
        </div>
    </div>
</template>

<script>
    import {eventBus} from "../main";
    import Topping from '../components/Topping'
    export default {
        components:{
            'topping': Topping
        },
        data(){
            return {
                
            }
        },
        methods:{
            openModal(modal){
                eventBus.$emit('openModal', modal);
            },

            removeItemFromCart(cartItem, index){
                this.$store.dispatch('removeFromCartAction', {cartItem: cartItem, index: index});
                this.$store.dispatch('calculateCartItems');
                this.$store.dispatch('calculateTotalCartProducts');
            },
            increaseQty(item){
                  this.$store.dispatch('increasePurchaseItemQtyAction', item);
                  this.$store.dispatch('calculateCartItems');
                  this.$store.dispatch('calculateTotalCartProducts');
            },
            decreaseQty(item){
                  this.$store.dispatch('decreasePurchaseItemQtyAction', item);
                  this.$store.dispatch('calculateCartItems');
                  this.$store.dispatch('calculateTotalCartProducts');
            }

        },
        watch: {
          shoppingCart: {
            deep: true,
            handler: function(){
             }
           }
         },
        computed: {
            shoppingCart(){
                 return this.$store.getters.getCart;
            },

            orderTotal(){
                return this.$store.getters.getOrderTotal;
            },

            isDisabled(){
              return this.$store.getters.getDisabledStatus;  
            },
            
        },
    }
</script>

<style scoped>
.cart-title{
    width: 50%;
    margin: 0 auto;
    text-align: center;
    
}
.shopping-cart-container{
    border: 2px solid #eee;
    min-height: 60vh;
    border-radius:  0.3em;
}
.shopping-cart-body{
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: nowrap;
    align-content: center;
    min-height: 400px;
}
.btn-custom{
    display: block;
    width: 95%;
    margin: 0 auto;
}

.cart-img-container img{
    display: block;
    margin: 0 auto;
}
.empty-cart p {
    text-align: center;
    margin: 5px auto;
   
}
.shopping-cart-footer{
    padding: 0.5em;
    margin: 0.2em;
}
ul > li > span > span > a{
    margin-top: 2px;
    padding-top: 2px;
}

@import'https://fonts.googleapis.com/icon?family=Material+Icons';
</style>