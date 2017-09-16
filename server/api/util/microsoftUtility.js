var request = require('request')
var API_KEY = process.env.FACE_API_KEY
var GROUP_ID = process.env.FACE_GROUP_ID

module.exports = {

    createPerson: function (name, callback) {
        request.post({
            url:'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/' + GROUP_ID + '/persons',
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

    addFace: function (id, url, callback) {
        request.post({
            url:'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/' + GROUP_ID + '/persons/' + id + '/persistedFaces',
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

    trainPersonGroup: function(callback) {
        request.post({
            url:'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/' + GROUP_ID + '/train',
            headers: {
                'Ocp-Apim-Subscription-Key': API_KEY
            }
        }, function(err,httpResponse,body){
            return callback(body)
        })
    },

    getTrainingStatus: function(callback) {
        request.post({
            url:'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/' + GROUP_ID + '/training',
            headers: {
                'Ocp-Apim-Subscription-Key': API_KEY
            }
        }, function(err,httpResponse,body){
            return callback(body)
        })
    },

    detectFace: function(url, callback) {
        request.post({
            url:'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false',
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

    identifyFace: function(id, callback) {
        request.post({
            url:'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/identify',
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