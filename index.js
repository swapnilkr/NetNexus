const express=require('express');

//get cookie parser
const cookieParser=require('cookie-parser');

const app=express();

const port=8000;

//adding express ejs layout
const expressLayouts=require('express-ejs-layouts');

//calling db
const db = require('./config/mongoose');

// used for session cookie
// express -session for using session encrypted cookie
const session = require('express-session');

// passport js
const passport = require('passport');

// startegy
const passportLocal=require('./config/passport-local-strategy');


app.use(express.urlencoded());

app.use(cookieParser());

//adding static file
app.use(express.static('./assets'));

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

// a MW which takes session cookie and encrypts it

app.use(session({
    // name of cookie
    name : 'codeial' , 
    // TODO change the secret before deployment in production mode
    // encrypted key
    secret : 'blahsomething',

    saveUninitialized:false,
    resave:false,
    cookie:{
        // in ms
        maxAge:(1000 * 60 * 100)
    }

}));

app.use(passport.initialize());

app.use(passport.session());

// whether a session cookie is present or not
// user will be stored in locals
app.use(passport.setAuthenticatedUser);

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