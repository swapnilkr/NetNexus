const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.ObjectId
    },

    // this defines the obj id of liked obj
    // object like already placed
    likeable: {

        type: mongoose.Schema.ObjectId,
        require: true,
        refPath: 'onModel'
    },
    // this field is used for defining the type of liked obj since this is dynamic refernce
    onModel: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    }

},{
    timestamps: true
});


const Like = mongoose.model('Like',likeSchema);

module.exports = Like;