const express=require('express');

const app=express();

const port=8000;

//adding express ejs layout
const expressLayouts=require('express-ejs-layouts'); 

//to tell our code that wehenever it encounter link tag , then put it in header
// as now the link for calling css or scripts   is in user_profile.ejs when it is called in layout.ejs
// it is called in body part of layout.ejs which is bad approach . to over come we use this approach 
// whenver code encounter link tag it tells it to put in header

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractSCripts',true);


//adding static file
app.use(express.static('./assets'));

app.use(expressLayouts); 

//use express router
//for any url check to routes
app.use('/',require('./routes'));

// to set up view engine
app.set('view engine','ejs');

// to join path
app.set('views','./views');



app.listen (port,function(err)
{
    if (err)
    {
        // console.log('Error',err);

        console.log(`Error in running the server :${err}`);
    }
    console.log(`Server running on port :${port}`);


});