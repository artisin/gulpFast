'use strict';
 
// simple express server
var express = require('express'),
    app = express();
 
app.use(express.static('dist'));
app.get('/', function(req, res) {
    res.sendfile('./dist/index.html');
});
 
app.listen(3000);