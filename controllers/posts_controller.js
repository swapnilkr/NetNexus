const Post=require('../models/post')
const Comment=require('../models/comment');
const Like = require('../models/like');


// // one level of call back so we dont need asyn await
// module.exports.create=function(req,res)
// {
//     Post.create({
//         content:req.body.content,
//         // this user id is used later to find which person posted the resp post
//         user: req.user._id

//     },function(err,post){
//         if(err)
//         {
//             console.log('error in creating a post');
//             return;
//         }
//         return res.redirect('back');
//     });
// }

// // here we neeed asyn await as callback bested
// module.exports.destroy=function(req,res){
//     //if post exist or not
//     Post.findById(req.params.id,function(err,post)
//     {
//         // authorize , only perosn posted that post should be able to del
//         //.id means converting the object id into string
//         if (post.user == req.user.id){
//             post.remove();
//             Comment.deleteMany({post:req.params.id},function(err)
//             {
//                 return res.redirect('back');
//             });


//         }
//         else{
//             return res.redirect('back');
//         }
//     });
// }



// using asyn await
module.exports.create=async function(req,res)
{
    try {
        let post = await Post.create({
            content: req.body.content,
            // this user id is used later to find which person posted the resp post
            user: req.user._id


        });

        if (req.xhr){
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            post = await post.populate('user', 'name').execPopulate();
            
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }
        
        req.flash('success' , 'Post published !');

        return res.redirect('back');
    } catch (err) {

        req.flash('error' , err);
        // console.log('Error', err);
        return res.redirect('back');

    }
    
}

module.exports.destroy = async function (req, res) {

    try {
        //if post exist or not
        let post = await Post.findById(req.params.id);
        // authorize , only perosn posted that post should be able to del
        //.id means converting the object id into string
        if (post.user == req.user.id) {

            // delete the associated likes for the post and all its comments like too
            await Like.deleteMany({likeable: post ,onModel: 'Post'});
            await Like.deleteMany({_id: {$in: post.comments}});

            post.remove();
            await Comment.deleteMany({ post: req.params.id });

            if (req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }



            req.flash('success' , 'Post and associated comments deleted  !');
            return res.redirect('back');
        }
        else {

            req.flash('error' , 'You cannot delete this post !');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error' , err);
        // console.log('Error', err);
        return res.redirect('back');
    }

}