const expresss=require('express');

const router = expresss.Router();

const passport = require('passport');

// export from controller
const usersController=require('../controllers/users_controller');


router.get('/profile',passport.checkAuthentication,usersController.profile);

router.get('/sign-up',usersController.signUp);

router.get('/sign-in',usersController.signIn);

router.post('/create',usersController.create);

// use passportt as MW to authenticate
router.post('/create-session',passport.authenticate
(
    // if authenticated then done , if fails then user redirected to sign in
    'local',
    {failureRedirect: '/users/sighn-in'},
    // if done then createSession is executed
),usersController.createSession);

module.exports=router;