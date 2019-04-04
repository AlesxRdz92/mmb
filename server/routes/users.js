var router = require('express-promise-router')();
const usersController = require('./../controllers/users');
const passport = require('passport');
require('../passport');
const { validateBody, schemas } = require('../midleware/routeHelper');

/* GET users listing. */
router.post('/signup', validateBody(schemas.signUpSchema), usersController.signUp);
router.get('/confirm/:id', usersController.confirm);
router.post('/recover', usersController.forgotPassword);
router.post('/recover/:token', usersController.changePassword);
router.get('/:id', usersController.getUserInfo);
router.post('/signin', validateBody(schemas.signInSchema), passport.authenticate('local', { session: false }), usersController.signIn);
router.post('/oauth/facebook', passport.authenticate('facebookToken', { session: false }), usersController.facebookOAuth);

module.exports = router;
