<template>
    <div>
        <div id="sliderComponentContainer">
                    <div style="width: 50px; display: block; position: absolute;  left:15px; top 15px;"><span style="color: #fff; font-size: 1.2em;"  @click="slideBackward()"><i class="fas fa-chevron-circle-left"></i></span></div>
            <div style="width: 50px; display: block; position: absolute;  right:15px; top 15px;"><span style="color: #fff; font-size: 1.2em;" @click="slideForward()"><i class="fas fa-chevron-circle-right"></i></span></div>
            <div class="container" id="container">
                    <div class="slider-container" id="sliderContainer" data-slide="0" style="transform: translateX(0px); width: 2000px;" ref="slideContainer"> 
                    
                    <div class="inner">
                        <div class="slider" v-for="(category, i) in categories" :key="i+'--'+category.category_name" :ref="'slide-'+i"><a :href="'#category-'+category.id" v-smooth-scroll style="color: #fff; text-decoration: underline;">{{ category.category_name }}</a></div>
                        </div> 
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
import FoodCategoryService from '../services/FoodCategoryService'
    export default {
         mounted(){
            this.getFoodCategories();
        },
        data(){
            return {
            categories:[],
            currentSlide: 0,
            }
        },
        methods:{
            async getFoodCategories(){
                const foodcategories = (await FoodCategoryService.getFoodCategories()).data;
                if(foodcategories){
                    this.categories = foodcategories;
                   // console.log(`Food Categories ${JSON.stringify(this.categories)}`);
                }
            },

            slideForward(){
                if(this.currentSlide >=  5 || this.currentSlide >=  this.categories.length ){
                    this.currentSlide = 0;
                    this.$refs.slideContainer.style.transform = "translateX("+(this.currentSlide*200)+"px)";
                    return false;
                }
                this.$refs.slideContainer.style.transform = "translateX("+-(this.currentSlide*200)+"px)";
                this.currentSlide++;
            },
            slideBackward(){
                if(this.currentSlide < 0){
                    this.currentSlide = 0;
                    this.$refs.slideContainer.style.transform = "translateX("+(this.currentSlide*200)+"px)";
                    return false;
                }
                this.$refs.slideContainer.style.transform = "translateX("+(this.currentSlide*200)+"px)";
                this.currentSlide--;
               
            }
        }
    }
</script>

<style scoped>
    #container{
        overflow: hidden;
        width: 100%;
        height: 100%;
    }
    .slider-container {
        white-space: nowrap;
        overflow: hidden;
        width: 100%;
        height: 100%;
        transition: 0.7s all ease;
    }
    .slider{
        float: left;
         width:200px;
        height: 50px;
        /* overflow: hidden; */
    }
  
   @media only screen and (max-width: 1690px){
       #sliderComponentContainer{
           display: none;
       }
   }
    /* #container::before{
        color: #ffffff;
        content: "\e251";
        top: 1.3571428571428572em;
        left: 0px;
        padding: 0;
    } */
</style>