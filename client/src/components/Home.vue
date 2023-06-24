<template>
    <div style="width: 100%; height: 100vh; background-image: url('https://res.cloudinary.com/dpwoods/image/upload/v1569343537/restraunt-app/main.jpg');  background-repeat: no-repeat; background-size: 100%; background-position: 50% 50%;">
    <div class="flex-container">
     
        <div class="flex-container full-page" v-if="chooseOne">
                <div class="container">
                        <h2 style="margin: 0 auto; text-align: center;">Welcome to the Restaurant App</h2>
                    <div class="row">
                        <div class="col-lg-6 col-xs-12 padding-none">
                            <div class="image-container">
                                <a href="javascript:void(0);" @click="chooseMethod('delivery')"><img src="../assets/delivery.png" alt="image-one" class="choose-one"></a>
                                <h2 class="restaurant-header">Delivery</h2>
                            </div>
                            
                        </div>
                        <div class="col-lg-6 col-xs-12 padding-none">
                        <div class="image-container">
                            <a href="javascript:void(0);" @click="chooseMethod('pickup')"><img src="../assets/pickup.png" alt="image-two" class="choose-one"></a>
                             <h2 class="restaurant-header">Pickup</h2>
                        </div>
                        </div>
                    </div>
                </div>
        </div> 
        <div class="flex-container full-page" v-if="delivery">
             <h2>You Chose Delivery</h2>
            <div class="row">
                <div class="col-xs-12">
                    <div class="choose-container">
                        <label class="typo__label" for="ajax">Please Enter Your Address</label>
                        <multiselect v-model="selectedAddresses" id="ajax" label="text" track-by="text" placeholder="Enter Your Address" open-direction="bottom" :options="addresses" :multiple="false" :searchable="true" :loading="isLoading" :internal-search="false" :clear-on-select="false" :close-on-select="true" :options-limit="300" :limit="3"  :max-height="600" :show-no-results="false" :hide-selected="true"  @search-change="asyncFind" disabled>
                            <template slot="tag" slot-scope="{ option, remove }"><span class="custom__tag"><span>{{ option.text }}</span><span class="custom__remove" @click="remove(option)">❌</span></span></template>
                            <template slot="clear" slot-scope="props">
                            <div class="multiselect__clear" v-if="selectedAddresses.length" @mousedown.prevent.stop="clearAll(props.search)"></div>
                            </template><span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
                        </multiselect>
                       <span style="color:white"> This feature is unavailable. Sorry for the inconvience.</span>
                    </div>
                    <button class="btn btn-danger btn-custom" @click="selectedAddress()"><router-link :to="{name: 'menu'}">Back</router-link></button>
                </div>
                <!-- <pre class="language-json"><code>{{ selectedAddresses  }}</code></pre> -->
            </div>
            <a href="javascript:void(0);" @click="chooseMethod('pickup')" class="alternate-delivery"><p>Want to pick up instead?</p></a>
        </div>
        <div class="flex-container full-page" v-if="pickup">
            <h2>You Chose Pickup</h2>
            <div class="choose-container">
                <div class="row">
                    <div class="col-lg-6 col-xs-12">
                    <button class="btn btn-danger btn-custom" @click="choosePickUpTime('now')">Now</button>
                    </div>
                    <div class="col-lg-6 col-xs-12">
                    <button class="btn btn-danger btn-custom" @click="choosePickUpTime('later')">Later</button>
                    </div>
                </div>
            </div>
          
             <a href="javascript:void(0);" @click="chooseMethod('delivery')" class="alternate-delivery"><p>Want to deliver instead?</p></a>
        </div>

        <div class="flex-container full-page" v-if="pickupNow">
            <div class="choose-container">
                <div>
                    <p>Minimum Order Amount : $ 8</p>
                    <p>Estimated Time : 45 minutes</p>
                </div>
                  <router-link :to="{name: 'menu'}"><button class="btn btn-danger btn-custom">Order</button></router-link>
            </div>
        </div>
        <div class="flex-container full-page" v-if="pickupLater">
             <div class="choose-container">
                 <div class="row">
                     <div class="col-lg-6">
                         <label>Pick A Date</label>
                         <date-picker v-model="date" :config="options"  :selected="setDate(date)"></date-picker>
                     </div>
                      <div class="col-lg-6">
                          <label>Pick A Time</label>
                          <select name="hours" id="hours" v-model="hours" class="form-control" @change="setHours(hours)">
                              <option value=""></option>
                              <option v-for="hourOfOperation in hoursOfoperation" :key="hourOfOperation">{{ hourOfOperation }}</option>
                          </select>
                     </div>
                 </div>
                
                  
             </div>
              <div class="row">
                     <div class="col-xs-12">
                        <div class="choose-container">
                              <router-link :to="{name: 'menu'}" ><button class="btn btn-danger btn-custom" @click="pickupOrderMethod()">Order</button></router-link>
                        </div>
                     </div>
                 </div>
        </div>

     </div> 
    </div>
