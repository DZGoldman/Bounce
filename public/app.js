// the main controller file


var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Render = Matter.render,
  Events = Matter.Events,
  Vector = Matter.Vector;


$(function() {
  var notes = hardCodedMelody()



    visualizer('sim', notes )


})
