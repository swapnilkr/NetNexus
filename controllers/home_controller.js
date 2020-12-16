const Post = require('../models/post');

const User=require('../models/user');




//without asyn await


// module.exports.home = function(req,res)
// {
//     //creating and altering a cookie
//     // console.log(req.cookies);
//     // res.cookie('user_id',25);


//     // Post.find({},function(err,posts){
//     //     return res.render('home',{
//     //         title:"Codeial! home",
//     //         posts : posts 
//     // });


//     // when we were fetching post  , the post had everything 
//     // content , user , mail 
//     // but in home .ejs we used too show only content 
//     // so now we use populate concept of mongoose

//     // populate the user
//     // Post.find({}).populate('user').exec(function(err,posts)
//     // {
//     //     return res.render('home',{
//     //         title:"Codeial! home",
//     //         posts : posts 
//     // })

//     //populate the user and comment and author of comment
//     //multiple populate then we use path
//     Post.find({})
//     .populate('user')
//     .populate({
//         path: 'comments',
//         populate: {
//             path: 'user'
//         }
//     })
//     .exec(function(err, posts){

//         User.find({},function(err,users) {
            
//             return res.render('home', {
//                 title: "Codeial | Home",
//                 posts:  posts,
//                 all_users:users
//             });
//         });
        
//     })
//      // return res.end(`<h1>Express is up for Codeial</h1>`);


// }






// with async await

module.exports.home = async function(req,res)
{
    try{

        // populate tge user of each post
        let posts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });


        let users = await User.find({});

        return res.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });

    } catch(err) {
        console.log('Error',err);
        return;
    }

    
      

}
