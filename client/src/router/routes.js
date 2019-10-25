import Home from '../components/Home'
import Menu from '../components/Menu.vue'
import CheckOut from '../components/CheckOut.vue'
import ThankYou from '../components/ThankYou.vue'
const routes = [
    {path:'/', component: Home, name:'home'},
    {path:'/menu', component: Menu, name:'menu'},
    {path: '/checkout', component: CheckOut, name: 'checkout'},
    {path: '/thankyou', component: ThankYou, name: 'thankyou'}
];



export default routes;