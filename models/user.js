const mongoose = require('mongoose');
 
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique: true
    },

    password:{
        type:String,
        required:true
    },

    name: {
        type:String,
        required:true
    },

    avatar: {
        type: String
    }
},{
    timestamps:true // let us know when the user data was created and when it was last updated
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // path is '..//uploads/users/avatars' so we just concatenated
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  })

// static function

//single says only one instance or file will be upladed for field avatar
userSchema.statics.uploadedAvatar = multer ({storage: storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;
 

const User=mongoose.model('User',userSchema);

module.exports=User