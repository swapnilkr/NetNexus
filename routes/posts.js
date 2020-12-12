const expresss=require('express');

const passport = require('passport');

const router = expresss.Router();

const postsController=require('../controllers/posts_controller');

router.post('/create',passport.checkAuthentication , postsController.create);

module.exports=router;