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

module.exports.destroy=function(req,res){
    Comment.findById(req.params.id,function(err,comment)
    {

        // authorize , only perosn posted that comment should be able to del
        //.id means converting the object id into string
        if(comment.user == req.user.id ){

            // find post which have this comment
            let postId=comment.post;

            //remove the comment
            comment.remove();

            // update the post after del

            //$pull is syntax when we interact with mongo db terminal
            Post.findByIdAndUpdate(postId,{ $pull:{ comments:req.params.id}},function(err,post){
                return res.redirect('back');
            })

        }else{
            return res.redirect('back');
        }
    })
}