//Require what you need
var express = require('express');
//Create object to represent the express application
var app = express();
 
//Specify what folder to use as a static folder
app.use(express.static(__dirname+'/public'));  

app.listen(3000);
console.log('Running on port 3000'); 