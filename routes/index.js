// root index for routes

const expresss = require('express');

const router = expresss.Router();

// export from controller
const homeController = require('../controllers/home_controller');

//list of routes
router.get('/',homeController.home);

router.use('/users',require('./users'));

router.use('/posts',require('./posts'));

router.use('/comments',require('./comments'));

router.use('/likes',require('./likes'));

// api routes
router.use('/api',require('./api'));



// for any further routes ,access from here
//router.use('/routerName',require('./routerfile')); 


module.exports = router;