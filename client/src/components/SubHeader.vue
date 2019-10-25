<template>
    <div style="width: 100%; height: 75px; background-color: #17a2b8;">
        <div class="col-lg-12">
            <div class="row">
                 <div class="col-lg-8">
                     <div class="flex-container">
                         <slider-component></slider-component>
                     </div>
                 </div>
                 <div class="col-lg-4">
                       <div style="padding: 1em;"><search-component></search-component></div>
                </div>
            </div>
        </div>
       
    </div>
</template>

<script>
import Slider from '../components/Slider'
import Search from '../components/Search'

    export default {
        components:{
            'slider-component': Slider,
            'search-component': Search
        },
        data(){
            return {

            }
        }
    }
</script>

<style scoped>
.flex-container{
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: nowrap;
  align-content: center;
  padding-top: 1.2em;
}
</style>