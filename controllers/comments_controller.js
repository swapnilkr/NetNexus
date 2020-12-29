const Comment=require('../models/comment');


// we need to export post too bec
// to create a comment over post we need to find whether post exist or not
// and user does not play with post id  
// we find post with post id and then create the comment

const Post=require('../models/post');

const commentsMailer = require('../mailers/comments_mailer');

const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');

const Like = require('../models/like');

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

            // Similar for comments to fetch the user's id!
            // populating user
            comment = await comment.populate('user', 'name email').execPopulate();

            // to send mail whenever comment is made
            // since we using KUE , it will be taken care by KUE
            // commentsMailer.newComment(comment);

            let job = queue.create('emails',comment).save(function(err){
                if(err){
                    console.log('error in creating a queue');
                }

                console.log('job enqueued', job.id);
            });



            if (req.xhr){
                
                
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }

            req.flash('success' , 'Comments Added  !');

            res.redirect('/');
        }
    } catch (err) {
        // flash message
        req.flash('error' , err);

        // console.log('Error', err);
        return res.redirect('back');
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

                
                // update the post after delete of comment from databse
                
                //$pull is syntax when we interact with mongo db terminal
                
                let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

                // destroy tge associated like for this comment
                await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

                // send the comment id which was deleted back to the views
                if (req.xhr){
                    return res.status(200).json({
                        data: {
                            comment_id: req.params.id
                        },
                        message: "Post deleted"
                    });
                }
    
    
                req.flash('success', 'Comment deleted!');
    
                return res.redirect('back');

            }else{
                req.flash('error' , 'You cannot delete this comment !');
                return res.redirect('back');
            }

    } catch (err) {
        // flash message
        req.flash('error' , err);

        // console.log('Error', err);
        return res.redirect('back');
    }
    


}