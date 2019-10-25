<template>
    <div>
        <menu-header></menu-header>
        <div class="container-fluid" style="padding: 0; margin: 0;">
            <sub-header></sub-header>
        </div>
        <div class="container" style="max-width: 85%; position: relative; padding: 1em;">
                <div class="row">
                    <div class="col-lg-8 col-xs-12">
                    <food-category></food-category>
                    </div>
                    <div class="col-lg-4 col-xs-12">
                    <shopping-cart></shopping-cart>
                    </div>
                </div>
        </div>
    </div>
</template>
<script>
import FoodCategory from '../components/Food-Category'
import Cart from '../components/Cart'
import Header from '../components/Header'
import SubHeader from '../components/SubHeader'
export default {
    components:{
       'food-category': FoodCategory,
       'shopping-cart': Cart,
       'menu-header': Header,
       'sub-header': SubHeader
    },
    mounted(){
          if(this.$store.state.orderMethod  == ''){
                this.$router.push({name: 'home'});
            }
    },
    data(){
        return {
            
        }
    },
}
</script>
<style>
 ul{
     list-style-type: none;
 }
</style>