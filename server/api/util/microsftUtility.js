var request = require('request')
var API_KEY = '77d70f482aaf4bcd99940c740abd778a'
var GROUP_ID = '12345'

module.exports = {

    createPerson: function (id, callback) {
        request.post({
            url:'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/' + GROUP_ID + '/persons',
            body: {
                name: id
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