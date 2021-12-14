const async = require('hbs/lib/async');

let http = require ('http'),
    path = require ('path'),
    express = require ('express'),
    app = express(),
    Post = require('./model/Post');  
    app.set('view engine', 'hbs');
    app.set('views', path.join(__dirname, 'view'));
    app.use(express.static(path.join(__dirname, 'public')));
    app.get(express.urlencoded({extended: false}));
    app.use(express.urlencoded({extended: false}));
    

    app.get('/home', (req, res) => {
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


    app.listen(3000);

  