console.log('I am in here.');
//type='sim' or 'vis'
var visualizer = function(type, bodiesOrNotes) {

  var notes = bodiesOrNotes
  var bodies = bodiesOrNotes

  if (type == 'vis') {
    var engine = Engine.create(  document.body );
  } else if (type == 'sim') {
    var engine = Engine.create(document.body );

  }
  //start with what the visualizer and simulation have in common:

  var world = engine.world

  //make the player
  var circle = Bodies.circle(300, 40, 8, 1000);
  circle.restitution = 1;
  circle.friction = 0;
  world.gravity.y = .1;
  var bodies = []
  bodies.push(circle)


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
  Engine.run(engine);



  //now the differences
  if (type == 'vis') {
    console.log(engine);
    engine.timing.timeScale = 1;
    engine.render.options.wireframes = false
    engine.render.options.background = 'grey';

    //TODO add in bodies
      World.add(world, bodies)
    // TODO add colision event for playing notes, actually sound the notes on collision

    // TODO add some "finished" event



  }else if (type=='sim') {
      console.log(engine);



      engine.timing.timeScale = 3;
      // create the platforms-
      // TODO clean up as one function?
      var currentNote = 0;
      var allBlockers=[];

      // TODO actually create the blocks in the right place

      Events.on(engine, "afterTick", function(event) {
        var currentTime = engine.timing.timestamp;
        if (currentNote<notes.length) {



        if (currentTime > notes[currentNote].time * 1000) {
          var xLoc = circle.position.x;
          var yLoc = circle.position.y;

          var newBlocker = Bodies.rectangle(xLoc, yLoc, 40, 40, {
            render: {
              strokeStyle: '#777'
            },
            isStatic: true,
            angle: Math.random() * Math.PI,
            //create a new key called note
            note: notes[currentNote].pitch

          });

          allBlockers.push(newBlocker)
          World.add(world, newBlocker)



          currentNote += 1;


        }
      }else if (currentNote==notes.length) {
        console.log('The sim is over');
        console.log(allBlockers);
        currentNote+=1;
        visualizer('vis', allBlockers )

          //Matter.Engine.clear(world)

        return allBlockers

      }
      })




  }else {

    console.log("You have made a very serious mistake");
  }






  // run the engine

  Events.on(engine, 'collisionEnd', function(event) {
    //event has info about the two objects

  });



}
