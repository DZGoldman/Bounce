function title () {
  var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Render = Matter.render,
    Events = Matter.Events,
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


$.get('./design/SVGs/droptone-02.svg').done(function(data) {

           var vertexSets = [],
               color =  '#4ECDC4';

           $(data).find('path').each(function(i, path) {
               console.log(i,path);
               console.log(Body,Svg);
               vertexSets.push(Svg.pathToVertices(path, 30));
           });

           World.add(world, Bodies.fromVertices(400, 80, vertexSets, {
               render: {
                   fillStyle: color,
                   strokeStyle: color
               }
           }, true));
       });


}



title()
