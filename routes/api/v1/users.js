
const expresss=require('express');

const router = expresss.Router();
const usersApi = require('../../../controllers/api/v1/users_api');

router.post('/create-session',usersApi.createSession);


module.exports = router;