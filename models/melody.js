var mongoose = require('mongoose');

var MelodySchema = new mongoose.Schema({
  noteSequence: Array
});

var Melody = mongoose.model('Melody', MelodySchema)

module.exports = Melody;
