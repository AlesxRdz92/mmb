const Date = require('../models/date');
require('../db/mongoose');

module.exports = {
    newDate: (req, res, next) => {
        let newDate = new Date({ 
            user: req.user._id,
            item: req.body.item,
            time: req.body.time
        });
        newDate.save().then(date => {
            res.status(200).send();
        }).catch(e => {
            res.status(404).send();
        })
    }
};