const { json } = require('express/lib/response');
const async = require('hbs/lib/async');
const multer = require('multer');



let http = require ('http'),
    path = require ('path'),
    express = require ('express'),
    app = express(),
    UploadImage = require('./model/UploadImage'),
    Post = require('./model/Post');  
    app.set('view engine', 'hbs');
    app.set('views', path.join(__dirname, 'view'));
    app.use(express.static(path.join(__dirname, 'public')));
    app.get(express.urlencoded({extended: false}));
    app.use(express.urlencoded({extended: false}));
    

    app.get('/', (req, res) => {
        res.render('home', { title: 'Página inicial'});
    });

    app.get('/login', (req, res) => {
        res.render('login', { title: 'Página de Login'});
    });
    app.get('/cadastro', (req, res) => {
        res.render('cadastro', { title: 'Página de cadastro'});
    });
    

    app.get('/mensagem_get', (req, res) => {
        let msg = req.query.mensagem;
        console.log(msg);
        res.end();
    });
    app.post('/mensagem_get', (req, res) => {
        let msg = req.body.mensagem;
        console.log(msg);
        res.end();
    });
  
  
    app.get('/posts', async (req, res) => {
        const busca =  req.query.busca; 
        const posts = await Post.find(busca);         
       // console.log(busca);       
        res.render('posts', { posts: posts});
    });

    app.post('/posts', async (req, res) => {
        const content = req.body.content;
        Post.insert(content);   
        res.redirect('posts');
    });

    app.get('/postsImagens', async (req, res) => {
        const busca =  req.query.busca; 
        const postsImagens = await UploadImage.find(busca);         
       // console.log(busca);       
        res.render('postsImagens',{postsImagens : postsImagens});
    });
    /*app.post('/postsImagens', UploadImage.insert('image'), async (req, res) => {
        if(req.file){
            return res.json({
                erro: false,
                mensagem: "Upload Realizado Com Sucesso"
            });
        }
        return res.status(400).json({
            erro: true,
            mensagem: "Upload Não Realizado Com Sucesso"
        }); 
        /*UploadImage.insert(image); 
        res.redirect('postsImagens'); */

        app.post('/postsImages',  async (req, res) => {
            const image = req.body.image;
            UploadImage.insert(image);   
            res.redirect('postsImagens');
        });  

    
            
   


    //app.listen(3000);
    app.listen(process.env.PORT);

  