</template>
<script>
import Multiselect from 'vue-multiselect'
import AddressService from '../services/AddressService'
import datePicker from 'vue-bootstrap-datetimepicker';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
import moment from 'moment'

export default {
    components: { Multiselect, datePicker },
    mounted(){
    },
    data(){
        return {
            date: new Date(),
            chooseOne: true,
            delivery: false,
            pickup: false,
            pickupNow: false,
            pickupLater: false,
            selectedAddresses: [],
            isLoading: false,
            addresses: [],
            hours: '',
            hoursOfoperation: [
                '8:00 am',
                '9:00 am',
                '10:00 am',
                '11:00 am',
                '12:00 pm',
                '1:00 pm',
                '2:00 pm',
                '5:00 pm',
                '6:00 pm',
                '7:00 pm',
                '8:00 pm',
            ],
             options: {
                format: 'MM/DD/YYYY',
                useCurrent: false,
            },
           
        }
    },
    methods:{
        selectedAddress(){
           //console.log('Selected Delivery');
           if(this.selectedAddresses){
            this.$store.dispatch('setOrderMethodAction', {method: 'delivery', address: this.selectedAddresses});
           }
           
        },
        chooseMethod(choice){
            if(choice == 'pickup'){
                this.pickup = true;
                this.delivery = false;
                this.chooseOne = false;
               
            }
            if(choice == 'delivery'){
                this.delivery = true;
                this.pickup = false;
                this.chooseOne = false;
               
            }
        },

        choosePickUpTime(choice){
            if(choice == 'now'){
                this.pickup = false;
                this.pickupLater = false;
                this.pickupNow = true;
                let today = new Date();
                let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                time =  moment(time, 'h:mm a');
                time.toString()
                time =  moment(time, 'h:mm a').add(45, 'm');
                time.toString();
                this.$store.dispatch('setOrderMethodAction', {method: 'pickup', pickupTime: time, pickupDate: today});
            }
            if(choice == 'later'){
                this.pickup = false;
                this.pickupNow = false;
                this.pickupLater = true;
                 
            }
        },
        async asyncFind(query){
            this.isLoading = true;
            if(query.length > 16){
                const addresses = (await AddressService.getAddress(query)).data.suggestions;
                if(addresses !== null){
                    this.addresses = addresses;
                }
            }
        },

        pickupOrderMethod(){
            this.$store.dispatch('setOrderMethodAction', {method: 'pickup', pickupTime: this.hours, pickupDate: this.date});
        },

        setHours(hours){
            this.setHours = moment(hours, 'h:mm a').format('h:mm a');    
        },

        setDate(date){
            this.date = date;
        }
    }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.flex-container{
    display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;
     flex-wrap: nowrap;
}
.flex-container h2{
    color: #fff;
}
.full-page{
    width: 100%; 
    height: 100vh;
    
}
.image-container{
    width: 400px;
    height: 400px;
    margin: 0 auto;
}

 .choose-one{
     width: 90%;
     display: block;
     margin: 20px auto;
     border: 2px solid #ddd;
     background-color: #ddd;
 }
 .padding-none{
    padding-right:0;
    padding-left:0;
}
.btn-custom{
    width: 98%;
    margin: 5px;
}
.btn-custom > a, label{
    color: #fff;
}
.restaurant-header{
    margin: 15px auto;
    text-align: center;
}
.choose-container{
  min-width: 400px;
  max-width: 900px; 
  margin: 5px;
}
.choose-container p {
    color: #fff;
}
.alternate-delivery{
    color: #fff;
    font-size: 1.1em;
    font-weight: 600;
}
</style>