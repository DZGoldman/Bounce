console.log('I am in here.');



var visualizer = function(notes) {
  var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Render = Matter.render,
    Events = Matter.Events,
    Vector = Matter.Vector,
    Composite = Matter.Composite,
    Body = Matter.Body;

  //create engine
  var engine = Engine.create(document.getElementById('world'));

  //basic engine params
  engine.timing.timeScale = 1;
  engine.render.options.wireframes = false
  engine.render.options.background = '#b3c2bf';
  Engine.run(engine);

  //set window
  var height = $(window).height() - 100;
  var width = $(window).width();
  engine.render.canvas.width = width;
  engine.render.canvas.height = height;
  $('#world-container').height(height);
  $('#world-container').height(width);

  //basic world params:
  var world = engine.world;
  world.bounds.max.y = height;
  world.bounds.max.x = width;
  world.gravity.y = 0.3;

  var bodies = []
    // create circle (music player)
  var circle = Bodies.circle(width / 2, 0, 4,
    {
      restitution: 1.3,
      friction: 0,
      groupId: 1,
      render:{
        fillStyle: 'rgb(255, 255, 255)',
        strokeStyle: 'rgb(255, 255, 255)'
      }
    }, 1000);
  circle.isCircle=true;
  circle.frictionAir=.01;
  bodies.push(circle);
  console.log(circle);

  World.add(world, bodies);

  //spark factory
  var SparkFactory = function() {
    return Bodies.circle(circle.position.x, circle.position.y, 1, {
        render: {
          fillStyle: circle.render.fillStyle,
          strokeStyle: circle.render.strokeStyle
        },
        groupId: 1,
      },
      1000
    )
  };
  //creates num sparks (called at the end)
  var makeSparks = function(num) {
    var createdSparks = [];
    for (var i = 0; i < num; i++) {
      var spark = SparkFactory()
      createdSparks.push(spark);
      Matter.Body.applyForce(spark, {
        x: 0,
        y: 0
      }, {
        x: .00009 * (Math.random() - .5),
        y: .00009 * (Math.random() - .5)
      })
      World.add(world, spark);
      window.setTimeout(function() {
        Matter.Composite.remove(world, createdSparks)
      }, 1500)
    }
    return createdSparks
  }

  var currentNote = 0;
  var allBlockers = [];

  // on collision, make it ghostly
  Events.on(engine, 'collisionStart', function(event) {

    var body1 = event.pairs[0].bodyA;
    var body2 = event.pairs[0].bodyB
    var collidedBodies = [body1, body2];

    if (body1.isCircle|| body2.isCircle) {
      collidedBodies.forEach(function(body) {
        if (body.groupId == 2) {
          body.isStatic = false;
          window.setTimeout(function () {
            body.isStatic= true
          },150)
          
          circle.render.fillStyle = body.backgroundColor;
          circle.render.strokeStyle = body.backgroundColor;
          body.render.fillStyle = body.backgroundColor;
          body.render.strokeStyle = body.backgroundColor;

          console.log(body);
          window.setTimeout(function() {
            body.render.fillStyle = 'rgb(255, 255, 255)'
            body.render.strokeStyle = 'rgb(255, 255, 255)'
          }, 500)
          body.groupId = 1;
          player(body.note);
        }
      })
    }
  });

  // at each update
  Events.on(engine, "afterTick", function(event) {
    // kill the engine (when user ends it)
    if (kill) {
      engine.enabled = false;
    }
    //make circle loop when it leaves bounds, asteroids style
    if (circle.position.y > world.bounds.max.y) {
      Body.translate(circle, {x: 0,y: -world.bounds.max.y});
    };
    if (circle.position.y < 0) {
      Body.translate(circle, {x: 0,y: world.bounds.max.y});
    };
    if (circle.position.x > world.bounds.max.x) {
      Body.translate(circle, {x: -world.bounds.max.x,y: 0});
    };
    if (circle.position.x < 0) {
      Body.translate(circle, {x: world.bounds.max.x,y: 0});
    };

    var currentTime = engine.timing.timestamp;
    // , check to see if it's time to make a new blocker
    if (currentNote < notes.length) {
      //make a new blocker
      if (currentTime > notes[currentNote].time * 1000) {
        // figure out its location. (!)

        var V = 60.27;
        var A = 10.04;
        var xVel = circle.velocity.x * V;
        var yVel = circle.velocity.y * V;
        var timeGap = 0.2;
        var xLoc = circle.position.x;
        var yLoc = circle.position.y;
        var accel = world.gravity.y * A
        var newBlocker = Bodies.rectangle(xLoc + xVel * timeGap, yLoc + yVel * timeGap +  0.5*accel * timeGap * timeGap, 30, 5, {
          angle: Math.random() * Math.PI,
          //create a new key called note
          note: notes[currentNote].pitch,
          groupId: 2,
          bodyCount: currentNote,
          render: {
            fillStyle:'rgb(255, 255, 255)',
            strokeStyle: 'rgb(255, 255, 255)'
          }
        });
        //give newBlocker additinal params
        newBlocker.isStatic = true;
        newBlocker.backgroundColor = colors(newBlocker.note);

        //blocker also loops, asteroids style
        if (newBlocker.position.y > world.bounds.max.y) {
          Body.translate(newBlocker, {x: 0,y: -world.bounds.max.y});
        };
        if (newBlocker.position.y < 0) {
          Body.translate(newBlocker, {x: 0,y: world.bounds.max.y});
        };
        if (newBlocker.position.x > world.bounds.max.x) {
          Body.translate(newBlocker, {x: -world.bounds.max.x,y: 0});
        };
        if (newBlocker.position.x < 0) {
          Body.translate(newBlocker, {x: world.bounds.max.x,y: 0});
        };
        allBlockers.push(newBlocker)
        World.add(world, newBlocker)
        currentNote += 1;
      };

      // endgame:
    } else if (currentNote == notes.length) {

      console.log('The sim is over');
      currentNote += 1;
      //make each blocker fall, one by one, all pretty:

      window.setTimeout(function () {
        Matter.Composite.remove(world, circle);
        makeSparks(50);

        allBlockers.forEach(function(blocker, index) {
          //insurance, in case a blocker is missed, so it doesn't colide with a spark
          blocker.groupId=1;
          window.setTimeout(function() {
            blocker.isStatic = false
          }, 150 * index)
        })

      }, 1000)

      Events.on(engine, "afterTick", function(event) {

        //when all the blocks have fallen...
        var allFallen = true;
        allBlockers.forEach(function(blocker) {
            if (blocker.position.y < world.bounds.max.y) {
              allFallen = false;
            }
          })
          //reset and releach visualizer with the same notes
        if (allFallen) {
          window.setTimeout(function() {
            $('#world').empty();
            Engine.clear(engine);
            World.clear(world, false)
            Matter.Composite.clear(world, false)
            engine.enabled = false;
            visualizer(notes)
          }, 10)
        }
      })
      return allBlockers
    }
  })
}
