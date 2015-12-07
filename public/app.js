
$(function () {
    console.log('I am in here.');
    var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Render= Matter.render,
    Events = Matter.Events;

// create a Matter.js engine
var engine = Engine.create(document.body);
console.log(engine.timing.timeScale=0.7)

var world = engine.world

var circle = Bodies.circle(300, 40, 8, 1000);
circle.restitution =1;
circle.friction = 0;
world.gravity.y=1;
var bodies=[]
bodies.push(circle)
// add all of the bodies to the world


var bottom = Bodies.rectangle(400, 600, 800,50, {isStatic: true})
var top = Bodies.rectangle(400, 0, 800,50, {isStatic: true})
var left = Bodies.rectangle(0, 300, 50 ,600, {isStatic: true})
 var right = Bodies.rectangle(800, 300, 50,600, {isStatic: true})
bodies.push(bottom, top, left, right)

World.add(world, bodies);
engine.render.options.wireframes = false
engine.render.options.background = 'grey';

// run the engine
Engine.run(engine);

Events.on(engine, 'collisionEnd', function(event) {
  //event has info about the two objects
  console.log(event);
})



})
