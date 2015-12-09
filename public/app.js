//global
timerStatus = false;

// the main controller file



var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Render = Matter.render,
  Events = Matter.Events,
  Vector = Matter.Vector,
  Body = Matter.Body


$(function() {
  var notes = hardCodedMelody()

  $('#timer').click(function() {
    if (!timerStatus) {
        intervalID = startTimer();
    }

    console.log(intervalID);
  })

  $('#stop').click(function () {
    timerStatus=false
    window.clearInterval(intervalID)
  })



  visualizer('sim', notes)


})
