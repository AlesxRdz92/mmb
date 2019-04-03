var router = require('express-promise-router')();

function routeHandler(req, res) {
    res.sendFile('index.html', {
        root: APP_PATH + 'client/dist'
    });
}

router.get('/', routeHandler);
router.get('/register', routeHandler);
router.get('/signin', routeHandler);
router.get('/items/:id', routeHandler);
router.get('/item/:id', routeHandler);
router.get('/confirm/:id', routeHandler);
/*router.get('/export', secure.auth, routeHandler);
router.get('/login', routeHandler);
router.get('/success/:id', routeHandler);
router.get('/', routeHandler);*/

module.exports = router;