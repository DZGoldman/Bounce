// the main controller file
// window.parent.document.body.style.zoom = .5;
var kill = false
var playedNotes = [];
var timerID;

window.onkeydown = function(e) {
  return !(e.keyCode == 32);
};

// three states: rest, piano, sim
var restState = true,
  pianoState = false,
  simState = false;

$(function() {
  var keysValues = [65,87,83,69,68,70,84,71,84,71,89,72,85,74,75]

  $(document).keydown(function(e) {
    //spacebar triggers restState from simState
    if (e.keyCode == 32 && simState) {
      rest();
      //piano key press triggers pianoState from resttate
      //TODO make it only the piano keys
    } else if (restState && keysValues.includes(e.keyCode)) {
      piano()
        //spacebar triggers simState from piano state
    } else if (e.keyCode == 32 && pianoState) {
      saveMelody()
      simulator()
    }
  });

  $.get('/recentlycreated').done(function(data) {

    data.reverse().forEach(function(melody) {
      //console.log(melody);
      var $melodyDiv = $('<div>');
      $melodyDiv.attr('class', 'top-five');
      $imageThing = $('<div>');
      $imageThing.attr('class', 'image');


      if (melody.noteSequence[0]) {
        var firstColor = colors(melody.noteSequence[0].pitch);
        // $imageThing.css('background-color', 'black');
        //  $imageThing.text('CLICK ME');
        $melodyDiv.append($imageThing)

        $melodyDiv.click(function() {
          playedNotes = melody.noteSequence;
          simulator()
        })
        $('#last-five-container').append($melodyDiv)
      }
    })
  })

}) // end of on-load


var rest = function() {
  restState = true;
  simState = false;
  pianoState = false //insurance
  $('#stop').hide('fast');
  $('#start').hide('fast');
  $('#instructions').show('fast');
  $('#last-five-container').fadeIn('slow')
  playedNotes = [];
  kill = true;
  time = 1.2;
  $('#timer').text('0:00');
  $("html, body").animate({
    scrollTop: 0
  }, 900);
};
rest() //run rest when page is first opened

var piano = function() {
  pianoState = true;
  restState = false;
  simState = false //insurance;
  $('#stop').hide('fast');
  $('#start').show('fast');
  $('#instructions').hide('fast');
  $('#last-five-container').fadeOut('slow')
  timerID = startTimer();

}

var simulator = function() {

  pianoState = false;
  simState = true;
  restState = false; //insurance;
  $('#stop').show('fast');
  $('#start').hide('fast');
  $('#instructions').hide('fast');
  $('#last-five-container').fadeOut('slow')
  console.log('sim time');
  //stop timer
  window.clearInterval(timerID)
    //clear board
  $('#world').empty(); //is this enough?;
  kill = false;
  // actually run darn thing;

  visualizer(playedNotes);
  $("html, body").animate({
    scrollTop: 270
  }, 1500);
}

var saveMelody = function() {
  var objectData = {
    data1: playedNotes
  }

  $.ajax({
    dataType: 'json',
    data: objectData,
    type: 'post',
    url: '/new'
  })
}
