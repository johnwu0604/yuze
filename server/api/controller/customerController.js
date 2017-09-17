var FrameUtility = require('../util/frameUtility')
var AmazonUtility = require('../util/amazonUtility')
var MicrosoftUtility = require('../util/microsoftUtility')
var async = require('async')
var Customer = require('../model/customer')

var uploadedPhotos = []
var customerId = ''
var customerName = ''

function removeOldFrames(callback) {
    FrameUtility.removeOldFrames( function() {
        return callback()
    })
}

function parseFrames(callback) {
    FrameUtility.parseFrames('uploads/video.mp4', 'uploads/frames', function() {
        return callback()
    })
}

function uploadFrames(callback) {
    AmazonUtility.uploadDir(customerName, 'uploads/frames', function(result) {
        uploadedPhotos = result.photos
        return callback()
    })
}

function createUser(callback) {
    MicrosoftUtility.createPerson(customerName, function (result) {
        return callback(result)
    })
}

function addFaces(callback) {
    async.each(uploadedPhotos, function (photo, callback) {
        MicrosoftUtility.addFace(customerId, process.env.AWS_PHOTOS_URL + photo, function(result) {
            console.log(result)
            return callback()
        })
    }, function (err) {
        console.log('Finished adding faces');
        return callback()
    })
}

function trainData(callback) {
    MicrosoftUtility.trainPersonGroup( function(result) {
        console.log(result)
        return callback()
    })
}

function storeInDatabase(req, callback) {
    var customer = new Customer()
    customer._id = customerId
    customer.name = req.body.name
    customer.previous_order = req.body.previous_order
    // save the menu item
    customer.save(function() {
        return callback()
    })
}

function uploadFile(callback) {
    AmazonUtility.uploadFile('uploads/image.jpg', 'faces/detect/image.jpg', function() {
        return callback()
    })
}

function identifyFace(callback) {
    var url = 'https://s3.ca-central-1.amazonaws.com/yuze-dev-canada/faces/detect/image.jpg'
    MicrosoftUtility.detectFace(url, function(result) {
        MicrosoftUtility.identifyFace(result[0].faceId, function(result) {
            var candidates = result[0].candidates
            var customerExists = false
            if (candidates.length == 1) {
                customerExists = true
            }
            return callback({
                customerExists: customerExists,
                candidates: candidates
            })
        })
    })
}

module.exports = {

    createCustomer: function(req, callback) {
        customerName = req.body.name
        async.series([
            function (callback) {
                removeOldFrames(function () {
                    return callback()
                })
            },
            function (callback) {
                parseFrames(function () {
                    return callback()
                })
            },
            function (callback) {
                uploadFrames( function () {
                    return callback()
                })
            },
            function (callback) {
                createUser( function (result) {
                    customerId = result.personId
                    return callback()
                })
            },
            function (callback) {
                addFaces( function() {
                    return callback()
                })
            },
            function (callback) {
                trainData( function() {
                    return callback()
                })
            },
            function (callback) {
                storeInDatabase(req, function() {
                    return callback()
                })
            }
        ], function () {
            return callback({ customerId: customerId })
        })
    },

    searchCustomer: function(callback) {
        uploadFile(function() {
            identifyFace( function(result) {
                return callback(result)
            })
        })
    },

    addCustomer: function(req, callback) {
        var customer = new Customer()
        customer._id = req.body.id
        customer.name = req.body.name
        customer.previous_order = req.body.previous_order
        // save the menu item
        customer.save(function() {
            return callback()
        })

    },

    getAllCustomers: function(callback) {
        Customer.find(function(err, customers) {
            if (err)
                return callback(true, null)
            return callback(false, customers)
        })
    },

    getCustomerById: function(req, callback) {
        Customer.findById(req.params.id, function(err, customer) {
            if (err)
                callback(true, null)
            callback(false, customer)
        });
    },

    deleteCustomer: function(req, callback) {
        Customer.remove({
            _id: req.params.id
        }, function(err, customer) {
            if (err)
                return callback(true)
            return callback(false)
        });
    }

}