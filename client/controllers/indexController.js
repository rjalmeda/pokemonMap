app.controller('indexController', function ($scope, $location, indexFactory) {
    $scope.printScreen = {};
    $scope.currentRegion = {
        name: "kanto"
    };
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
//            console.log(cellColumns);
//            console.log(cellRows);
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
//            console.log("cssText");
//            console.log(cssText);
//            console.log("Tile Set");
//            console.log($scope.tileSet);
        }
    };
    $scope.splitImage();
    $scope.print = function(text){
        console.log(text);
    };
    $scope.testMap = function(){
        console.log(maps[0][0].map);
    };
    $scope.rawMap = [];
    $scope.copyClass = "";
    $scope.copyTile = function(tile){
        $scope.copyClass = tile;
    };
    $scope.toggleTile = "FG";
    $scope.toggleFGBG = function(){
        if ($scope.toggleTile == "BG"){
            $scope.toggleTile = "MG";
        } else if ($scope.toggleTile == "MG"){
            $scope.toggleTile = "FG";
        } else {
            $scope.toggleTile = "BG"
        };
    };
    $scope.pasteTile = function(idx){
        $scope.backupMap();
        console.log($scope.copyClass);
        if($scope.copyClass == "P"){
            $scope.rawMap[idx][3] = "P";
        } else if ($scope.copyClass == "U"){
            $scope.rawMap[idx][3] = "U"
        } else if ($scope.copyClass == "D" && $scope.rawMap[idx][2] == "D"){
            $scope.rawMap[idx][4] = ""
        } else if ($scope.copyClass == "D"){
            $scope.rawMap[idx][4] = "D"
        } else if ($scope.toggleTile == "FG"){
            $scope.rawMap[idx][2] = $scope.copyClass;
        } else if ($scope.toggleTile == "MG"){
            $scope.rawMap[idx][1] = $scope.copyClass;
        } else if ($scope.toggleTile == "BG"){
            $scope.rawMap[idx][0] = $scope.copyClass;
        };
        $scope.clearRedo();
        console.log($scope.currentMap);
    };
    $scope.compileMap = function(){
        var mapTemp = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
        var unsortedMap = $scope.rawMap.slice();
        unsortedMap.reverse();
        for (var i = 0; i < 15; i++){
            for( var k = 0; k < 20; k++){
                mapTemp[i][k] = unsortedMap.pop();
            }
        };
        console.log(mapTemp);
        return mapTemp;
    };
    $scope.copyPassable = function(){
        $scope.copyClass = "P";
        console.log($scope.copyClass);
    };
    $scope.copyUnpassable = function(){
        $scope.copyClass = "U";
        console.log($scope.copyClass);
    };
    $scope.copyDoor = function(){
        $scope.copyClass = "D";
    };
    $scope.eraseClass = function(){
        $scope.copyClass = "";
    };
    $scope.mapHistory = [];
    $scope.mapRedoHistory = [];
    $scope.backupMap = function(){
        var tempMap = [];
        for (var i = 0; i < $scope.rawMap.length; i++){
            var tempData = $scope.rawMap[i].slice();
            tempMap.push(tempData);
        };
        $scope.mapHistory.push(tempMap);
    };
    $scope.undoMap = function(){
        if($scope.mapHistory.length == 0){
            return console.log("nothing left to undo");
        }
        console.log("undo");
        var tempMap = [];
        for (var i = 0; i < $scope.rawMap.length; i++){
            var tempData = $scope.rawMap[i].slice();
            tempMap.push(tempData);
        };
        $scope.mapRedoHistory.push(tempMap);
        console.log(tempMap);
        $scope.rawMap = $scope.mapHistory.pop();
    };
    $scope.redoMap = function(){
        if($scope.mapRedoHistory.length == 0){
            return console.log("nothing left to redo");
        };
        $scope.backupMap();
        console.log($scope.mapRedoHistory);
        $scope.rawMap = $scope.mapRedoHistory.pop();
    };
    $scope.clearRedo = function(){
        $scope.mapRedoHistory = [];
    };
    $scope.bucketMap = function(){
        console.log("Bucket");
        $scope.backupMap();
        $scope.clearRedo();
        if($scope.copyClass == "P"){
            for(var i = 0; i < $scope.rawMap.length; i++){
                $scope.rawMap[i][3] = "P";
            }
        } else if ($scope.copyClass =="U"){
            for(var i = 0; i < $scope.rawMap.length; i++){
                $scope.rawMap[i][3] = "U";
            }
        } else if ($scope.toggleTile == "FG"){
            for(var i = 0; i < $scope.rawMap.length; i++){
                $scope.rawMap[i][2] = $scope.copyClass;
            }
        } else if ($scope.toggleTile == "BG"){
            for(var i = 0; i < $scope.rawMap.length; i++){
                $scope.rawMap[i][0] = $scope.copyClass;
            }
        } else if ($scope.toggleTile == "MG"){
            for(var i = 0; i < $scope.rawMap.length; i++){
                $scope.rawMap[i][1] = $scope.copyClass;
            }
        }
    };
    
    $scope.currentMap = {
        x: 20,
        y: 20
    };
    
    $scope.saveMap = function(){
        $scope.currentMap.map.raw = $scope.rawMap;
        $scope.currentMap.map.compiled = $scope.compileMap();
        console.log($scope.currentMap);
        indexFactory.saveMap($scope.currentMap, function(data){
            console.log(data);
            $scope.currentMap = data.data.map;
            $scope.rawMap = $scope.currentMap.map.raw;
        });
    };
    
    $scope.updateCoordinates = function(callback){
        $scope.currentMap.mapCoordinates = "" + $scope.currentMap.x + "," + $scope.currentMap.y;
        if(callback){
            callback();
        };
    };
    $scope.fetchMap = function(){
        $scope.updateCoordinates(function(){
//            console.log("Fetching");
            indexFactory.fetchMap($scope.currentMap.mapCoordinates, function(data){
//                console.log(data);
                $scope.currentMap = data;
                $scope.rawMap = data.map.raw;
            })
        });
    };
    $scope.showCurrentMap = function(){
        console.log($scope.currentMap);
    };
    $scope.fetchMap();
});

//sample world object:
//var sampleRegion = 
//    {
//        region: "Kanto",
//        worldMap: [
//            [],
//            [],
//            [],
//            [],
//            [],
//            [],
//            [],
//            [],
//            [],
//            [],
//            [],
//            [],
//            [],
//            [],
//            [],
//            []
//        ],
//        worldMusic: ""
//    }
