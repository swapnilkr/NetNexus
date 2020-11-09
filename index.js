const express=require('express');

const app=express();

const port=8000;

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