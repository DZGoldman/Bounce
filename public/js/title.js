function title () {
  var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Render = Matter.render,
    Events = Matter.Events,
    Vertices = Matter.Vertices,
    Vector = Matter.Vector,
    Composite = Matter.Composite,
    Body = Matter.Body,
    Svg = Matter.Svg,
    Common = Matter.Common;


  //create engine
  var engine = Engine.create(document.getElementById('title'));

  //basic engine params
  engine.timing.timeScale = 1;
  engine.render.options.wireframes = false
  engine.render.options.background = 'white';
  Engine.run(engine);

  var height = $(window).height()*.3
  var width = $(window).width();
  engine.render.canvas.width = width;
  engine.render.canvas.height = height;
  var world = engine.world;
  world.bounds.max.y = height;
  world.bounds.max.x = width;
  world.gravity.y = 0.3;

for (var i = 2; i <= 10; i++) {
(function (i) {

  var prefix = '0';
  if (String(i).length==2) {
    prefix=''
  }


$.get('./design/SVGs/droptone-'+prefix+ i +'.svg').done(function(data) {

           var vertexSets = [];
            var   color =  'black';

           $(data).find('path').each(function(i, path) {
             var points = Svg.pathToVertices(path, 30);
            vertexSets.push(Vertices.scale(points, 0.4, 0.4));
           });

           World.add(world, Bodies.fromVertices(200+(40*i), 80, vertexSets, {
               render: {
                   fillStyle: color,
                   strokeStyle: color
               },
               isStatic: true
           }, true));
       });
     })(i)
   } // end of for loop

} // end of title fucntion



title()
