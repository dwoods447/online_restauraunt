<template>
    <div>
        <p>Add Ons</p>
        <ul>

                <li v-for="(topping, i) in options" :key="item.item.id+'-'+i"><a href="javascript:void(0);" @click="removeCartItemOption(item, i)"><span style="font-size: 1.3em;"><i class="material-icons">delete</i></span></a>&nbsp;{{ topping.name }} &nbsp;$<span>{{ topping.price }}</span></li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ['index', 'item'],
        data(){
            return {
            }
        },
        methods: {
            removeCartItemOption(item, index){
                this.$store.dispatch('removeOptionFromCartItemAction', {item: item, index: index});
                this.$store.dispatch('calculateCartOptions',  {item: item, index: index});
                this.$store.dispatch('calculateTotalCartProducts');
            },
        },
        computed:{
            options(){
                 return this.$store.getters.getFoodOptions(this.index);
            }
        },
        watch: {
            item: {
                deep: true,
                handler(){
                  return this.$store.getters.getFoodOptions(this.index);
                }
                
            }
        }
    }
</script>

<style scoped>
span > .material-icons{
    display: inline-block;
    margin-top: 1px;
    padding-top: 1px;
}

</style>