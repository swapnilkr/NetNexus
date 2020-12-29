const Like = require('../models/like');

const Comment = require('../models/comment');

const Post = require('../models/post');

module.exports.toggleLike = async function(req,res){

    try{

        // our url be like
        // likes/toggle/?id=abcdef&type=Post 

        let likeable;

        // deleted serve the purpose where likes dont go negative
        let deleted = false;


        // if post or comment is liked
        if (req.query.type == 'Post' ){
            likeable = await Post.findById(req.query.id).populate('likes');

        } else { 
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        // check is like already exists

        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        })
        
        // if a like already exist del it
        if (existingLike){

            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.remove();

            deleted = true;

        } else {

            // else make a new like

            let newLike = await Like.create({

                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });

            // push like in array
            likeable.likes.push(newLike._id);
            likeable.save();

        }

        return res.json(200, {
            message: "Request successful",
            data: {
                deleted: deleted
            }
        })

    } catch(err) {
        console.log(err);

        return res.json(500,{
            message: 'Internal Server Error'
        });
    }
}