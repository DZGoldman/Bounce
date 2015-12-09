
var startTimer = function() {
  timerStatus = true;
  //global
   time = 0;
var intervalId=  window.setInterval(function() {
    // console.log('?');
    time+=1;
    // console.log(time);
    $('#timer').text(Math.round(time)/100)
  }, 10);
 return intervalId
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


console.log("Hello, Dave");


//piano

$(document).keydown(function(e) {
  console.log('key pressed');
  switch (e.which) {
    // case 65: //a
    // player('G')
    // break;
    case 65:
      player('G')
      break;
    case 83: //s
      player('A')
      break;
    case 65:
      player('A#')
      break;
    case 68: //d
      player('B')
      break;
    case 70: //f
      player('C')
      break;
    case 65:
      player('C#')
      break;
    case 71: //g
      player('D')
      break;
    case 65:
      player('D#')
      break;
    case 72: //h
      player('E')
      break;
    case 65:
      player('F')
      break;
    case 74: //j
      player('F#')
      break;
    case 75: //k
      player('hG')
      break



    default:
      return; // exit this handler for other keys
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
      console.log('low g');
      var audio = new Audio('http://www.freesound.org/data/previews/95/95332_1579599-lq.mp3');
      audio.play();
      break
    case 'hG':
      playNote('68448');
      break;

      break;






  }


}
