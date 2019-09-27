import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


const store = new Vuex.Store({
    state: {
        cart: [

        ],
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

      

    },
    mutations: {
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
                console.log(`Removing item in cart at index ${JSON.stringify(item.index)}`);
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
                console.log(`Increasing Purchase Qty on ${JSON.stringify(cartItem)}`);
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
                  console.log(`Item in cart already`)
                  context.commit('addToOptionsCartMutation', {option: cartItem.option, index: itemInCartIndex});
                  
              }
        },

        editCartItemOptions(context, cartItem){
            const itemInCart = context.state.cart.find(item => item.id === cartItem.id);
            const itemInCartIndex = context.state.cart.findIndex(item => item.id === cartItem.id);
              if(!itemInCart){
               // Not in cart
               console.log(`Item NOT IN cart Editing cart...`);
               console.log(`${JSON.stringify(cartItem, null, 2)}`);
               // context.commit('addToOptionsCartMutation', {option: cartItem});
              } else {
                  //Item already in cart add Options
                  console.log(`Item in cart Editing cart...`);
                  console.log(`${JSON.stringify(cartItem, null, 2)}`);
                  // context.commit('addToOptionsCartMutation', {option: cartItem.options, index: itemInCartIndex});
              }
        },
        removeOptionFromCartItemAction(context, foodItem){
           
            const itemInCart = context.state.cart.find(item => item.id === foodItem.item.id);
            const itemInCartIndex = context.state.cart.findIndex(item => item.id === foodItem.item.id);
            const optionIndex = foodItem.index;
            context.commit('removeOptionFromCartItemMutation', {foodItemIndex: itemInCartIndex, optionIndex: optionIndex});
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
            console.log(`Calculating ....  ${JSON.stringify(item)}`);
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
        }
    }
})


export default store;