<template>
    <div>
        <div class="container-fluid" style="padding: 0;">
            <div>
                <b-card
                    overlay
                    img-src="https://res.cloudinary.com/dpwoods/image/upload/v1569335809/restraunt-app/header-image-small.jpg"
                    img-alt="Card Image"
                    text-variant="white"
                    title="Restauraunt"
                >
                    <b-card-text>
                    123 Sesame St<br/>
                    New York, NY 10508
                    <br/>
                    <br/>
                    Order Method: <span style="text-transform: capitalize;">{{ this.$store.state.orderMethod }}</span>
                    <br/>
                    <span style="text-transform: capitalize;" v-if="this.$store.state.orderMethod == 'delivery'">Delivery Address: {{ this.$store.state.deliveryAddress.text}}</span>
                    <span v-if="this.$store.state.orderMethod == 'pickup'">Order will be Ready On! -  {{ this.$store.state.pickupDate | dateFilter}} at {{ this.$store.state.pickupTime | timeFilter }}</span>
                    </b-card-text>
                    
                </b-card>
            
                <div class="row">
                    <div class="col-lg-9">
                            
                    </div>
                    <div class="col-lg-3">

                    </div>
                 </div><!-- end of slider row -->

            </div>
        
        </div>
    </div>
</template>

<script>
import moment from 'moment'
    export default {
        data(){
            return {
                publicPath: process.env.BASE_URL
            }
        },
        filters: {
            dateFilter(date){
                return moment(date, 'MM/DD/YY').format('MMMM Do YYYY');
            },
            timeFilter(time){
               return moment(time, 'h:mm a').format('h:mm a');
            }
        }
    }
</script>

<style scoped>

</style>