const { json } = require('express/lib/response');
const async = require('hbs/lib/async');
const multer = require('multer');

let http = require ('http');
let path = require ('path');
let express = require ('express');
const session = require('express-session');
const { flash } = require('express-flash-message');

let app = express();
let UploadImage = require('./model/UploadImage');
let Post = require('./model/Post');  

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.static(path.join(__dirname, 'public')));
app.get(express.urlencoded({extended: false}));
app.use(express.urlencoded({extended: false}));

app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        },
    })
    );
    
    // apply express-flash-message middleware
app.use(flash({ sessionKeyName: 'flashMessage' }));

app.get('/', (req, res) => {
    res.render('home', { title: 'Página inicial'});
});

app.get('/login', (req, res) => {
    res.render('login', { title: 'Página de Login'});
});
app.get('/cadastro', (req, res) => {
    res.render('cadastro', { title: 'Página de cadastro'});
});
app.get('/post', (req, res) => {
    res.render('post', { title: 'Página de post'});
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
    res.render('posts', { posts: posts});
});

app.post('/posts', async (req, res) => {
    const content = req.body.content;
    Post.insert(content);   
    res.redirect('posts');
});

app.get('/postsImagens', async (req, res) => {

    const messages = await req.consumeFlash('info');

    const busca =  req.query.busca;
    const postsImagens = await UploadImage.find(busca);              
    res.render('postsImagens',{postsImagens : postsImagens, messages});        
});


app.post('/postsImagens', UploadImage.image, async (req, res) => {

    if(typeof(req.files.image) !== 'undefined' ){
        UploadImage.insert(req.files.image[0].filename);
    }

    res.redirect('postsImagens'); 
    
});  


// app.listen(3000); // dev
app.listen(process.env.PORT); //production

  
