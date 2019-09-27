import Api from './Api'
export default {
    getFoodCategory(id){
        return Api.get(`/menuitems/menu-item/food/${id}`);
    }

}