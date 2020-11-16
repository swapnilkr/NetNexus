const express=require('express');

const app=express();

const port=8000;

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