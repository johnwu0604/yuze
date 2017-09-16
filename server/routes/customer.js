module.exports = function (app) {

    app.post('/customer', function (req, res) {
        res.send('Customer posted')
    })

}