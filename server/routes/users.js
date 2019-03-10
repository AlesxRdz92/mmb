var router = require('express-promise-router')();
const usersController = require('./../controllers/users');
const passport = require('passport');
require('../passport');

/* GET users listing. */
router.post('/signup', usersController.signUp);
router.get('/confirm/:id', usersController.confirm);
router.post('/recover', usersController.forgotPassword);
router.post('/recover/:id', usersController.changePassword);
router.get('/:id', usersController.getUserInfo);
router.post('/signin', passport.authenticate('local', { session: false }), usersController.signIn);
router.post('/oauth/facebook', passport.authenticate('facebookToken', { session: false }), usersController.facebookOAuth);

module.exports = router;