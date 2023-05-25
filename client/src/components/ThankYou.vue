<template>
    <div>
        <div class="container" style="max-width: 85%; position: relative; padding: 1em;">
               <div class="row">
                <div class="col-lg-12">
                    <p>Thank you <span>{{ orderObj.customer.firstname }}</span> for placing your order.</p>
                     <p><router-link :to="{name: 'home'}">Back to home</router-link></p>
                </div>
              </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted(){
            this.orderObj = this.$route.params.order;
        },
        data(){
            return {
               orderObj: {}
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>