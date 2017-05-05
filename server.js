var express = require('express'),
    session = require('express-session'),
    bp      = require('body-parser'),
    path    = require('path'),
    app     = express(),
    serverport = 8000;

app.use(bp.json());
app.use(express.static(path.join(__dirname, '/client')));
app.use(express.static(path.join(__dirname, '/bower_components')));


require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(serverport, function(){
    console.log(`Now Listening on port ${serverport}`);
});

