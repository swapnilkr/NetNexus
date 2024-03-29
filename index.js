const express = require('express');

// accessing env file
const env = require('./config/environment');

// adding morgan for log
const logger = require('morgan');

const rfs = require('rotating-file-stream')

const path = require('path');

//get cookie parser
const cookieParser = require('cookie-parser');

const app = express();

require('./config/view-helpers')(app);

const port = 8000;

//adding express ejs layout
const expressLayouts = require('express-ejs-layouts');

//calling db
const db = require('./config/mongoose');

// used for session cookie
// express -session for using session encrypted cookie
const session = require('express-session');

// passport js
const passport = require('passport');

// startegy for passport
const passportLocal = require('./config/passport-local-strategy');
const passportJwt = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

// require mongo store
const MongoStore = require('connect-mongo')(session);

//require sass Mw
const sassMiddleware = require('node-sass-middleware');

// for flash message
const flash = require('connect-flash');

// MW for converting
const custoMware =  require('./config/middleware');



// import socket io and diff http as web socket not run in http
// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');


// for kui gui
var kue = require('kue');
kue.createQueue();
kue.app.listen(3000);

if (env.name == 'development'){
    // MW to convert sass into css beofore server restarts
    app.use(sassMiddleware({
        src: path.join(__dirname, env.asset_path, '/scss'),
        dest:path.join(__dirname, env.asset_path, '/css'),
        debug:true,
        outputStyle : 'extended',
        prefix: '/css'
    }));
}

app.use(express.urlencoded({extended: false}));

app.use(cookieParser());

//adding static file
app.use(express.static(env.asset_path));

// for avatar
// make the uploads path available to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));

// using logger
app.use(logger(env.morgan.mode, env.morgan.options));


//to tell our code that wehenever it encounter link tag , then put it in header
// as now the link for calling css or scripts   is in user_profile.ejs when it is called in layout.ejs
// it is called in body part of layout.ejs which is bad approach . to over come we use this approach 
// whenver code encounter link tag it tells it to put in header

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.use(expressLayouts); 


// to set up view engine
app.set('view engine','ejs');

// to join path
app.set('views','./views');

// mongo store is used to store the session cookie in the db

// a MW which takes session cookie and encrypts it
app.use(session({
    // name of cookie
    name : 'codeial' , 
    // TODO change the secret before deployment in production mode
    // encrypted key
    secret : env.session_cookie_key,

    saveUninitialized:false,
    resave:false,
    cookie:{
        // in ms
        maxAge:(1000 * 60 * 100)
    },
    store : new MongoStore({
        
            mongooseConnection : db ,
            autoRemove : 'disabled'
        
    },
    function(err)
    {
        console.log(err || 'connect-mongodb setup ok');
    }
    )
}));

app.use(passport.initialize());

app.use(passport.session());

// whether a session cookie is present or not
// user will be stored in locals
app.use(passport.setAuthenticatedUser);

// just where session is used we set up flash-message
//as flash message stores in session cookie
app.use(flash());

app.use(custoMware.setflash);

//use express router
//for any url check to routes
app.use('/',require('./routes'));


app.listen (port,function(err)
{
    if (err)
    {
        // console.log('Error',err);

        console.log(`Error in running the server :${err}`);
    }
    console.log(`Server running on port :${port}`);


});