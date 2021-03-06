var ffmpeg = require('ffmpeg')
var exec = require('child_process').exec

module.exports = {

    /**
     * Parses the frames in a video
     *
     * @param file
     * @param output
     * @param callback
     */
    parseFrames: function(file, output, callback) {
        try {
            var process = new ffmpeg(file)
            process.then(function (video) {
                video.fnExtractFrameToJPG(output, {
                    frame_rate : 2,
                    number : 5,
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

    /**
     * Parses a single frame from the video
     *
     * @param file
     * @param output
     * @param callback
     */
    parseSingleFrame: function(file, output, callback) {
        try {
            var process = new ffmpeg(file)
            process.then(function (video) {
                video.fnExtractFrameToJPG(output, {
                    frame_rate : 1,
                    number : 1,
                    file_name : 'image.jpg'
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

    /**
     * Removes all the cached frames
     *
     * @param callback
     */
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