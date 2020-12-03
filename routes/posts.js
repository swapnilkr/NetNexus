const expresss=require('express');

const router = expresss.Router();

const postsController=require('../controllers/posts_controller');

router.post('/create' , postsController.create);

module.exports=router;