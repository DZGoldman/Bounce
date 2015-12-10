console.log("Hello, Dave");
var time=1
var startTimer = function() {
  timerStatus = true;
  $('#stop').show()
  //global
  var ticker = time*100;
  var intervalId = window.setInterval(function() {
    // console.log('?');
    ticker += 1;
    time= Math.round(ticker) / 100;
    var display = Math.round(ticker-100) / 100;
    // console.log(time);
    $('#timer').text(display)
  }, 10);
  return intervalId
}

var Note = function (pitch, time) {
  return {
    pitch: pitch,
    time: time
  }
};

//piano

$(document).keydown(function(e) {

  console.log('key pressed');

  //console.log(time);

  var note = ''
  switch (e.which) {
    case 65:
    var note ='G';
    console.log('hi');
      //$('label[for=button-1]' ).attr('background', 'black')
      break;
    case 83: //s
      var note = 'A'
            break;
    case 65:
      var note = 'A#'
      break;
    case 68: //d
      var note = 'B'
            break;
    case 70: //f
      var note = 'C'
            break;
    case 65:
      var note = 'C#'
      break;
    case 71: //g
      var note = 'D'
            break;
    case 65:
      var note = 'D#'
      break;
    case 72: //h
      var note = 'E'
            break;
    case 65:
      var note = 'F'
            break;
    case 74: //j
      var note = 'F#'
      break;
    case 75: //k
      var note = 'hG'

      break

    default:
      return; // exit this handler for other keys
  };
  if (note) {
    console.log('note',note);
    player(note);
    playedNotes.push( Note(note, time) )
    console.log('allnotes',playedNotes);
  }

});

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
  //console.log(note);

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
      break;
    case 'B':
      playNote('68438');
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
      //console.log('low g');
      var audio = new Audio('http://www.freesound.org/data/previews/95/95332_1579599-lq.mp3');
      audio.play();
      break
    case 'hG':
      playNote('68448');
      break;


  }


}



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
