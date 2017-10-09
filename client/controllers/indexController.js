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
    $scope.imageRef = {
        "width": "258",
        "height": "20834",
        "cellWidth": "32",
        "cellHeight": "32"
    };
    $scope.tileSet = [];
    $scope.tileColumns = 1;
    $scope.tileColumnsReady = false;
    $scope.splitImage = function () {
        console.log("Splitting");
        if (!$scope.imageRef.width || typeof Number($scope.imageRef.width) == "NaN") {
            return console.log("Invalid Width Input");
        } else if (!$scope.imageRef.height || typeof Number($scope.imageRef.height) == "NaN") {
            return console.log("Invalid Height Input");
        } else if (!$scope.imageRef.cellWidth || typeof Number($scope.imageRef.cellWidth) == "NaN") {
            return console.log("Invalid Cell Width Input")
        } else if (!$scope.imageRef.cellHeight || typeof Number($scope.imageRef.cellHeight) == "NaN") {
            return console.log("Invalid Cell Height Input");
        } else {
            var width = Number($scope.imageRef.width),
                height = Number($scope.imageRef.height),
                cellHeight = Number($scope.imageRef.cellHeight),
                cellWidth = Number($scope.imageRef.cellWidth),
                cellColumns = Math.floor(width/ cellWidth),
                cellRows = Math.floor(height / cellHeight);
            $scope.tileColumns = cellColumns;
            $scope.tileColumnsReady = true;
            console.log(cellColumns);
            console.log(cellRows);
            var cellNames = [];
            var rowNames = [];
            var columnNames = [];
            var cssArr = [];
            for (var i = 0; i < cellRows; i++) {
                var rowName = (i * cellHeight) + 1;
                for (var k = 0; k < cellColumns; k++) {
                    var columnName  = (k * cellWidth) + 1;
                    var backgroundPosition = `-${columnName}px -${rowName}px`;
                    var cssString =
`
.tile-R${rowName}-C${columnName} {
    background: url(/assets/pics/tileset5.png);
    background-position: ${backgroundPosition};
    width: ${cellWidth}px;
    height: ${cellHeight}px;
}
`
                    cssArr.push(cssString);
                    var classString = `tile-R${rowName}-C${columnName}`
                    $scope.tileSet.push(classString);
                }
            };
            var cssText = cssArr.join(" ");
            $scope.printScreen.text = cssText;
            console.log("cssText");
            console.log(cssText);
            console.log("Tile Set");
            console.log($scope.tileSet);
        }
    };
    $scope.print = function(text){
        console.log(text);
    };
    $scope.testMap = function(){
        console.log(maps[0][0].map);
    };
    $scope.currentMap = [];
    var currentMap = maps[0][0].map;
    $scope.displayWorld = function(){
        for(var i = 0; i < currentMap.length; i++){
            for(var k = 0; k < currentMap[i].length; k++){
                $scope.currentMap.push(currentMap[i][k]);
            }
        }
    };
    $scope.copyClass = "";
    $scope.copyTile = function(tile){
        $scope.copyClass = tile;
    };
    $scope.pasteTile = function(idx){
        console.log(idx);
        $scope.currentMap[idx] = $scope.copyClass;
        console.log($scope.currentMap);
    };
});
