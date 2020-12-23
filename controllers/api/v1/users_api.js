const User = require('../../../models/user');
const jwt = require('jsonwebtoken');


// sign in and create a session for the user
module.exports.createSession=async function(req,res){

    // whenever username and password is recvd  , find the user and generate Json web token of user
    try {
        // email matches
        let user = await User.findOne({email : req.body.email});

        // password not matches
        if(!user || user.password != req.body.password){
            return res.json(422, {
                message: "Invalid Username or Password"
            });
        }

        return res.json(200, {
            message: 'Sign in successful , here is your token , please keep it safe!',
            data:{
                // encryption
                token: jwt.sign(user.toJSON(),'codeial',{ expiresIn: '10000'})
            }
        })


    } catch(err){
        console.log(err);
        return res.json(500,{
            message : "Internal Server Error"
        });

    }
    




}
