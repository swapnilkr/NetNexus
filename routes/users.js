const expresss=require('express');

const router = expresss.Router();
// export from controller
const usersController=require('../controllers/users_controller');


router.get('/profile',usersController.profile);

router.get('/sign-up',usersController.signUp);

router.get('/sign-in',usersController.signIn);

// vvi imp
router.post('/create',usersController.create);

router.post('/create-session',usersController.createSession);

router.post('/dismiss-session',usersController.dismissSession);

module.exports=router;