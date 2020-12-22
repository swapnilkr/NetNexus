// root index of versions

const expresss=require('express');

const router = expresss.Router();


router.use('/posts',require('./posts'));


module.exports = router;