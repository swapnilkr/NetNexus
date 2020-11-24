// require passport lib

const passport = require('passport');

// using passport-local strategy
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({

        usernameField:'email' //as email is unique , this to identify user

    },
    // when localStrategy is called email password and done will be passed on
    function(email,password,done)
    {
        //find user and estb the identity
        //first email is schema email or the property we r finding
        // sencond email in findone is the one which is send by callback function
        User.findOne({email:email},function(err,user)
        {
            if (err)
            {
                console.log('Error in finding user --> Passport');

                // passport has separate syntax

                return done(err);
            }

            // user not found
            if (!user || user.password != password)
            {
                console.log('Invalid Username / Password');
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

module.exports = passport ;