import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


const store = new Vuex.Store({
    state: {
        cart: [],
        cartCount: '',
        addOnItems:[],
        deliveryAddress: '',
        orderMethod: '',
        pickupDate: '',
        pickupTime: '',
        cartItemsAmount: 0,
        cartOptionsAmount: 0,
        cartTotalAmount: 0,
        isDisabled: true,

        searchValue: '',
        filteredFoods: [],
        allfoods:[],
        filteredFoodsCategories: [],
        allFoodCategories: [],
        
      

    },
    mutations: {
        setAllFoodsMutation(state, foods){
            state.allfoods.push(foods);
            state.filteredFoods.push(foods);
        },
        sendToFilteredCategoriesMutation(state, searchValue){
                if(!(searchValue) || searchValue === '{}'){
                    state.searchValue = null;
                    state.filteredFoodsCategories = null;
                } else {
                    state.searchValue = searchValue;
                    state.filteredFoodsCategories = state.allFoodCategories.filter((category)=> {
                        return category.category_name.toLowerCase().includes(searchValue.toLowerCase());
                    })
                }
        },
        setFilteredFoodsMutation(state, foodArr){
            state.filteredFoods.push(foodArr);
        },
        setFilteredFoodsCategoriesMutation(state, foodCats){
            state.filteredFoods = [];
            state.allFoodCategories = [];
            state.filteredFoodsCategories = foodCats;
            state.allFoodCategories = foodCats;
        },
        setOrderMethodMutation(state, info){
            state.orderMethod = info.method;

            if(info.method === 'delivery'){
               state.deliveryAddress = info.address;
            }
            if(info.method === 'pickup'){
               state.pickupDate = info.pickupDate;
               state.pickupTime = info.pickupTime;
            }
        },
        addToCartMutation(state, item){
            state.cart.push({id: item.id, item: item, quantity: 1});
            if(state.cart.length  > 0){
                state.isDisabled = false;
            }
        },
        addToOptionsCartMutation(state, item){
            state.cart[item.index].item.options.push(item.option);
        },
        increasePurchaseItemQtyMutation(state, cartItem){
            cartItem.quantity++;
        },
        increasePurchaseItemQtyOfCartItemMutation(state, index){
            state.cart[index].quantity++;
        },
        decreasePurchaseItemQtyMutation(state, cartItem){
           
            if(cartItem.quantity > 1){
               cartItem.quantity--;     
            }
        },
        increaseShoppingCartCount(state){
            state.cartCount++;
        },
        removeFromCartMutation(state, item){
                state.cart.splice(item.index, 1);
                if(state.cart.length  == 0){
                    state.isDisabled = true;
                }
        },
        removeOptionFromCartItemMutation(state, option){
          
            state.cart[option.foodItemIndex].item.options.splice(option.optionIndex, 1);
        },

        calculateCartItemsTotal(state, itemsAmount){
            state.cartItemsAmount = itemsAmount;

        },

        calculateCartOptionsTotal(state, optionsAmount){
            state.cartOptionsAmount = optionsAmount;
            
        },

        calculateCartTotal(state){
            state.cartTotalAmount =  parseFloat(state.cartItemsAmount) + parseFloat(state.cartOptionsAmount);
        },
        setInitialOptionPriceMutation(state, total){
            state.cartOptionsAmount = total;
        }
    },
    actions:{
        setOrderMethodAction(context, info){
            context.commit('setOrderMethodMutation', info);
        },
        addToCartAction(context, cartItem){
            const itemInCart = context.state.cart.find(item => item.id === cartItem.id);
            const itemInCartIndex = context.state.cart.findIndex(item => item.id === cartItem.id);
            //
             if(!itemInCart){
                context.commit('addToCartMutation', cartItem);
             } else {
                context.commit('increasePurchaseItemQtyOfCartItemMutation', itemInCartIndex);
             }
        },
        removeFromCartAction(context, item){
            context.commit('removeFromCartMutation', item);
        },
        addOptionsToCartItem(context, cartItem){
          
            const itemInCart = context.state.cart.find(item => item.id === cartItem.food.id);
            const itemInCartIndex = context.state.cart.findIndex(item => item.id === cartItem.food.id);
              if(!itemInCart){
               // Not in cart
               context.commit('addToOptionsCartMutation', {option: cartItem});
              } else {
                  //Item already in cart add Options
                  context.commit('addToOptionsCartMutation', {option: cartItem.option, index: itemInCartIndex});
                  
              }
        },

        editCartItemOptions(context, cartItem){
            const itemInCart = context.state.cart.find(item => item.id === cartItem.id);
            const itemInCartIndex = context.state.cart.findIndex(item => item.id === cartItem.id);
              if(!itemInCart){
               // Not in cart
               // context.commit('addToOptionsCartMutation', {option: cartItem});
              } else {
                  //Item already in cart add Options
                  // context.commit('addToOptionsCartMutation', {option: cartItem.options, index: itemInCartIndex});
            }
            return itemInCartIndex
        },
        removeOptionFromCartItemAction(context, foodItem){
           
            const itemInCart = context.state.cart.find(item => item.id === foodItem.item.id);
            const itemInCartIndex = context.state.cart.findIndex(item => item.id === foodItem.item.id);
            const optionIndex = foodItem.index;
            context.commit('removeOptionFromCartItemMutation', { foodItemIndex: itemInCartIndex, optionIndex: optionIndex });
            return itemInCart
        },

        setInitialOptionPrice(context, options){
            let orderTotalCartOptions = 0;
            options.forEach((option)=>{
                orderTotalCartOptions += parseFloat(option.price) * 1;
            })
            context.commit('setInitialOptionPriceMutation', orderTotalCartOptions);
        },
        calculateCartItems(context){
            let orderTotalCartItems = 0;
            context.state.cart.forEach((item)=>{
                orderTotalCartItems += parseFloat(item.item.price) * parseInt(item.quantity)
            })
            context.commit('calculateCartItemsTotal', orderTotalCartItems);
        },

        calculateCartOptions(context, item){
            const itemInCartIndex = context.state.cart.findIndex(item => item.id === item.item.id);
            let orderTotalCartOptions = 0;
            context.state.cart[itemInCartIndex].item.options.forEach((option)=>{
                orderTotalCartOptions += parseFloat(option.price) * 1;
            })
            context.commit('calculateCartOptionsTotal', orderTotalCartOptions);
        },

        calculateTotalCartProducts(context){
            context.commit('calculateCartTotal');
        },

        increasePurchaseItemQtyAction(context, cartItem){
            context.commit('increasePurchaseItemQtyMutation', cartItem);
        },
        decreasePurchaseItemQtyAction(context, cartItem){
            context.commit('decreasePurchaseItemQtyMutation', cartItem);
        },

        setFilteredFoodsAction(context, foodsArr){
            context.commit('setFilteredFoodsMutation', foodsArr)
        },
        setAllFoodsAction(context, foodsArr){
            context.commit('setAllFoodsMutation', foodsArr)
        },
        setFilteredFoodsCategoriesAction(context, foodsCats){
            context.commit('setFilteredFoodsCategoriesMutation', foodsCats)
        },
        sendToFilteredCategoriesAction(context, searchValue){
            context.commit('sendToFilteredCategoriesMutation', searchValue)
        }

    },
    getters: {
        getCart(state){
            return state.cart;
        },
        getFoodOptions: (state) => (index) => {
            return state.cart[index].item.options;
        },
        getOrderTotal(state){
            return state.cartTotalAmount;
        },

        getDisabledStatus(state){
            return state.isDisabled;
        },
        getOrderMethod(state){
            return state.orderMethod;
        },
        getOrderPickUpDate(state){
            return state.pickupDate;
        },
        getOrderPickUpTime(state){
            return state.pickupTime;
        },
        getOrderDeliveryAddress(state){
            return state.deliveryAddress.text;
        },
        getFilteredFoods(state){
            return state.filteredFoods;
        },
        getSearchTerm(state){
            return state.searchValue;
        },
        getFilteredCategories(state){
            return state.filteredFoodsCategories;
        },
        getAllCategories(state){
            return state.allFoodCategories;
        }
    }
})


export default store;