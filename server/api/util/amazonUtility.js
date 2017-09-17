var s3 = require('s3')
var client = s3.createClient({
    maxAsyncS3: 20,
    s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        region: process.env.AWS_REGION,
        signatureVersion: 'v3'
    }
})

module.exports = {

    /**
     * Uploads a directory from the local environment to amazon S3
     *
     * @param localDir
     * @param remoteDir
     * @param done
     */
    uploadDir: function (name, localDir, callback) {
        var params = {
            localDir: localDir,
            s3Params: {
                Bucket: process.env.AWS_BUCKET,
                Prefix: 'faces/' + name,
                ACL: 'public-read'
            }
        }
        var uploader = client.uploadDir(params)
        var photos = []
        uploader.on('error', function (err) {
            console.error('Error uploading director:', err.stack)
            throw err.stack
        })
        uploader.on('fileUploadEnd', function (localFilePath, s3Key) {
            console.log('S3 Key: ', s3Key)
            photos.push(s3Key);
        })
        uploader.on('end', function () {
            setTimeout(function() {
                console.log('Finished uploading directory')
                return callback({ photos: photos })
            }, 3000)
        })
    },

    /**
     * Uploads a file from the local machine to amazon S3
     *
     * @param localFile
     * @param remoteFile
     * @param callback
     */
    uploadFile: function (localFile, remoteFile, callback) {
        var params = {
            localFile: localFile,
            s3Params: {
                Bucket: process.env.AWS_BUCKET,
                Key: remoteFile,
                ACL: 'public-read'
            },
        }
        var uploader = client.uploadFile(params)
        uploader.on('error', function(err) {
            console.error("Unable to upload:", err.stack)
        })
        uploader.on('end', function() {
            console.log("Done uploading")
            return callback()
        })
    }

}