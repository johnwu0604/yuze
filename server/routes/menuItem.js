var menuItemController = require('../api/controller/menuItemController')

module.exports = function (app) {

    app.post('/menu-item', function (req, res) {
        menuItemController.addMenuItem(req, function(err) {
            if (err)
                throw Error('Error occurred');
            res.send('Item successfully added')
        })
    })

    app.get('/menu-items', function(req, res) {
        menuItemController.getAllMenuItems(function(err, items) {
            if (err)
                throw Error('EError occurred')
            res.send(items)
        })
    })

    app.get('/menu-item/:id', function(req, res) {
        menuItemController.getMenuItemById(req, function(err, item) {
            if (err)
                throw Error('Error occurred')
            res.send(item)
        })
    })

    app.delete('/menu-item/:id', function(req, res) {
        menuItemController.deleteMenuItem(req, function (err) {
            if (err)
                throw Error('Error occurred')
            res.send('Successfully deleted')
        })
    })

}
