var router = require('express-promise-router')();
const itemsController = require('./../controllers/items');

router.get('/:id', itemsController.getItems);
router.get('/one/:id', itemsController.getOne);

module.exports = router;