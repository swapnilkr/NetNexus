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
    Post.find({}).populate('user').exec(function(err,posts)
    {
        return res.render('home',{
            title:"Codeial! home",
            posts : posts 
    })


 // return res.end(`<h1>Express is up for Codeial</h1>`);
 
 });
}