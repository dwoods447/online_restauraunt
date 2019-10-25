import Vue from 'vue'
import App from './App.vue'
import vueSmoothScroll from 'vue2-smooth-scroll'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(vueSmoothScroll);

export const eventBus = new Vue();

new Vue({
  store: store,
  router: router,
  render: h => h(App),
}).$mount('#app')
