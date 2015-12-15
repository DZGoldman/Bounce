
var express  = require('express');
var app      = express();
var morgan   = require ('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Melody = require('./models/melody.js')


app.use(morgan('combined'));

// serve static files from the public directory
app.use(  express.static(__dirname+'/public'));
app.use(bodyParser());

mongoose.connect('mongodb://localhost/tunendrop', function(err) {
   if (err) {
      console.log(err);
   } else {
      console.log('connected the database');
   }
}

);

// set up a default route
app.get('/', function(req,res){
  res.sendFile(__dirname+'/public/index.html')
})


app.post('/new', function (req , res) {
  var newMelody = new Melody();
  newMelody.noteSequence = req.body.data1;
  newMelody.save(function (err) {
    if (err) {
      throw err;
    }
  })
  res.send(req.body)
})

app.get('/recentlycreated', function (req, res) {
   Melody.find({}, function (err, melodies) {
    res.send(melodies.slice(Math.max(melodies.length - 50, 1)))
  })
})


// listen on a port
app.listen(3000, function(){
  console.info('Listening on  port 3000...')
})
