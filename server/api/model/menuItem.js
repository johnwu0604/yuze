// Schema for a menu item
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MenuItemSchema  = new Schema({
    name: String,
    description: String,
    price: String,
    picture: String
})

module.exports = mongoose.model('MenuItem', MenuItemSchema);
