var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    id: String,
    description: String,
    debit: Number,
    credit: Number,
    notes: String,
    creator: String
})

module.exports = mongoose.model('Transaction', userSchema)