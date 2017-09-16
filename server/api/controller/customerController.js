var frameUtility = require('../util/frameUtility')
var amazonUtility = require('../util/amazonUtility')
var async = require('async')

function removeOldFrames(callback) {
    frameUtility.removeOldFrames( function() {
        return callback()
    })
}

function parseFrames(callback) {
    frameUtility.parseFrames('uploads/video.mp4', 'uploads/frames', function() {
        return callback()
    })
}

function uploadFrames(name, callback) {
    amazonUtility.uploadDir(name, 'uploads/frames', function() {
        return callback()
    })
}

module.exports = {

    createCustomer: function(req, callback) {
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
                uploadFrames( req.body.name, function () {
                    return callback()
                })
            }
        ], function () {
            return callback('Done')
        })
    }

}