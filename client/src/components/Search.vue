<template>
    <div>
        <div class="col-lg-9">
             <b-form-input  placeholder="Search Food Category" v-model="searchTerm"></b-form-input>
        </div>
    </div>
</template>

<script>
import { mapGetters} from 'vuex'
    export default {
        mounted(){
               
        },
        data(){
            return {
            }
        },

        computed:{
            searchTerm: {
                get(){
                  return this.$store.state.searchValue;    
                },
                set(value){
                    this.$store.dispatch('sendToFilteredCategoriesAction', value)
                }
            },

            ...mapGetters([
                'getSearchTerm'
            ])
        }
    }
</script>

<style scoped>

</style>