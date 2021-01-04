 


const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp:{

        service: 'gmail',
        host: 'smtp.gmail.com' , 
        port: 587 ,
        secure: false,
    
        // for stop spam of message
        auth: {
            user: 'conneqtioncodeial',
            pass: '12345asdfghjkl6789'
        }
    
    },
    google_client_id: '771984610321-pr7sf8fs0agqpjtjbbkit5ipkoqbr7qj.apps.googleusercontent.com',
    google_client_secret: 'NKbaeZgYshLJ_TuCkphBHASY',
    google_call_back_url: 'http://localhost:8000/users/auth/google/callback',
    jwt_secret: 'codeial',

}

const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp:{

        service: 'gmail',
        host: 'smtp.gmail.com' , 
        port: 587 ,
        secure: false,
    
        // for stop spam of message
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GOOGLE_PASSWORD
        }
    
    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,

}


module.exports = eval(process.env.CODEIAL_ENVIRONMENT)== undefined ? development: eval(process.env.CODEIAL_ENVIRONMENT);