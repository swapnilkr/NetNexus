const nodeMailer = require('../config/nodemailer');

// module.exports = newComment
// this is another way of exporting a method
exports.newcomment = (comment) => {
    console.log('inside newComment mailer',comment);

    nodeMailer.transporter.sendMail({
        from: 'conneqtioncodeial.com',
        // we are sending mail notification for the person who commented
        // for post it would be comment.post.email
        to: comment.user.email,
        subject: "New comment published",

        html: '<h1> Yup , your comment is now published </h1>'

    },(err,info) => {
        if(err){
            console.log("Error in sending mail",err);
            return;
        }
        console.log("message sent",info);
        return;
    });
}