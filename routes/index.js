const expresss=require('express');

const router = expresss.Router();

// export from controller
const homeController=require('../controllers/home_controller');

//list of routes
router.get('/',homeController.home);

router.use('/users',require('./users'));

// for any further routes ,access from here
//router.use('/routerName',require('./routerfile')); 


module.exports=router;