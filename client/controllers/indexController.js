app.controller('indexController', function($scope, $location, indexFactory){
    $scope.sampleRoute = function(){
        indexFactory.sampleRoute(function(data){
            console.log(data);
        })
    }
});