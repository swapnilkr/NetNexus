const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: '771984610321-pr7sf8fs0agqpjtjbbkit5ipkoqbr7qj.apps.googleusercontent.com',
    clientSecret: 'NKbaeZgYshLJ_TuCkphBHASY',
    callbackURL: 'http://localhost:8000/users/auth/google/callback',
    },

    // same as jwt access token
    // refresh token when acess token expires we use access token to get new one

    function(accessToken, refreshToken, profile, done){

        // find a user
        // one person can have multiple emails, so arrays is returned
        User.findOne({ email : profile.emails[0].value}).exec(function(err,user){
            if (err){
                console.log('Error in google strategy-passport ',err);
                return;
            }

            console.log(profile);

            if(user){
                // if found set this user as req.user
                return done(null,user);
            } else {

                // if not found , create the user and set it as req.user
                // set it as req.user means signing the user


                // if first email does not exist in database , we create new user
                // we create new user

                User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,

                    // creating raandom password using crypto
                    password : crypto.randomBytes[20].toString('hex'),
                }, function(err,user){

                    if (err){
                        console.log('Error in creating user ',err);
                        return;
                    }
                    return done(null,user);


                }) ;
            }
        });
    }
))


module.exports = passport;