var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    id: String,
    description: String,
    image: String,
    notes: String
})

module.exports = mongoose.model('Category', userSchema)