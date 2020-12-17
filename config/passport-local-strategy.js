// require passport lib

const passport = require('passport');

// using passport-local strategy
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({

        usernameField:'email', //as email is unique , this to identify user
        // for flash message
        passReqToCallback : true // alows us to set first argument as req
    },
    // when localStrategy is called email password and done will be passed on
    function(req,email,password,done)
    {
        //find user and estb the identity
        //first email is schema email or the property we r finding
        // sencond email in findone is the one which is send by callback function
        User.findOne({email:email},function(err,user)
        {
            if (err)
            {
                // console.log('Error in finding user --> Passport');

                req.flash('error',err);

                // passport has separate syntax

                return done(err);
            }

            // user not found
            if (!user || user.password != password)
            {
                req.flash('error','Invalid Username / Password' );
                // console.log('Invalid Username / Password');
                // err= null and authentication is noot done so false
                return done(null , false);
            }

            // if user found
            return done(null,user);
        })
    }

));


// serializing the user to decide which key is to be keppt in the cookies
// store user id in cokkie in encrypted form
passport.serializeUser(function(user,done)
{
    done(null,user.id);
});


// deserializing the user from the key in the cookies
// when browser req while creating session , the cookie is send back to estb which user is logged in we need to deserialize

passport.deserializeUser(function(id,done)
{
    User.findById(id,function(err,user)
    {
        if (err)
        {
            console.log('Error in finding user --> Passport');

            return done(err);
        }
        return done(null,user);
    });
});

// send user info 

// check if the user is authenticated
passport.checkAuthentication = function(req,res,next)
{
    // if user is signed in show the page else not
    // if the user is signed in , then pass on the request to the next function(controller's function)
    // as next is used then we can say its MW
    if (req.isAuthenticated())
    {
        return next();
    }

    // if user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next)
{
    if (req.isAuthenticated())
    {
        // req.user contains the currrent signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user ;
    }
    next();
}

module.exports = passport ;

