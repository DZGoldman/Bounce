
var express  = require('express');
var app      = express();
var morgan   = require ('morgan');

/************/

// let's get some good logging in the console
app.use(morgan('combined'));

// serve static files from the public directory
app.use(  express.static(__dirname+'/public'));

// set up a default route
app.get('/', function(req,res){
  res.sendFile(__dirname+'/public/index.html')
})

// listen on a port
app.listen(3000, function(){
  console.info('Listening on  port 3000...')
})
