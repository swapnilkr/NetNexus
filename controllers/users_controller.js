// require user
const User = require('../models/user');
const fs = require('fs');
const path = require('path');

// no need of async wait 
// no nesting level
// already neat

module.exports.profile = function(req,res)
{
    User.findById(req.params.id,function(err,user){

        return res.render('user_profile',{
            title:"Profile Page",
            profile_user:user
        });
    });
    
}

// to update profile without asyn await
// module.exports.update=function(req,res){
//     if (req.user.id== req.params.id){
//         User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
//             return res.redirect('back');
//         });
//     } else {
//         return res.status(401).send('Unauthorized');
//     }
// }


// update prof with async await and avatar
module.exports.update=async function(req,res){
    if (req.user.id== req.params.id){

        try{

            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('******Multer Error: ',err);
                }
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    // if user already have avatar then we update and remove the previous one from folder
                    // but if user updates first time then it will throw error so 
                    // fs.existsSync checkks if file present on the pth or not if not then in wont move inside
                    if(user.avatar && fs.existsSync(path.join(__dirname,'..',user.avatar))){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    



                    // this is saving the path of uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' +req.file.filename
                }
                // console.log(req.file);
                user.save();
                return res.redirect('back');
            })

        } catch(err) {
            req.flash('error',err);
            return res.redirect('back');
        }
    } else {
        req.flash('error','Unauthorized');
        return res.status(401).send('Unauthorized');
    }
}


// render the sign up page
module.exports.signUp=function(req,res){
    // if user signed in already move to prpfile page
    if (req.isAuthenticated())
    {
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title: "Codeial ! Sign Up"
    })
}


// render the sign in page
module.exports.signIn=function(req,res){
     // if user signed in already move to prpfile page
    if (req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title: "Codeial ! Sign In"
    })
}

// get the sign up data
module.exports.create=function(req,res){
    // if password and confirm password are different
    if(req.body.password!= req.body.confirm_password)
    {
        return res.redirect('back');
    }
    // if password and confirm password are same
    // we find if the email is already present or not in db

    // we use find function to find data from user schema
    User.findOne({email : req.body.email},function(err,user)
    {
        if(err)
        {
            console.log('error in finding user in signing up');
            return;
        }

        if(!user)
        {
            User.create(req.body,function(err,user)
            {
                console.log('error in creating user while signing up');
                // after creating redirect to sign up page
                return res.redirect('/users/sign-in');
            });
            
        }
        else
        {
            return res.redirect('back');
        }

    });

}

// sign in and create a session for the user
module.exports.createSession=function(req,res){

    req.flash('success','Logged In Successfully');

    //todo later
    return res.redirect('/');
}

// to destroy session after sign out
module.exports.destroySession=function(req,res)
{
    // passport inbuilt lib for sign out
    req.logout();
    req.flash('success','You have logged out');
    return res.redirect('/');
}