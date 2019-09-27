const mongodb = require('mongodb');
const MongoClient =  mongodb.MongoClient;
let uri = "mongodb+srv://dpwoods:pimpjuice@cluster0-jbbzh.mongodb.net/test?retryWrites=true&w=majority";
uri  = encodeURI(uri);
let _db;
new MongoClient(uri, { useNewUrlParser: true });
const mongoConnect = callback => {
    MongoClient.connect(uri)
        .then(client => {
            console.log('Database connection established!');
            callback();
            _db = client.db('restraunt-app');
        }).catch(err => {
            console.log(err);
            throw err;
        });
};

const getDb = () => {
    if(_db){
        return _db;
    }
    throw 'No database detected';
}




module.exports.mongoConnect = mongoConnect;
module.exports.getDb = getDb;

