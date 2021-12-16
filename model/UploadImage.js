const multer = require("multer");

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://protomania:tinti8607@leaflix-east.dvc2t.mongodb.net/leaflix-east?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  client.close();
});

class UploadImage {

       async find(busca) {        
       //const conn = await MongoClient.connect('mongodb://127.0.0.1:27017/netflixdb'),
       const conn = await MongoClient.connect('mongodb+srv://protomania:tinti8607@leaflix-east.dvc2t.mongodb.net/leaflix-east?retryWrites=true&w=majority'),

            db = conn.db();  
                
            if(busca)
                return await db.collection('postsImagens')
                .find({ image : new RegExp('^' + busca)})
                .toArray();
            
        return await db.collection('postsImagens').find().toArray();

    }

    async insert (image){

        //const conn = await MongoClient.connect('mongodb://127.0.0.1:27017/netflixdb'),
        const conn = await MongoClient.connect('mongodb+srv://protomania:tinti8607@leaflix-east.dvc2t.mongodb.net/leaflix-east?retryWrites=true&w=majority'),
        db = conn.db();  
        db.collection('postsImagens').insertOne({ image : image});
        console.log(image);

    }

    //uploadFile
    async image(req, res, next) {

        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, "public/upload/users/");
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname);
            }
        });
        const upload = multer({
            storage,
            fileFilter: function (req, file, cb) {
                const allowedMimes = [
                    'image/jpeg',
                    'image/jpg',
                    'image/png',
                    'image/gif',
                    'video/mp4'
                ];
                if (allowedMimes.includes(file.mimetype)) {
                    cb(null, true);
                } else {
                    cb('O formato do arquivo é inválido! Arquivos permitidos: jpeg, jpg, png, gif e mp4');
                }
            }
        }).fields([{ name: 'image', maxCount: 1 }]);


        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                req.flash('info', err);
            } else if (err) {
                req.flash('info', err);
            }
            next()
        })

    } //uploadFile

}
module.exports = new UploadImage();