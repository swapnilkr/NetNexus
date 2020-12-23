const expresss=require('express');

const router = expresss.Router();
const passport = require('passport');
const postsApi = require('../../../controllers/api/v1/posts_api');


router.get('/',postsApi.index);

// to prevent session cookies to authenticate we put session to false
router.delete('/:id',passport.authenticate('jwt', { session:false}),postsApi.destroy);


module.exports = router;