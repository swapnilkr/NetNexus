// require user
const User=require('../models/user');

module.exports.profile = function(req,res)
{
    // show details in prof page and 
    // user should access only after signing in

    if (req.cookies.user_id)
    {
        User.findById(req.cookies.user_id,function(err,user)
        {
            if (user)
            {
                return res.render('user_profile',{
                    title:"User Profile ",
                    user:user
                });
            }
            return res.redirect('/users/sign-in');
        });
    }
    else
    {
        return res.redirect('/users/sign-in');
    }
    
}


// render the sign up page
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title: "Codeial ! Sign Up"
    })
}


// render the sign in page
module.exports.signIn=function(req,res){
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

    //steps to authenticate
    // find the user
    User.findOne({email:req.body.email},function(err,user)
    {
        if(err)
        {
            console.log('error in finding user in signing in');
            return;
        }
        // handle the user found
        if (user)
        {
            // handle password which dont match
            if (user.password != req.body.password)
            {
                return res.redirect('back');
            }

            // handle session creation
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
        }
        else
        {
            //handle user not found
            return res.redirect('back');
        }
    });
    
}


// sign out and dismiss session for the user

module.exports.dismissSession=function(req,res)
{
    //after sign out , removing user_id
    res.cookie('user_id',-1);
    
    return res.redirect('/users/sign-in');
}