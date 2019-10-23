import Api from '../services/Api'


export default {
    createOrder(order){
        return Api.post('/orders/order/create', order);
    },
    getAllOrders(){
        return  Api.get('/orders/find/all');
    },
    getOrderWithId(id){
        return  Api.get(`/orders/order/find/${id}`, id);
    }
}