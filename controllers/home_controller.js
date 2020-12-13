const Post = require('../models/post');


module.exports.home = function(req,res)
{
    //creating and altering a cookie
    // console.log(req.cookies);
    // res.cookie('user_id',25);


    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title:"Codeial! home",
    //         posts : posts 
    // });


    // when we were fetching post  , the post had everything 
    // content , user , mail 
    // but in home .ejs we used too show only content 
    // so now we use populate concept of mongoose

    // populate the user
    // Post.find({}).populate('user').exec(function(err,posts)
    // {
    //     return res.render('home',{
    //         title:"Codeial! home",
    //         posts : posts 
    // })

    //populate the user and comment and author of comment
    //multiple populate then we use path
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts
        });
    })
     // return res.end(`<h1>Express is up for Codeial</h1>`);


}
