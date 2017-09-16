var ffmpeg = require('ffmpeg')
var exec = require('child_process').exec

module.exports = {

    parseFrames: function(file, output, callback) {
        try {
            var process = new ffmpeg(file)
            process.then(function (video) {
                video.fnExtractFrameToJPG(output, {
                    frame_rate : 2,
                    number : 10,
                    file_name : 'my_frame_%t_%s'
                }, function (error, files) {
                    if (!error)
                        console.log('Frames: ' + files)
                    return callback()
                })
            }, function (err) {
                console.log('Error: ' + err)
            })
        } catch (e) {
            console.log(e.code)
            console.log(e.msg)
        }
    },

    removeOldFrames: function(callback) {
        exec('rm -rf uploads/frames', function (err, stdout, stderr) {
            if (err) {
                console.log(stderr)
                throw (stderr)
            }
            console.log(stdout)
            return callback()
        })
    }

}