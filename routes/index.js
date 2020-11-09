const expresss=require('express');

const router = expresss.Router();
// export from controller
const homeController=require('../controllers/home_controller');


router.get('/',homeController.home);




module.exports=router;