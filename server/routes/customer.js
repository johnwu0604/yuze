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

var microsoft = require('../api/util/microsftUtility')
var frameUtility = require('../api/util/frameUtility')

module.exports = function (app) {

    // app.post('/customer', upload.single('video'), function (req, res) {
    //     // microsoft.addFace('a07cdaa6-89c0-447a-8eb8-3dce14b24789','https://s3.us-east-2.amazonaws.com/yuze-dev/faces/123/IMG_20170916_091637.jpg', function(result) {
    //     //     res.send(result)
    //     // })
    //     // microsoft.trainPersonGroup( function(result) {
    //     //     res.send(result)
    //     // })
    //     microsoft.identifyFace('9a5a1dea-e91c-45e7-8b5d-0ef361d94aa8', function(result) {
    //         res.send(result)
    //     })
    // })

    app.post('/customer', upload.single('video'), function (req, res) {
        frameUtility.parseFrames( function() {
            res.send('Done Parsing Frames')
        })
    })

}