const Post = require('../models/post');


module.exports.home = function(req,res)
{
    //creating and altering a cookie
    // console.log(req.cookies);
    // res.cookie('user_id',25);

    Post.find({},function(err,posts){
        return res.render('home',{
            title:"Codeial! home",
            posts : posts
    });



 // return res.end(`<h1>Express is up for Codeial</h1>`);
 
 });
}