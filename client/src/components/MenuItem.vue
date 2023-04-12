v<template>
    <div>
        <div class="row">
            <div class="col-lg-12 col-xs-12">
                <div class="row">
                <div class="col-lg-12" v-for="food in foods" :key="food.id">
                <div class="menu-item-panel">
                    <div class="row">
                        <div class="col-lg-2">
                            <div class="panel-img-container"><img :src="food.imageUrl" alt="" class="panel-img"></div>
                        </div>
                        <div class="col-lg-8">
                        <h4>{{food.item_name}}</h4>
                        <p>{{food.description}}</p>
                        </div>
                        <div class="col-lg-2">
                            <ul>
                                <li>${{ food.price }}</li>
                                <li><modal-button :foodInfo="food" :food="food.id" v-b-modal="'modal-'+food.id"></modal-button></li>
                            </ul>

                          
                        </div>
                    </div>
                   </div>
                </div>

            </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MenuItemService from '../services/MenuItemService'
    import ModalButton from '../components/ModalButton'
    export default {
        props: ['category_id'],
        components: {
          'modal-button': ModalButton
        },
        created(){

        },
        mounted(){
            this.getFoods();
          
        },
        data(){
            return {
               foods: []     
            }
        },
        methods: {
           async getFoods(){
                const foodsInFoodCategory = (await MenuItemService.getFoodCategory(this.category_id)).data;
                if(foodsInFoodCategory){
                    this.foods = foodsInFoodCategory;
                    this.$store.dispatch('setAllFoodsAction', this.foods[0]);
                }
              
           } 
        }
    }
</script>

<style scoped>
.menu-item-panel{
    border: 2px solid #ddd;
    box-shadow: 5px 5px solid #eee;
    margin: 0.1em;
    padding-top: 1em;
}
.panel-img-container{
   padding-top: 0;
}
.panel-img{
    max-width: 100%;
    margin: 5px;
}

</style>