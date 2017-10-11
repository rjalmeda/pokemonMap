var sampleController = require('./../controllers/sampleController.js');
var mapController = require('./../controllers/mapController.js');
module.exports = function(app){
    app.get('/sampleRoute', function(req,res){
        sampleController.sampleRoute(req,res);
    })
    app.post('/saveMap', function(req,res){
        mapController.saveMap(req,res);
    })
    app.get('/fetchMap/:mapCoord', function(req,res){
        mapController.fetchMap(req,res);
    })
    app.post('/saveWorld', function(req,res){
        mapController.saveWorld(req,res);
    })
};