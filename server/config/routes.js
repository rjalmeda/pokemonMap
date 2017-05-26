var sampleController = require('./../controllers/sampleController.js');
module.exports = function(app){
    app.get('/sampleRoute', function(req,res){
        sampleController.sampleRoute(req,res);
    })
};