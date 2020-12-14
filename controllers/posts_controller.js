const Post=require('../models/post')
const Comment=require('../models/comment');

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

module.exports.destroy=function(req,res){
    //if post exist or not
    Post.findById(req.params.id,function(err,post)
    {
        // authorize , only perosn posted that post should be able to del
        //.id means converting the object id into string
        if (post.user == req.user.id){
            post.remove();
            Comment.deleteMany({post:req.params.id},function(err)
            {
                return res.redirect('back');
            });


        }
        else{
            return res.redirect('back');
        }
    });
}