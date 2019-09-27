import Api from './Api'

export default {
    getAddOns(categoryId){
        return Api.get(`/addons/addon/${categoryId}`);
    }
}