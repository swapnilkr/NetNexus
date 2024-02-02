
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

const env = require('./environment');

// TODO later for some difficult hash code for key , to encrypt or decrypt JWT token
// right now let it be NetNexus

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    // key token to encrypt or decrypt
    secretOrKey : env.jwt_secret
}


// in local stratgey we matches password 
// in jwt we authenticate by matching jwt 
passport.use(new JWTStrategy(opts,function(jwtPayload,done){

    // if authentication matches
    // jwtPayload in encrypted form
    User.findById(jwtPayload._id, function(err,user){
        if(err){
            console.log('Error in finding user fron JWT');
            return;
        }

        if(user){
            return done(null,user);
        } else {
            return done(null,false);
        }

    });


}));


module.exports = passport;