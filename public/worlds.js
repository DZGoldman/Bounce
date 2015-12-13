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



    var engine = Engine.create(document.getElementById('world') );
  }
  //start with what the visualizer and simulation have in common:
  //basic world params
  var height = $(window).height()-100; var width = $(window).width();
  //$("html, body").attr('height', height)
  engine.render.canvas.width = width;
  engine.render.canvas.height = height;

  $('#world-container').height(height);
  $('#world-container').height(width);


var world = engine.world;
world.bounds.max.y = height;
world.bounds.max.x = width;
//$('#world').attr('height', height)

  world.gravity.y = 0.6;
  var bodies = []

  // create circle (music player)

  var circle = Bodies.circle(width/2, 0, 8, 1000
);
  circle.restitution = 1.2;
  circle.friction = 0;
  //circle.frictionAir=0;
  circle.groupId=1;
  circle.render.fillStyle ='rgb(255, 255, 255)';
  circle.render.strokeStyle =' rgb(255, 255, 255)'

  bodies.push(circle)



  // create walls
  // var bottom = Bodies.rectangle(400, 600, 800, 10, {
  //   isStatic: true
  // })
  // var top = Bodies.rectangle(400, 0, 800, 10, {
  //   isStatic: true
  // })
  // var left = Bodies.rectangle(0, 300, 10, 600, {
  //   isStatic: true
  // })
  // var right = Bodies.rectangle(800, 300, 10, 600, {
  //   isStatic: true
  // })
  // bodies.push(bottom, top, left, right);

  //add all bodies to world
  World.add(world, bodies);




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
          //give it its background

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

  }
  else if (type=='sim') {

     engine.render.options.wireframes = false
     engine.render.options.background = '#b3c2bf';
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
            circle.render.fillStyle = body.backgroundColor;
            circle.render.strokeStyle = body.backgroundColor;
            body.render.fillStyle = body.backgroundColor;
            body.render.strokeStyle = body.backgroundColor;
            window.setTimeout(function () {
              body.render.fillStyle = 'rgb(255, 255, 255)'
              body.render.strokeStyle = 'rgb(255, 255, 255)'
            }, 300)
            body.groupId=1;
            player(body.note)
          }
        })
      });
      // at each update
      Events.on(engine, "afterTick", function(event) {
        // console.log(circle.velocity.y)
        if (kill) {
          engine.enabled= false;
        }

        if(circle.position.y>world.bounds.max.y){
           Body.translate( circle, {x:0,y:-world.bounds.max.y} );
        };
        if (circle.position.y<0) {
           Body.translate( circle, {x:0,y:world.bounds.max.y} );
        };
        if (circle.position.x>world.bounds.max.x) {
          Body.translate( circle, {x:-world.bounds.max.x,y:0} );
        };
        if (circle.position.x<0) {
          Body.translate( circle, {x:world.bounds.max.x,y:0} );
        };

        var currentTime = engine.timing.timestamp;
        // at the right time...
        if (currentNote<notes.length) {
          //make a new blocker
        if (currentTime > notes[currentNote].time * 1000) {
          // figure out its location

          var V = 60.27;
          var A = 10.04;

          var xVel= circle.velocity.x*V;
          var yVel = circle.velocity.y*V;
          var timeGap = 0.2;
          var xLoc = circle.position.x;
          var yLoc = circle.position.y;

          var accel = world.gravity.y * A

          var newBlocker = Bodies.rectangle(xLoc+ xVel*timeGap, yLoc+yVel*timeGap + 0.5*accel*timeGap*timeGap, 60, 10, {


            angle: Math.random() * Math.PI,
            //create a new key called note
            note: notes[currentNote].pitch,
            groupId: 2,
            bodyCount: currentNote,

          });

          newBlocker.isStatic = true;
          newBlocker.render.fillStyle =' rgb(255, 255, 255)';
          newBlocker.render.strokeStyle =' rgb(255, 255, 255)';

          //newBlocker.render.fillStyle = colors(newBlocker.note);
          newBlocker.backgroundColor =colors(newBlocker.note);


          if(newBlocker.position.y>world.bounds.max.y){
             Body.translate( newBlocker, {x:0,y:-world.bounds.max.y} );
          };
          if (newBlocker.position.y<0) {
             Body.translate( newBlocker, {x:0,y:world.bounds.max.y} );
          };
          if (newBlocker.position.x>world.bounds.max.x) {
            Body.translate( newBlocker, {x:-world.bounds.max.x,y:0} );
          };
          if (newBlocker.position.x<0) {
            Body.translate( newBlocker, {x:world.bounds.max.x,y:0} );
          };


          allBlockers.push(newBlocker)
          World.add(world, newBlocker)

          currentNote += 1;

        };

      }else if (currentNote==notes.length ) {

        console.log('The sim is over');
        currentNote+=1;
        allBlockers.forEach(function (blocker, index) {
          window.setTimeout(function () {
              blocker.isStatic = false
          },150*index)

        })

        Events.on(engine, "afterTick", function(event) {
          if (circle.position.y>world.bounds.max.y-10) {
            circle.mass=Infinity

          };
          var allFallen = true;

          allBlockers.forEach(function (blocker) {
            if(blocker.position.y<world.bounds.max.y){
              allFallen = false;
            }
          })

          if (allFallen) {

        window.setTimeout(function () {
        console.log('test');
            $('#world').empty();
            Engine.clear(engine);
            World.clear(world, false)
            Matter.Composite.clear(world, false)
            engine.enabled= false;
            //Engine.clear(engine, true)
             visualizer('sim', notes )
    }, 10)
  }


  })


        window.setTimeout(function () {

          // visualizer('vis', newBlockers)
        }, 1000)

          //Matter.Engine.clear(world)

        return allBlockers

      }
      })
  }else {
    //neither sim not vis
    console.log("You have made a very serious mistake");
  }



}
