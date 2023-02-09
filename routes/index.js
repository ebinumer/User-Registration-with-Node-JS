const express = require('express');
const router = express.Router();

const indexController = require('../controllers/indexController');


router.get('/', indexController.indexFunction)
router.route('/register_user').post(indexController.registerUsers)
router.route('/login').post(indexController.LoginUser)
router.route('/get_all_users').get(indexController.getProfile)
router.route('/upload_user_details').post(indexController.uploadUserDetails)


module.exports = router;