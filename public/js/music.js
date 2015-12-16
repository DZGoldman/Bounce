console.log("Hello, Dave");

//Note factory
var Note = function(pitch, time) {
  return {
    pitch: pitch,
    time: time
  }
};

var time = 1.2
var startTimer = function() {
  var ticker = time * 100;
  var intervalId = window.setInterval(function() {
    ticker += 1;
    time = Math.round(ticker) / 100;
    var display = Math.round(ticker - 100) / 100;
    $('#timer').text(display)
  }, 10);
  return intervalId
}

//assigns each note to a color
var colors = function(pitch) {
  var backgroundColor;
  switch (pitch) {
    case 'G':
      backgroundColor = 'rgb(235, 61, 61)'
      break;
    case 'G#':
      backgroundColor = 'rgb(223, 65, 242)'
      break;
    case 'A':
      backgroundColor = 'rgb(228, 145, 19)'
      break;
    case 'A#':
      backgroundColor = 'rgb(213, 0, 0)'
      break;
    case 'B':
      backgroundColor = 'rgb(224, 236, 6)'
      break;
    case 'C':
      backgroundColor = 'rgb(26, 224, 28)'
      break;
    case 'C#':
      backgroundColor = 'rgb(199, 217, 0)'
      break;
    case 'D':
      backgroundColor = 'rgb(36, 214, 209)';
      break;
    case 'D#':
      backgroundColor = 'rgb(26, 71, 208)'
      break;
    case 'E':
      backgroundColor = 'rgb(0, 147, 111)'
      break;
    case 'F':
      backgroundColor = 'rgb(40, 238, 23)'
      break;
    case 'F#':
      backgroundColor = 'rgb(164, 15, 182)'
      break;
    case 'hG':
      backgroundColor = 'rgb(250, 114, 252)'
      break;

    default:

  }
  return backgroundColor
};

//piano
//plays a sound, lights up keyboard, and creates a new note and adds to note array when a key is pressed
$(document).keydown(function(e) {
  var note = ''
  switch (e.which) {
    case 65:
      var note = 'G';
      var key = $('#white-key-0');
      break;
    case 87: //w
      var note = 'G#'
      var key = $('#black-key-0')
      break;
    case 83: //s
      var note = 'A'
      var key = $('#white-key-1');
      break;
    case 69: //s
      var note = 'A#'
      var key = $('#black-key-1');
      break;
    case 68: //d
      var note = 'B'
      var key = $('#white-key-2');
      break;
    case 70: //f
      var note = 'C'
      var key = $('#white-key-3');
      break;
    case 84:
      var note = 'C#'
      var key = $('#black-key-2');
      break;
    case 71: //g
      var note = 'D'
      var key = $('#white-key-4');
      break;
    case 89:
      var note = 'D#';
      var key = $('#black-key-3');
      break;
    case 72: //h
      var note = 'E'
      var key = $('#white-key-5');
      break;
    case 85:
      var note = 'F'
      var key = $('#black-key-4')
      break;
    case 74: //j
      var note = 'F#'
      var key = $('#white-key-6');
      break;
    case 75: //k
      var note = 'hG'
      var key = $('#white-key-7');
      break
    default:
      return;
  };
  //play the note and change piano key color
  if (note && (restState || pianoState)) {
    key.css('background-color', colors(note));
    window.setTimeout(function() {
      if (key.attr('id')[0] == 'w') {
        key.css('background-color', 'white')
      } else {
        key.css('background-color', '#3b3a36')
      }
    }, 200)
    player(note);
    playedNotes.push(Note(note, time))
    console.log('allnotes', playedNotes);
  }
});


//function that actually plays the appropriate sound
var player = function(note) {
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
      var audio = new Audio('http://www.freesound.org/data/previews/95/95332_1579599-lq.mp3');
      audio.play();
      break
    case 'hG':
      playNote('68448');
      break;
  }
}
