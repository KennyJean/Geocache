const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
let isConnected;


const userName = 'KennyJean';


const DB_URL = `mongodb+srv://KennyJean:Daodao123.@cluster0.qp41g.mongodb.net/test?retryWrites=true&w=majority`;
//const DB_URL = `mongodb://KennyJean:Daodao123.@cluster0-shard-00-00.qp41g.mongodb.net:27017,cluster0-shard-00-01.qp41g.mongodb.net:27017,cluster0-shard-00-02.qp41g.mongodb.net:27017/test?replicaSet=atlas-zu5f6o-shard-0&ssl=true&authSource=admin`

const connectToDatabase = () => {
    if (isConnected) {
        console.log('Use existing database connection.');
        return Promise.resolve();
    }
    console.log('Using new database connection.')
    return mongoose.connect(DB_URL, { useNewUrlParser: true }).then(db => {
        isConnected = db.connections[0].readyState;
    });
}

module.exports = connectToDatabase;