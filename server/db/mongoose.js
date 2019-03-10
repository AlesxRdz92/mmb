const mongoose = require('mongoose');

const URL = process.env.MONGODB;
mongoose.Promise = global.Promise;
mongoose.connect(URL, { useNewUrlParser: true });

module.exports = {
    mongoose
};