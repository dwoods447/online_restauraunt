<template>
<div>
    <button class="btn btn-primary" @click="$bvModal.show('modal-'+ food)">Add</button>
    <div>
       

    </div>
</div>
</template>
<script>
export default {
    props: ['category_id', 'food', 'foodInfo'],
    created(){
    },
    data(){
        return {

        }
    },
    methods: {
          
    },
    computed: {
        
    }
}
</script>
