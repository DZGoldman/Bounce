// the main controller file
//global
timerStatus = false;
kill = false
var playedNotes= [];

var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Render = Matter.render,
  Events = Matter.Events,
  Vector = Matter.Vector,
  Body = Matter.Body


$(function() {
  //var notes = hardCodedMelody()

  $(document).keydown(function() {
    if (!timerStatus) {
        //  playedNotes=[];
          killSimulation();
          intervalID = startTimer();
    }
  })

  $('#stop').click(function () {
    $('#world').empty()
      kill=false
      timerStatus=false
      $('#stop').hide();
      window.clearInterval(intervalID);
      // console.log(playedNotes);
        console.log(playedNotes);
          visualizer('sim', playedNotes);


    });

    $('#stop-sim').click(function () {
      killSimulation();
      playedNotes=[];
    })

    var killSimulation = function () {
      console.log('stopping the sim');
      kill=true;
      time=1;
      timerStatus=false;
      $('#stop').hide();
    }




})
