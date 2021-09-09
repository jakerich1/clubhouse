var express = require('express');
const passport = require('passport');
var router = express.Router();

// Require controller modules.
var post_controller = require('../controllers/postController');
var user_controller = require('../controllers/userController');

/* GET home page. */
router.get('/', post_controller.post_homepage);

// Post routes
//////////////

// POST post delete
router.post('/post/:id/delete', post_controller.post_delete_post);

// GET post create
router.get('/create', post_controller.post_create_get);

// POST post create
router.post('/create', post_controller.post_create_post);

// User routes
//////////////

// GET sign up page
router.get('/signup', user_controller.signup_get);

// POST sign up page
router.post('/signup', user_controller.signup_post);

// GET login page
router.get('/login', user_controller.login_get);

// POST login page
router.post('/login', user_controller.login_post);

router.post('/logout', user_controller.logout_post)

// GET member change page
router.get('/member', user_controller.member_get);

// POST member change page
router.post('/member', user_controller.member_post);

// GET admin change page
router.get('/admin', user_controller.admin_get);

// POST admin change page
router.post('/admin', user_controller.admin_post);

module.exports = router;
