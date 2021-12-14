const MongoClient = require('mongodb').MongoClient;

module.exports = class Post {
    static async find(busca) {        
        const conn = await MongoClient.connect('mongodb://127.0.0.1:27017/netflixdb'),
                db = conn.db();  
                
            if(busca)
                return await db.collection('posts')
                .find({ content : new RegExp('^' + busca)})
                .toArray();
            
                
        return await db.collection('posts').find().toArray();

    }

    static async insert (content){
        const conn = await MongoClient.connect('mongodb://127.0.0.1:27017/netflixdb'),
        db = conn.db();  
        db.collection('posts').insertOne({ content : content});
        console.log(content);

    }
}