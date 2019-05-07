const DateMeeting = require('../models/date');
require('../db/mongoose');
const sendEmail = require('../helpers/mail');

module.exports = {
    newDate: (req, res, next) => {
        const populateData = [{
            path: 'user',
            select: 'name address phone city'
        },
        {
            path: 'item',
            select: 'name category stock'
        }];
        let newDate = new DateMeeting({ 
            user: req.user._id,
            item: req.body.item,
            time: req.body.time,
            date: req.body.date
        });
        newDate.save().then(date => {
            DateMeeting.findById(newDate._id).populate(populateData).then(info => {
                sendEmail({name: info.user, token: {item: info.item, date: newDate.date, time: newDate.time}, email: 'alesx.rdz@hotmail.com'}, 'notifyMeeting');
            });
            res.status(200).send();
        }).catch(e => {
            res.status(404).send();
        });
    }
};