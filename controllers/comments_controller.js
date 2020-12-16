const Comment=require('../models/comment');


// we need to export post too bec
// to create a comment over post we need to find whether post exist or not
// and user does not play with post id  
// we find post with post id and then create the comment

const Post=require('../models/post');



// without asyn await
// module.exports.create=function(req,res){
//     Post.findById(req.body.post,function(err,post){
//         if(post){
//             Comment.create({
//                 content:req.body.content,
//                 post:req.body.post,
//                 user:req.user._id
//             },function(err,comment)
//             {
//                 // handle error


//                 //after updating we need to save it
//                 post.comments.push(comment);
//                 post.save();

//                 res.redirect('/');
//             });
//         }
//     })

// }

// module.exports.destroy=function(req,res){
//     Comment.findById(req.params.id,function(err,comment)
//     {

//         // console.log(req.user.id);
//         // console.log(comment.user);
//         // console.log(comment.post.user);
//         // console.log(comment.post);


//         // find post which have this comment
//         let postId=comment.post;
//         Post.findById(postId,function(err,post){

        

//             // authorize , only perosn posted that comment should be able to del and the person who posted that post
//             //.id means converting the object id into string

//             if(comment.user == req.user.id || req.user.id == post.user){

            
//                 //remove the comment
//                 comment.remove();

//                 // update the post after del

//                 //$pull is syntax when we interact with mongo db terminal
//                 Post.findByIdAndUpdate(postId,{ $pull:{ comments:req.params.id}},function(err,post){
//                     return res.redirect('back');
//                 })

//             }else{
//                 return res.redirect('back');
//             }
//         });
//     })
// }





//with asyn await

module.exports.create = async function (req, res) {
    try {

        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id

            });



            //after updating we need to save it
            post.comments.push(comment);
            post.save();

            res.redirect('/');
        }
    } catch (err) {
        console.log('Error', err);
        return;
    }

}

module.exports.destroy=async function(req,res){

    try { 
        let comment = await Comment.findById(req.params.id);
    
        // find post which have this comment
        let postId=comment.post;
        let post = await Post.findById(postId);

        

            // authorize , only perosn posted that comment should be able to del and the person who posted that post
            //.id means converting the object id into string

            if(comment.user == req.user.id || req.user.id == post.user){

            
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

    } catch (err) {
        console.log('Error', err);
        return;
    }
    


}