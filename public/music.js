// var notesArray = [{
//     pitch: 'G',
//     time: 1
//   }, {
//     pitch: 'C',
//     time: 2
//   }, {
//     pitch: 'E',
//     time: 5
//   }, {
//     pitch: 'C',
//     time: 5.5
//   }, {
//     pitch: 'D',
//     time: 6
//   }, {
//     pitch: 'C',
//     time: 9
//   }, {
//     pitch: 'A',
//     time: 10
//   }
// ,{pitch:'G',
// time: 13},
// {pitch:'G',
// time: 14},
// {pitch:'C',
// time: 17},
// {pitch:'E',
// time: 18},
// {pitch:'C',
// time: 21},
// {pitch:'E',
// time: 22},
// {pitch:'D',
// time: 25},
// {pitch:'G',
// time: 26}


// pitch: 'D',
// time: 1
// }, {
// pitch: 'A',
// time: 2
// }, {
// pitch: 'D',
// time: 3
// }, {
// pitch: 'A',
// time: 5
// }, {
// pitch: 'D',
// time: 7
// },


console.log("Hello, Dave");

var hardCodedMelody = function() {
  var notesArray = [{

    pitch: 'C',
       time: 1
     }, {
       pitch: 'D',
       time: 2
     }, {
       pitch: 'E',
       time: 3
     }, {
       pitch: 'F',
       time: 4
     }, {
       pitch: 'G',
       time: 5
     }


  ];

  return notesArray

}

var player = function(note) {
  console.log(note);

  var playNote = function(id) {
    var audio = new Audio('http://www.freesound.org/data/previews/68/' + id + '_871124-lq.mp3');
    audio.play();
  }

  switch (note) {
    case 'G#':
      playNote('68447')
      break;
    case 'A':
      playNote('68437')
      break;

    case 'A#':
      playNote('68439');
      audio.play();
      break;
    case 'B':
      playNote('68438');
      audio.play();
      break;
    case 'C':
      playNote('68441')
      break;
    case 'C#':
      playNote('68440');
      break;
    case 'D':
      playNote('68442')
      break;
    case 'D#':
      playNote('68444')
      break;
    case 'E':
      playNote('68443')
      break;

    case 'F':
      playNote('68446');

      break;
    case 'F#':
      playNote('68445');

      break;
    case 'G':
      playNote('68448');
      break;
    case 'G#':

      playNote('68448');

      break;






  }


}
