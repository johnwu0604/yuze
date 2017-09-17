var request = require('request')
var API_KEY = process.env.FACE_API_KEY
var GROUP_ID = process.env.FACE_GROUP_ID

module.exports = {

    /**
     * Creates a new person group in cognitive services
     *
     * @param name
     * @param callback
     */
    createPerson: function (name, callback) {
        request.post({
            url:'https://eastus2.api.cognitive.microsoft.com/face/v1.0/persongroups/' + GROUP_ID + '/persons',
            body: {
                name: name
            },
            json: true,
            headers: {
                'Ocp-Apim-Subscription-Key': API_KEY
            }
        }, function(err,httpResponse,body){
            return callback(body)
        })
    },

    /**
     * Adds a new face to a person in cognitive services
     *
     * @param id
     * @param url
     * @param callback
     */
    addFace: function (id, url, callback) {
        request.post({
            url:'https://eastus2.api.cognitive.microsoft.com/face/v1.0/persongroups/' + GROUP_ID + '/persons/' + id + '/persistedFaces',
            body: {
                url: url
            },
            json: true,
            headers: {
                'Ocp-Apim-Subscription-Key': API_KEY
            }
        }, function(err,httpResponse,body){
            return callback(body)
        })
    },

    /**
     * Trains the group data in cognitive services
     *
     * @param callback
     */
    trainPersonGroup: function(callback) {
        request.post({
            url:'https://eastus2.api.cognitive.microsoft.com/face/v1.0/persongroups/' + GROUP_ID + '/train',
            headers: {
                'Ocp-Apim-Subscription-Key': API_KEY
            }
        }, function(err,httpResponse,body){
            return callback(body)
        })
    },

    /**
     * Retrieves the current processing status of the training of face data in cognitive services
     *
     * @param callback
     */
    getTrainingStatus: function(callback) {
        request.post({
            url:'https://eastus2.api.cognitive.microsoft.com/face/v1.0/persongroups/' + GROUP_ID + '/training',
            headers: {
                'Ocp-Apim-Subscription-Key': API_KEY
            }
        }, function(err,httpResponse,body){
            return callback(body)
        })
    },

    /**
     * Detects faces in a picture using cognitive services
     *
     * @param url
     * @param callback
     */
    detectFace: function(url, callback) {
        request.post({
            url:'https://eastus2.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false',
            body: {
                url: url
            },
            json: true,
            headers: {
                'Ocp-Apim-Subscription-Key': API_KEY
            }
        }, function(err,httpResponse,body){
            return callback(body)
        })
    },

    /**
     * Identifies a face using cognitive services
     *
     * @param id
     * @param callback
     */
    identifyFace: function(id, callback) {
        request.post({
            url:'https://eastus2.api.cognitive.microsoft.com/face/v1.0/identify',
            body: {
                faceIds: [id],
                personGroupId: GROUP_ID,
                maxNumOfCandidatesReturned: 1
            },
            json: true,
            headers: {
                'Ocp-Apim-Subscription-Key': API_KEY
            }
        }, function(err,httpResponse,body){
            return callback(body)
        })
    }

}