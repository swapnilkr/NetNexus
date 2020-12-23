const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req,res){
    

    // populate tge user of each post
    let posts = await Post.find({})
    //sort to show the item published latest first
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        }); 


    return res.json(200,{
        message : "List of posts",
        posts : posts
    })
}





module.exports.destroy = async function (req, res) {

    try {
        //if post exist or not
        let post = await Post.findById(req.params.id);
        // authorize , only perosn posted that post should be able to del
        //.id means converting the object id into string
        if (post.user == req.user.id) {

            post.remove();
            await Comment.deleteMany({ post: req.params.id });



            return res.json(200,{
                message : "Post and associated comments deleted successfully!"
            })
        
        } else {
            return res.json(401,{
                message : "You cannot delete this post !"
            });
            
        }
    } catch (err) {
        console.log(err);
        return res.json(500,{
            message : "Internal Server Error"
        })
    }

}