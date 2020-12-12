const mongoose=require('mongoose');

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },

    // comment belong to user
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
},{
    timestamps:true
});

const Comment=mongoose.model('comment',commentSchema);

module.exports=Comment;