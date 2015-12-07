$(function() {

  console.log('I am in here.', test);
  var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Render = Matter.render,
    Events = Matter.Events;

  // create a Matter.js engine
  var engine = Engine.create(document.body);
  engine.timing.timeScale = 1;

  var world = engine.world

  //make the player
  var circle = Bodies.circle(300, 40, 8, 1000);
  circle.restitution = 1;
  circle.friction = 0;
  world.gravity.y = 1;
  var bodies = []
  bodies.push(circle)


  //make walls
  var bottom = Bodies.rectangle(400, 600, 800, 50, {
    isStatic: true
  })
  var top = Bodies.rectangle(400, 0, 800, 50, {
    isStatic: true
  })
  var left = Bodies.rectangle(0, 300, 50, 600, {
    isStatic: true
  })
  var right = Bodies.rectangle(800, 300, 50, 600, {
    isStatic: true
  })
  bodies.push(bottom, top, left, right)

  World.add(world, bodies);
  engine.render.options.wireframes = false
  engine.render.options.background = 'grey';

  // run the engine
  Engine.run(engine);

  Events.on(engine, 'collisionEnd', function(event) {
    //event has info about the two objects

  });

  //playing notes

  var currentNote = 0;
  Events.on(engine, "afterTick", function(event) {
      var currentTime = engine.timing.timestamp;

    if (currentTime > timing[currentNote] * 1000) {
      var xLoc = circle.position.x;
      var yLoc = circle.position.y;

      
      console.log(notes[currentNote]);
      currentNote+=1


    }
  })



})
