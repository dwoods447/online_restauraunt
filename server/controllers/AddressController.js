const config = require('../config/config');
const axios = require('axios');

module.exports = {
    async lookupAddress(req, res){
        try{
            const { address } = req.params;
            const resp = await axios.get(`${config.url}/suggest?auth-id=${config.auth_id}&auth-token=${config.auth_token}&prefix=${address}`);
            const data = await resp.json();
            if(data.errors && data.errors.length > 0){
                //address not found
                res.status(404).json('Address not found');
            } else {
                //address found send response 
               // console.log(`Data: ${JSON.stringify(data)}`);
                res.status(200).json(data);
            }
        }catch(err){
            res.status(500).json({message: 'Server Error: ' + err});
        }
    }
}