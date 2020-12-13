const expresss=require('express');

const passport = require('passport');

const router = expresss.Router();

const commentsController=require('../controllers/comments_controller');

router.post('/create',passport.checkAuthentication , commentsController.create);

module.exports=router;