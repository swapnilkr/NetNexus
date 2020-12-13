const Comment=require('../models/comment');


// we need to export post too bec
// to create a comment over post we need to find whether post exist or not
// and user does not play with post id  
// we find post with post id and then create the comment

const Post=require('../models/post');

module.exports.create=function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            },function(err,comment)
            {
                // handle error


                //after updating we need to save it
                post.comments.push(comment);
                post.save();

                res.redirect('/');
            });
        }
    })

}