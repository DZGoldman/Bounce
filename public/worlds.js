console.log('I am in here.');
//type='sim' or 'vis'
var visualizer = function(type, newBlockersOrNotes) {

//either musical notes or blocker
  var notes = newBlockersOrNotes
  var newBlockers = newBlockersOrNotes

//create engine, hidden if it s the simulator
  if (type == 'vis') {
    var engine = Engine.create(  document.body );
  } else if (type == 'sim') {
    var engine = Engine.create(document.body );
  }
  //start with what the visualizer and simulation have in common:
  //basic world params
  var world = engine.world
  world.gravity.y = .3;
  var bodies = []

  // create circle (music player)
  var circle = Bodies.circle(300, 40, 8, 1000
);
  circle.restitution = 1;
  circle.friction = 0;
  circle.frictionAir=0;
  circle.groupId=1;
  bodies.push(circle)


  // create walls
  var bottom = Bodies.rectangle(400, 600, 800, 10, {
    isStatic: true
  })
  var top = Bodies.rectangle(400, 0, 800, 10, {
    isStatic: true
  })
  var left = Bodies.rectangle(0, 300, 10, 600, {
    isStatic: true
  })
  var right = Bodies.rectangle(800, 300, 10, 600, {
    isStatic: true
  })
  bodies.push(bottom, top, left, right);

  //add all bodies to world
  World.add(world, bodies)

  Engine.run(engine);

  //now the differences
  // start with visualizer
  if (type == 'vis') {
    //set first body to have id=2
    newBlockers[0].groupId=2
    //set basic parameters
    engine.timing.timeScale = 1;
    //rendering
    // engine.render.options.wireframes = false
    // engine.render.options.background = 'grey';
    World.add(world, newBlockers);


    // TODO add some "finished" event
    // on collision, even collision...
    Events.on(engine, 'collisionEnd', function(event) {
      var collidedBodies = [event.pairs[0].bodyA, event.pairs[0].bodyB];

      collidedBodies.forEach(function (body) {
        //check if any of them are blockers (id of 2)
        if (body.groupId==2) {
          //play the approprite note...
          player(body.note);
          // make it ghostly
          body.groupId=1;
          //update groupId of the next body - make it not ghostly
          var nextBlocker=newBlockers[body.bodyCount+1];
          nextBlocker.groupId=2;
        }
      })
    });

  }else if (type=='sim') {
      //set basic parameters
      engine.timing.timeScale =1;
      // create the blockers-
      // TODO clean up as one function?
      var currentNote = 0;
      var allBlockers=[];
      // on collision, make it ghostly
      Events.on(engine, 'collisionEnd', function(event) {
        var collidedBodies = [event.pairs[0].bodyA, event.pairs[0].bodyB];
        //if the id is 2, change it back to one
        collidedBodies.forEach(function (body) {
          if (body.groupId==2) {
            body.groupId=1;
            player(body.note)
          }
        })
      });
      // at each update
      Events.on(engine, "afterTick", function(event) {

        var currentTime = engine.timing.timestamp;
        // at the right time...
        if (currentNote<notes.length) {
          //make a new blocker
        if (currentTime > notes[currentNote].time * 1000) {
          // figure out its location
          var xVel= circle.velocity.x;
          var yVel = circle.velocity.y;
          var timeGap = 20;
          var xLoc = circle.position.x;
          var yLoc = circle.position.y;

          var newBlocker = Bodies.rectangle(xLoc+ xVel*timeGap, yLoc+yVel*timeGap, 40, 40, {
            render: {
              strokeStyle: '#777'
            },
            isStatic: true,
            angle: Math.random() * Math.PI,
            //create a new key called note
            note: notes[currentNote].pitch
          });
          //give blocker different ID, so it collides with circle
          newBlocker.groupId=2;
          newBlocker.bodyCount = currentNote

          allBlockers.push(newBlocker)
          World.add(world, newBlocker)

          currentNote += 1;
        }
      }else if (currentNote==notes.length) {
        console.log('The sim is over');

        currentNote+=1;
        window.setTimeout(function () {
            visualizer('vis', allBlockers )
        }, 3000)

          //Matter.Engine.clear(world)

        return allBlockers

      }
      })
  }else {
    //neither sim not vis
    console.log("You have made a very serious mistake");
  }






}
