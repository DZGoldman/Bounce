// the main controller file
//global
timerStatus = false;
var playedNotes= []

var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Render = Matter.render,
  Events = Matter.Events,
  Vector = Matter.Vector,
  Body = Matter.Body


$(function() {
  var notes = hardCodedMelody()

  $(document).keydown(function() {
    if (!timerStatus) {
        intervalID = startTimer();
    }
  })

  $('#stop').click(function () {
    timerStatus=false
    window.clearInterval(intervalID);
    console.log(playedNotes);
      visualizer('sim', playedNotes)
  })




})
