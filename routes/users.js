const expresss=require('express');

const router = expresss.Router();

const passport = require('passport');

// export from controller
const usersController=require('../controllers/users_controller');

// get for links
router.get('/profile/:id',passport.checkAuthentication,usersController.profile);

router.post('/update/:id',passport.checkAuthentication,usersController.update);

router.get('/sign-up',usersController.signUp);

router.get('/sign-in',usersController.signIn);

// post is for action after entering data
router.post('/create',usersController.create);

// use passportt as MW to authenticate
router.post('/create-session',passport.authenticate
(
    // if authenticated then done , if fails then user redirected to sign in
    'local',
    {failureRedirect: '/users/sign-in'},
    // if done then createSession is executed
),usersController.createSession);


router.get('/sign-out',usersController.destroySession);

module.exports=router;