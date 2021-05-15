const nodeMailer = require('../config/nodemailer');

// module.exports = newComment
// this is another way of exporting a method
exports.newComment = (comment) => {
    // console.log('inside newComment mailer',comment);

    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'conneqtioncodeial.com',
        // we are sending mail notification for the person who commented
        // for post it would be comment.post.email
        to: comment.user.email,
        subject: "New comment published",

        html: htmlString

    },(err,info) => {
        if(err){
            console.log("Error in sending mail",err);
            return;
        }
        console.log("message sent",info);
        return;
    });
}




exports.newCommentOnPost = (comment) => {
    // console.log('inside newComment mailer',comment);

    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment_on_post.ejs');

    nodeMailer.transporter.sendMail({
        from: 'conneqtioncodeial.com',
        // we are sending mail notification for the person who commented
        // for post it would be comment.post.email
        to: comment.user.email,
        subject: "New comment on your post",

        html: htmlString

    },(err,info) => {
        if(err){
            console.log("Error in sending mail",err);
            return;
        }
        console.log("message sent",info);
        return;
    });
}