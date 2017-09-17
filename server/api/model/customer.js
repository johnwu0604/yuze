// Schema for a customer
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CustomerSchema  = new Schema({
    _id: String,
    name: String,
    previous_order: Array
})

module.exports = mongoose.model('Customer', CustomerSchema);
