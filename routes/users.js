const expresss=require('express');

const router = expresss.Router();
// export from controller
const usersController=require('../controllers/users_controller');


router.get('/profile',usersController.profile);


module.exports=router;