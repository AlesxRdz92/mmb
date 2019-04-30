var router = require('express-promise-router')();
const datesController = require('./../controllers/dates');
const passport = require('passport');
require('../passport');

router.post('/', passport.authenticate('jwt', { session: false }), datesController.newDate);

module.exports = router;