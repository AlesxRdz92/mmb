var router = require('express-promise-router')();

function routeHandler(req, res) {
    res.sendFile('index.html', {
        root: APP_PATH + 'client/dist'
    });
}

router.get('/', routeHandler);
/*router.get('/export', secure.auth, routeHandler);
router.get('/login', routeHandler);
router.get('/success/:id', routeHandler);
router.get('/', routeHandler);*/

module.exports = router;