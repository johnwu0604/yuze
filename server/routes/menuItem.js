var menuItemController = require('../api/controller/menuItemController')

module.exports = function (app) {

    /**
     * Post request to add a menu item
     */
    app.post('/menu-item', function (req, res) {
        menuItemController.addMenuItem(req, function(err) {
            if (err)
                throw Error('Error occurred');
            res.send('Item successfully added')
        })
    })

    /**
     * Retrieve all the menu items
     */
    app.get('/menu-items', function(req, res) {
        menuItemController.getAllMenuItems(function(err, items) {
            if (err)
                throw Error('Error occurred')
            res.send(items)
        })
    })

    /**
     * Retrieve a menu item by id
     */
    app.get('/menu-item/:id', function(req, res) {
        menuItemController.getMenuItemById(req, function(err, item) {
            if (err)
                throw Error('Error occurred')
            res.send(item)
        })
    })

    /**
     * Delete a menu item by id
     */
    app.delete('/menu-item/:id', function(req, res) {
        menuItemController.deleteMenuItem(req, function (err) {
            if (err)
                throw Error('Error occurred')
            res.send('Successfully deleted')
        })
    })

}
