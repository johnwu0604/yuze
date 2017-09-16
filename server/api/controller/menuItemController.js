var MenuItem = require('../model/menuItem')

module.exports = {

    addMenuItem: function(req, callback) {
        var menuItem = new MenuItem()
        menuItem.name = req.body.name
        menuItem.description = req.body.description
        menuItem.price = req.body.price
        menuItem.picture = req.body.picture
        // save the menu item
        menuItem.save(function() {
            return callback()
        })

    },

    getAllMenuItems: function(callback) {
        MenuItem.find(function(err, items) {
            if (err)
                return callback(true, null)
            return callback(false, items)
        })
    },

    getMenuItemById: function(req, callback) {
        MenuItem.findById(req.params.id, function(err, item) {
            if (err)
                callback(true, null)
            callback(false, item)
        });
    },

    deleteMenuItem: function(req, callback) {
        MenuItem.remove({
            _id: req.params.id
        }, function(err, item) {
            if (err)
                return callback(true)
            return callback(false)
        });
    }

}
