<template>
    <div>
        <div class="row">
            <div class="col-lg-12">
                <div role="tablist">
                    <b-card no-body class="mb-1" v-for="(category, i) in filteredCategories" :key="category.id" :id="'category-'+category.id">
                        <b-card-header header-tag="header" class="p-1" role="tab">
                            <b-button block href="#" v-b-toggle="'accordion-' + category.id" variant="info">{{ category.category_name }}</b-button>
                       </b-card-header>
                       <b-collapse :id="'accordion-'+ category.id + i" visible accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                            <menu-item :category_id="category.id"></menu-item>
                        </b-card-body>
                      </b-collapse>
                       <modal-component :category_id="category.id"></modal-component>
                    </b-card><!-- end if card-->    
                </div><!-- end of tablist -->

               

               

            </div>
        </div>
    </div>
</template>
<script>
import FoodCategoryService from '../services/FoodCategoryService'
import MenuItem from '../components/MenuItem';
import ModalComponent from '../components/ModalComponent'
export default {
    components: {
       'menu-item': MenuItem,
       'modal-component': ModalComponent
    },
    created(){

    },
    mounted(){
        this.getFoodCategories();
    },
    data(){
        
        return {
            foodCategoryIds: [],
            categories:[]
        }
    },
    methods: {
        async getFoodCategories(){
            const foodcategories = (await FoodCategoryService.getFoodCategories()).data;
            if(foodcategories){
                this.categories = foodcategories;
                this.$store.dispatch('setFilteredFoodsCategoriesAction', this.categories);
            }
        }
    },
    computed: {
        filteredCategories() {
            let categories = []
             try{
              categories = (this.$store.getters.getFilteredCategories || this.$store.getters.getAllCategories);
                 return categories;
             } catch(_){
               // fail silenty
             }

             return categories
         }
    }
}
</script>