const nodeMailer = require('nodemailer');
const ejs =  require('ejs');
const path =  require('path');

let transporter = nodeMailer.createTransport({

    service: 'gmail',
    host: 'smtp.gmail.com' , 
    port: 587 ,
    secure: false,

    // for stop spam of message
    auth: {
        user: 'conneqtioncodeial',
        pass: '12345asdfghjkl6789'
    }

});


// let know we will use ejs for beautiful crafted email
let renderTemplate = ( data, relativePath ) => {

        let mailHTML;
        ejs.renderFile(

            path.join(__dirname,'../views/mailers',relativePath),
            data,
            function(err, template){
                if (err){
                    console.log('error in rendering template',err);
                    return;
                }
                mailHTML = template;
            }

        )

        return mailHTML;
}


module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}