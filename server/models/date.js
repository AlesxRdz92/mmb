const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dateSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    },
    item: {
        type: Schema.ObjectId,
        ref: 'item',
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

const Date = mongoose.model("date", dateSchema);

module.exports = Date;