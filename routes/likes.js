const expresss = require('express');
const { app } = require('kue');

const router = expresss.Router();

const likesController = require('../controllers/likes_controller');

router.post('/toggle', likesController.toggleLike);


module.exports = router;