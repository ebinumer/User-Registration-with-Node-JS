const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const indexController = require('../controllers/indexController');


router.get('/', indexController.indexFunction)
router.route('/register_user').post(indexController.registerUsers)    
router.route('/login').post(indexController.LoginUser)
router.route('/get_all_users').get(auth,indexController.getProfile)
router.route('/delete_user').get(indexController.deleteUser)
router.route('/upload_user_details').post(auth,indexController.uploadUserDetails)


module.exports = router;