var fs = require('fs');
var multer = require('multer');
var storageVideo = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, 'video.mp4')
    }
});
var uploadVideo = multer({ storage: storageVideo });

var storageImage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, 'image.jpg')
    }
});
var uploadImage = multer({ storage: storageImage });

var customerController = require('../api/controller/customerController')

module.exports = function (app) {

    /**
     * Creates a new customer given their video footage and menu order
     */
    app.post('/create-customer', uploadVideo.single('video'), function (req, res) {
       customerController.createCustomer(req, function(result) {
           res.send(result)
       })
    })

    /**
     * Queries for an existing customer
     */
    app.post('/search-customer', uploadImage.single('image'), function (req, res) {
        customerController.searchCustomer(function(result) {
            res.send(result)
        })
    })

    /**
     * Creates a new customer
     */
    app.post('/customer', function (req, res) {
        customerController.addCustomer(req, function(err) {
            if (err)
                throw Error('Error occurred');
            res.send('Item successfully added')
        })
    })

    /**
     * Retrieves all existing customers
     */
    app.get('/customers', function(req, res) {
        customerController.getAllCustomers(function(err, customers) {
            if (err)
                throw Error('EError occurred')
            res.send(customers)
        })
    })

    /**
     * Retrieves a customer given their id
     */
    app.get('/customer/:id', function(req, res) {
        customerController.getCustomerById(req, function(err, customer) {
            if (err)
                throw Error('Error occurred')
            res.send(customer)
        })
    })

    /**
     * Deletes a customer given their id
     */
    app.delete('/customer/:id', function(req, res) {
        customerController.deleteCustomer(req, function (err) {
            if (err)
                throw Error('Error occurred')
            res.send('Successfully deleted')
        })
    })

}