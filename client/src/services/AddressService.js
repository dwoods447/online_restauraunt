  
import Api from './Api'

export default {
    getAddress(address){
        return Api.post(`/address/lookup/${address}`);
    }
}