<template>
    <div>

         <b-modal :id="'modal-'+food.id" :title="food.item_name" v-for="food in foods" :key="food.id">
                <div class="food-category" v-if="meats.length > 0">
                    <h4>Toppings - Meat</h4>
                    <ul class="addon-list">
                             <li v-for="(meat, index) in meats" :key="meat.id">
                                 <div class="pretty p-icon p-curve p-tada">
                                    <input type="checkbox" @change="addOptionToCartItem(food, meat, index)" v-model="meat.checked">
                                    <div class="state p-primary-o">
                                        <i class="icon mdi mdi-check"></i>
                                        <label>{{ meat.name}}</label>
                                    </div>
                                 </div>
                             </li>
                     </ul>
                </div>

                 <div class="food-category" v-if="veggies.length > 0">
                    <h4>Toppings - Veggies</h4>
                    <ul class="addon-list">
                             <li v-for="(veggy, index) in veggies" :key="veggy.id">                 
                                <div class="pretty p-icon p-curve p-tada">
                                    <input type="checkbox" @change="addOptionToCartItem(food, veggy, index)" v-model="veggy.checked">
                                    <div class="state p-primary-o">
                                        <i class="icon mdi mdi-check"></i>
                                        <label>{{ veggy.name}}</label>
                                    </div>
                                 </div>
                             </li>
                    </ul>
                 </div>

                 <div class="food-category" v-if="addons.length > 0">
                        <h4>Add</h4>
                        <ul class="addon-list">
                            <li v-for="(addon, index) in addons" :key="addon.id">              
                                <div class="pretty p-icon p-curve p-tada">
                                    <input type="checkbox" @change="addOptionToCartItem(food, addon, index)" v-model="addon.checked">
                                    <div class="state p-primary-o">
                                        <i class="icon mdi mdi-check"></i>
                                        <label>{{ addon.name }}</label>
                                    </div>
                                 </div>
                            </li>
                        </ul>
                 </div>
  
            <template v-slot:modal-footer="{ ok, cancel, hide }">
            <!-- Emulate built in modal footer ok and cancel button actions -->
            <b-button size="sm" variant="success" @click="addToCart(food)">
                Add to Cart
            </b-button>
            <b-button size="sm" variant="danger" @click="cancel()">
                Done
            </b-button>
            <!-- Button with custom close trigger value -->
            <b-button size="sm" variant="outline-secondary" @click="hide()">
                Forget it
            </b-button>
            </template>
        </b-modal>


          <b-modal :id="'edit-modal-'+food.id" :title="food.item_name" v-for="food in foods" :key="'edit-'+food.id">
                <div class="food-category" v-if="meats.length > 0">
                    <h4>Toppings - Meat</h4>
                    <ul class="addon-list">
                             <li v-for="(meat, index) in meats" :key="meat.id">
                                 <div class="pretty p-icon p-curve p-tada">
                                    <input type="checkbox" @change="addOptionToCartItem(food, meat, index)" v-model="meat.checked">
                                    <div class="state p-primary-o">
                                        <i class="icon mdi mdi-check"></i>
                                        <label>{{ meat.name}}</label>
                                    </div>
                                 </div>
                             </li>
                     </ul>
                </div>

                 <div class="food-category" v-if="veggies.length > 0">
                    <h4>Toppings - Veggies</h4>
                    <ul class="addon-list">
                             <li v-for="(veggy, index) in veggies" :key="veggy.id">                 
                                <div class="pretty p-icon p-curve p-tada">
                                    <input type="checkbox" @change="addOptionToCartItem(food, veggy, index)" v-model="veggy.checked">
                                    <div class="state p-primary-o">
                                        <i class="icon mdi mdi-check"></i>
                                        <label>{{ veggy.name}}</label>
                                    </div>
                                 </div>
                             </li>
                    </ul>
                 </div>

                 <div class="food-category" v-if="addons.length > 0">
                        <h4>Add</h4>
                        <ul class="addon-list">
                            <li v-for="(addon, index) in addons" :key="addon.id">              
                                <div class="pretty p-icon p-curve p-tada">
                                    <input type="checkbox" @change="addOptionToCartItem(food, addon, index)" v-model="addon.checked">
                                    <div class="state p-primary-o">
                                        <i class="icon mdi mdi-check"></i>
                                        <label>{{ addon.name }}</label>
                                    </div>
                                 </div>
                            </li>
                        </ul>
                 </div>
  
            <template v-slot:modal-footer="{ ok, cancel, hide }">
            <!-- Emulate built in modal footer ok and cancel button actions -->
            <b-button size="sm" variant="primary" @click="editCart(food)">
                Edit
            </b-button>
            <!-- <b-button size="sm" variant="danger" @click="cancel()">
                Done
            </b-button> -->
            <!-- Button with custom close trigger value -->
            <b-button size="sm" variant="outline-secondary" @click="hide()">
                Forget it
            </b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
 import MenuItemService from '../services/MenuItemService'
 import AddOnService from '../services/AddOnService'
 import {eventBus} from "../main";
 import Vue from 'vue';
    export default {
        props: ['category_id'],
        created(){

        },
        mounted(){
            this.getFoods();
            this.getAddOns();
             eventBus.$on('openModal', (modal) => {
                 this.openModal(modal);
             })
        },
        data(){
            return {
                foods: [],
                sauces: [],
                meats: [],
                veggies: [],
                addons: [],
                options: [

                ],

            
             
            }
        },
        methods: {
           clearCheckedAddOns(){
               let checkboxes = [this.veggies, this.sauces, this.meats, this.addons];
               for(let first = 0; first < checkboxes.length; first++){
                   for(let second = 0; second < checkboxes[first].length; second++){
                            checkboxes[first][second].checked = false; 
                   }
               }
           },
            cancel(){
     
            },
            hide(modal){
                 this.$root.$emit('bv::hide::modal', modal, '#btnShow');
            },
            openModal(modal){
                this.$root.$emit('bv::toggle::modal', modal, '#btnhide');
            },  
          async getFoods(){
                const foodsInFoodCategory = (await MenuItemService.getFoodCategory(this.category_id)).data;
                if(foodsInFoodCategory){
                    this.foods = foodsInFoodCategory;
                }
               
           },
           
           async getAddOns(){
               const addOns = (await AddOnService.getAddOns(this.category_id)).data;
               if(addOns){
                    let $this = this;
                    addOns.forEach(function(element) {
                         if(element.type == "meat"){
                            $this.meats.push(element);   
                         }
                         if(element.type == "veggies"){
                            $this.veggies.push(element);
                         }
                         if(element.type == "sauces"){
                             $this.sauces.push(element);
                         }
                         if(element.type !== "meat" && element.type !== "sauces" && element.type !== "veggies"){
                            $this.addons = [];
                            $this.addons.push(element);
                         }
                    });

               }
           },
            addToCart(food){

                let foodObj = {};
                foodObj = food;
                Vue.set(foodObj, 'options', this.options);
                this.$store.dispatch('addToCartAction', foodObj);
                 this.$store.dispatch('calculateCartItems');
                 // If the cart was empty Check for the first time
                 // If menu item added to cart includes options
                 if(this.options.length > 0 && this.$store.state.cart.length == 1){
                   this.$store.dispatch('setInitialOptionPrice', this.options); 
                 }
                 this.$store.dispatch('calculateTotalCartProducts');
                this.options = [];
                this.hide('modal-'+food.id);
                this.clearCheckedAddOns();
            }, 

              editCart(food){
                let foodObj = {};
                foodObj = food;
                 foodObj['options'] = [];
                Vue.set(foodObj, 'options', this.options);
                this.$store.dispatch('editCartItemOptions', foodObj);
                this.$store.dispatch('calculateCartItems');
                this.$store.dispatch('calculateTotalCartProducts');
                this.options = [];
                this.hide('edit-modal-'+food.id);
                this.clearCheckedAddOns();
            }, 

           addOptionToCartItem(food, option, index){
               if (option.checked) {
                    //  const cartItem  = this.$store.state.cart.find(item => item.item.id === food.id);
                    // if(false){
                    //         if(cartItem.item.hasOwnProperty('options')){
                    //                 this.$store.dispatch('addOptionsToCartItem', {food: food, option: option});
                    //         } else {
                    //              this.$store.dispatch('addOptionsToCartItem', {food: food, option: option});

                    //         }
                    // } else {
                    //         this.options.push(option);
                    // }
                     this.options.push(option);
               } else {
                    this.removeOptionFromCartItem(food, option, index);
                    this.$store.dispatch('calculateCartOptions', index);
                    this.$store.dispatch('calculateTotalCartProducts');
               }
              
            
              
              
           },

           removeOptionFromCartItem(food, option, index){
               const optionToRemove = this.options.findIndex(removalItem => removalItem.id === option.id);
               if(optionToRemove){
                   this.options.splice(optionToRemove, 1);
                   this.$store.dispatch('calculateCartOptions', index);
                   this.$store.dispatch('calculateTotalCartProducts');
                 
                    
               }
              
           }
           
        }
    }
</script>

<style scoped>
 @import 'https://cdn.jsdelivr.net/npm/pretty-checkbox@3.0/dist/pretty-checkbox.min.css';
 @import 'https://cdn.materialdesignicons.com/4.4.95/css/materialdesignicons.min.css';
.addon-list {
  columns: 2;
  -webkit-columns: 2;
  -moz-columns: 2;
   list-style-type: none;
}
.addon-list li{
    margin: 0.3em;
}
</style>