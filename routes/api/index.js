// root index for api

const expresss=require('express');

const router = expresss.Router();

router.use('/v1',require('./v1'));

router.use('/v2',require('./v2'));


module.exports = router;