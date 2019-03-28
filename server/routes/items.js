var router = require('express-promise-router')();
const itemsController = require('./../controllers/items');
const passport = require('passport');
require('../passport');

router.get('/:id', itemsController.getItems);
router.get('/one/:id', itemsController.getOne);

module.exports = router;