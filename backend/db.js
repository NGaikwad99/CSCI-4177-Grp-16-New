const {MongoClient} = require('mongodb');
const atlas_connection_string = 'mongodb+srv://admin2:6rORMnrxCGNqD4uT@ssdata.tcuzl0t.mongodb.net/?retryWrites=true&w=majority&appName=ssdata';

let mongoClient;

async function databaseConnection() {
    try{
        mongoClient = await MongoClient.connect(atlas_connection_string, {useNewUrlParser: true, useUnifiedTopology: true});
        return mongoClient.db('safespace');
    } catch(err){
        console.error('Error connecting to MongoDB instance', e.message);
    }
}

function getDatabase() {
    if(!mongoClient){
        console.log('Database is not connected');
    }
    return mongoClient.db('safespace');
}

module.exports = {databaseConnection, getDatabase};

