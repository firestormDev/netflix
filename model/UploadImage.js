const multer = require('multer');

module.exports = (multer({
    storage: multer.diskStorage({
        destination:(req,res,cd) =>{
            cd(null, './public/upload/users')
        },

        filename:(req,file,cb) => {
            cd(null, Date.now().toString() + "_" +file.originalname) 
        }
        }),
    fileFilter:(req,file,cb) => {
        const extensaoImg = ['image/png', 'image/jpg', 'image/jpeg'].find(formatoAceito => formatoAceito == file.mimetype);

        if(extensaoImg){
            return cb(null,true);
        }

        return cb(null,false);
    }

}));

//const MongoClient = require('mongodb').MongoClient;

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://protomania:tinti8607@leaflix-east.dvc2t.mongodb.net/leaflix-east?retryWrites=true&w=majority";
//const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


module.exports = class UploadImage {
    static async find(busca) {        
       // const conn = await MongoClient.connect('mongodb://127.0.0.1:27017/netflixdb'),
       const conn = await MongoClient.connect('mongodb+srv://protomania:tinti8607@leaflix-east.dvc2t.mongodb.net/leaflix-east?retryWrites=true&w=majority'),

                db = conn.db();  
                
            if(busca)
                return await db.collection('postsImagens')
                .find({ image : new RegExp('^' + busca)})
                .toArray();
            
                
        return await db.collection('postsImagens').find().toArray();

    }

    static async insert (image){
        //const conn = await MongoClient.connect('mongodb://127.0.0.1:27017/netflixdb'),
        const conn = await MongoClient.connect('mongodb+srv://protomania:tinti8607@leaflix-east.dvc2t.mongodb.net/leaflix-east?retryWrites=true&w=majority'),
        db = conn.db();  
        db.collection('postsImagens').insertOne({ image : image});
        console.log(image);

    }
}


