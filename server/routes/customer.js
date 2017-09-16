var fs = require('fs');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, 'video.mp4')
    }
});
var upload = multer({ storage: storage });

var customerController = require('../api/controller/customerController')

module.exports = function (app) {

    app.post('/create-customer', upload.single('video'), function (req, res) {
       customerController.createCustomer(req, function(result) {
           res.send(result)
       })
    })

    app.post('/customer', function (req, res) {
        customerController.addCustomer(req, function(err) {
            if (err)
                throw Error('Error occurred');
            res.send('Item successfully added')
        })
    })

    app.get('/customers', function(req, res) {
        customerController.getAllCustomers(function(err, customers) {
            if (err)
                throw Error('EError occurred')
            res.send(customers)
        })
    })

    app.get('/customer/:id', function(req, res) {
        customerController.getCustomerById(req, function(err, customer) {
            if (err)
                throw Error('Error occurred')
            res.send(customer)
        })
    })

    app.delete('/customer/:id', function(req, res) {
        customerController.deleteCustomer(req, function (err) {
            if (err)
                throw Error('Error occurred')
            res.send('Successfully deleted')
        })
    })

}