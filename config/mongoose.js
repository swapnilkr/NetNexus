//req the library
const mongoose=require('mongoose');
const env = require('./environment')

// connect to database
mongoose.connect(`mongodb://localhost/${env.db}`);

// acquire the connection (to check if its successful)
const db=mongoose.connection;

// error
db.once('error',console.error.bind(console,"Error connecting to Mongodb"));

// up and running then print the message
db.once('open',function()
{
    console.log('connected to Database :: MongoDb');
});

module.exports=db;