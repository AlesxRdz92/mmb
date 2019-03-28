const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('./user');

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["clothe", "watch", "smartphone", "car", "realty", "pet"],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: false
    },
    shortDescription: {
        type: String,
        required: true
    },
    description: {
        type: Array,
        required: true
    },
    mainPhoto: {
        type: Array,
        required: true
    },
    justDate: {
        type: Boolean,
        required: true
    },
    currency: {
        type: String,
        enum: ["USD", "MXN", "EUR"],
        required: true
    }
});

const Item = mongoose.model("item", itemSchema);

module.exports = Item;