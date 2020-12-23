// root index of versions

const expresss=require('express');

const router = expresss.Router();


router.use('/posts',require('./posts'));
router.use('/users',require('./users'));

module.exports = router;