//const MongoClient = require('mongodb').MongoClient;

const { MongoClient } = require('mongodb');
//const uri = "mongodb+srv://protomania:<tinti8607>@leaflix-east.dvc2t.mongodb.net/leaflix-east?retryWrites=true&w=majority";
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


module.exports = class Post {
    static async find(busca) {        
       // const conn = await MongoClient.connect('mongodb://127.0.0.1:27017/netflixdb'),
       const conn = await MongoClient.connect('mongodb+srv://protomania:tinti8607@leaflix-east.dvc2t.mongodb.net/leaflix-east?retryWrites=true&w=majority'),

       
                db = conn.db();  
                
            if(busca)
                return await db.collection('posts')
                .find({ content : new RegExp('^' + busca)})
                .toArray();
            
                
        return await db.collection('posts').find().toArray();

    }

    static async insert (content){
        //const conn = await MongoClient.connect('mongodb://127.0.0.1:27017/netflixdb'),
        const conn = await MongoClient.connect('mongodb+srv://protomania:tinti8607@leaflix-east.dvc2t.mongodb.net/leaflix-east?retryWrites=true&w=majority'),
        db = conn.db();  
        db.collection('posts').insertOne({ content : content});
        console.log(content);

    }
}


