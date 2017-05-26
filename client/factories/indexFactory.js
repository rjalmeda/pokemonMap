app.factory('indexFactory', function($http){
    var factory = {};
    factory.sampleRoute = function(callback){
        $http.get('/sampleRoute')
            .catch(function(err){
                if(err){
                    console.log(err);
                }
            })
            .then(function(data){
                callback(data);
        });
    };
    return factory;
})