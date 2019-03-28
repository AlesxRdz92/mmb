const Item = require('../models/item');
require('../db/mongoose');

module.exports = {
    getItems: (req, res, next) => {
        Item.find({category: req.params.id}, '_id name stock shortDescription mainPhoto').then(item =>{
            res.status(200).send(item);
        }).catch(e => {
            res.status(404).send();
        });
    },
    getOne: (req, res, next) => {
        Item.findById(req.params.id, '_id name description price photos justDate category currency').then(item => {
            res.status(200).send(item);
        }).catch(e => {
            res.status(404).send();
        })
    }
};