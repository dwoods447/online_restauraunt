import Api from './Api'

export default {
    getFoodCategories(){
        return Api.get(`/categories/food-categories/all`);
    },
   
}