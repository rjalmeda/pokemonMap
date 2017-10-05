app.controller('indexController', function ($scope, $location, indexFactory) {
    $scope.sampleRoute = function () {
        indexFactory.sampleRoute(function (data) {
            console.log(data);
        })
    };
    $scope.printScreen = {};
    $scope.generateCSS = function () {
        console.log("generating");
        $scope.printScreen.text = "Generating new css";

        function spliceImage(width, height, cellWidth, cellHeight) {
            var cellColumns = Math.floor(width / cellWidth);
            var cellRows = Math.floor(height / cellHeight);
            for (var i = 0; i < cellColumns; i++) {
                for (var k = 0; k < cellRows; k++) {
                    var xDigits = width.toString().length;
                    var yDigits = width.toString().length;
                    var xCordinate = i * cellWidth;
                    var yCordinate = k * cellHeight;
                    if (xCordinate.toString().length < xDigits) {
                        var temp = "";
                        for (var x = 0; x < (xDigits - xCordinate.toString().length); x++) {
                            temp += "0";
                        }
                        for (x = 0; x < xCordinate.toString().length; x++) {
                            temp += xCordinate.toString()[x];
                        }
                        xCordinate = temp;
                    } else {
                        xCordinate = xCordinate.toString();
                    }
                    if (yCordinate.toString().length < yDigits) {
                        temp = "";
                        for (x = 0; x < (yDigits - yCordinate.toString().length); x++) {
                            temp += "0";
                        }
                        for (x = 0; x < yCordinate.toString().length; x++) {
                            temp += yCordinate.toString()[x];
                        }
                        yCordinate = temp;
                    } else {
                        yCordinate = xCordinate.toString();
                    };
                    var divName = xCordinate + yCordinate;
                    console.log(divName);
                    console.log(xCordinate);
                    console.log(yCordinate);
                }
            }
        };
        spliceImage(400, 400, 40, 40);
    };
    $scope.imageRef = {};
    $scope.splitImage = function(){
        console.log("Splitting");
        if(!$scope.imageRef.width || typeof Number($scope.imageRef.width) == "NaN"){
            return console.log("Invalid Width Input");
        } else if (!$scope.imageRef.height || typeof Number($scope.imageRef.height) == "NaN"){
            return console.log("Invalid Height Input");
        } else if (!$scope.imageRef.cellWidth || typeof Number($scope.imageRef.cellWidth) == "NaN"){
            return console.log("Invalid Cell Width Input")
        } else if (!$scope.imageRef.cellHeight || typeof Number($scope.imageRef.cellHeight) == "NaN"){
            return console.log("Invalid Cell Height Input");
        } else {
            var width = Number($scope.imageRef.width),
                height = Number($scope.imageRef.height),
                cellHeight = Number($scope.imageRef.cellHeight),
                cellWidth = Number($scope.imageRef.cellWidth),
                cellColumns = Math.floor(width/cellWidth),
                cellRows = Math.floor(height/cellHeight);
            console.log(cellColumns);
            console.log(cellRows);
            var cellNames = [];
            var rowNames = [];
            var columnNames = [];
            var cssArr = [];
            for(var i = 0; i < cellColumns; i++){
                var columnName = i * (cellWidth);
                columnNames.push(columnName);
                for(var k = 0; k < cellRows; k++){
                    if(i == 0){
                        var rowName = k * (cellHeight);
                        rowNames.push(rowName);
                    }
                    var cssString = 
`
.tile-C${columnName}-R${rowName} {
    background: url(./../pics/tileset.png=);
    background-position: -${columnName}px -${rowName}px;
    width: ${cellWidth}px;
    height: ${cellHeight}px;
}
`
                    cssArr.push(cssString);
                }
            };
            console.log(cssArr.length);;
            $scope.printScreen.text = cssArr.join(" ");
            
        }
    };
});
