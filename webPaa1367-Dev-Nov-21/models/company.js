var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    id: String,
    description: String,
    notes: String
})

module.exports = mongoose.model('Company', userSchema)