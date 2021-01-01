const mongoose = require('../connection.js');
const Schema = mongoose.Schema;
const schema = new Schema({
    username: String,
    name: String,
    email: String,
    password: String,
    admin: Boolean
});
const model = mongoose.model('user', schema);
module.exports = model;
