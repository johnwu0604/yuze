var ffmpeg = require('ffmpeg')

module.exports = {

    parseFrames: function(callback) {
        try {
            var process = new ffmpeg('uploads/video.mp4')
            process.then(function (video) {
                console.log(video)
                video.fnExtractFrameToJPG('uploads/frames', {
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
    }

}