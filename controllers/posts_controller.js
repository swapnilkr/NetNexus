const Post=require('../models/post')


module.exports.create=function(req,res)
{
    Post.create({
        content:req.body.content,
        // this user id is used later to find which person posted the resp post
        user: req.user._id

    },function(err,post){
        if(err)
        {
            console.log('error in creating a post');
            return;
        }
        return res.redirect('back');
    });
}