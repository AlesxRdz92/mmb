const Item = require('../models/item');
require('../db/mongoose');

module.exports = {
    getItems: (req, res, next) => {
        Item.find({category: req.params.id}, '_id name stock shortDescription mainPhoto').then(item =>{
            res.status(200).send(item);
        }).catch(e => {
            console.log(e);
            res.status(404).send();
        });
    }
};