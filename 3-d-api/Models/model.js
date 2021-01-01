const mongoose = require('../connection');
const Schema = mongoose.Schema;

const userschema = new Schema({
    name: String,
    file: String,
    image: String,
})

const product = mongoose.model('model', userschema);

module.exports = product;