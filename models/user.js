const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique: true
    },

    password:{
        type:String,
        required:true
    },

    name: {
        type:String,
        required:true
    }
},{
    timestamps:true // let us know when the user data was created and when it was last updated
});

const User=mongoose.model('User',userSchema);

module.exports=User