const Post=require('../models/post')
const Comment=require('../models/comment');



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
        await Post.create({
            content: req.body.content,
            // this user id is used later to find which person posted the resp post
            user: req.user._id


        });

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
            post.remove();
            await Comment.deleteMany({ post: req.params.id });

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