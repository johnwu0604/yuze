var FrameUtility = require('../util/frameUtility')
var AmazonUtility = require('../util/amazonUtility')
var MicrosoftUtility = require('../util/microsoftUtility')
var async = require('async')
var Customer = require('../model/customer')
var UUID = require('uuid/v1')
var uuid = ''

var uploadedPhotos = []
var customerId = ''
var customerName = ''

/**
 * Removes all the old frames cached in memory
 *
 * @param callback
 */
function removeOldFrames(callback) {
    FrameUtility.removeOldFrames( function() {
        return callback()
    })
}

/**
 * Parses all the frames out of a video footage
 *
 * @param callback
 */
function parseFrames(callback) {
    FrameUtility.parseFrames('uploads/video.mp4', 'uploads/frames', function() {
        return callback()
    })
}

/**
 * Uploads frames to Amazon S3
 *
 * @param callback
 */
function uploadFrames(callback) {
    AmazonUtility.uploadDir(customerName, 'uploads/frames', function(result) {
        uploadedPhotos = result.photos
        return callback()
    })
}

/**
 * Creates a new person in cognitive services
 *
 * @param callback
 */
function createUser(callback) {
    MicrosoftUtility.createPerson(customerName, function (result) {
        return callback(result)
    })
}

/**
 * Adds faces to person in cognitive services
 *
 * @param callback
 */
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

/**
 * Trains the data in cognitive services
 *
 * @param callback
 */
function trainData(callback) {
    MicrosoftUtility.trainPersonGroup( function(result) {
        console.log(result)
        return callback()
    })
}

/**
 * Stores a customers information in the database
 *
 * @param req
 * @param callback
 */
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

/**
 * Uploads an image to S3
 *
 * @param callback
 */
function uploadFile(callback) {
    uuid = UUID()
    AmazonUtility.uploadFile('uploads/image_1.jpg', 'faces/detect/' + uuid + '.jpg', function() {
        return callback()
    })
}

/**
 * Identifies the person in a photo
 *
 * @param callback
 */
function identifyFace(callback) {
    var url = 'https://s3.ca-central-1.amazonaws.com/yuze-dev-canada/faces/detect/'+ uuid +'.jpg'
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

    /**
     * Creates a new customer in the database given their video footage and order
     *
     * @param req
     * @param callback
     */
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

    /**
     * Searches for a customer in the database
     *
     * @param callback
     */
    searchCustomer: function(callback) {
        FrameUtility.parseSingleFrame('uploads/snapshot.mp4', 'uploads', function() {
            uploadFile(function() {
                identifyFace( function(result) {
                    return callback(result)
                })
            })
        })
    },

    /**
     * Adds a customer to the database
     *
     * @param req
     * @param callback
     */
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

    /**
     * Retrieves all customers
     *
     * @param callback
     */
    getAllCustomers: function(callback) {
        Customer.find(function(err, customers) {
            if (err)
                return callback(true, null)
            return callback(false, customers)
        })
    },

    /**
     * Retrieves a customer by id
     *
     * @param req
     * @param callback
     */
    getCustomerById: function(req, callback) {
        Customer.findById(req.params.id, function(err, customer) {
            if (err)
                callback(true, null)
            callback(false, customer)
        });
    },

    /**
     * Deletes a customer by id
     *
     * @param req
     * @param callback
     */
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