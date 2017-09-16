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

module.exports = function (app) {

    app.post('/customer', upload.single('video'), function (req, res) {
        res.send('Video received')
    })

}