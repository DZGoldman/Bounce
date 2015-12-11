// the main controller file
//global
var kill = false
var playedNotes = [];
var timerID;

window.onkeydown = function(e) {
  return !(e.keyCode == 32);
};

var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Render = Matter.render,
  Events = Matter.Events,
  Vector = Matter.Vector,
  Body = Matter.Body;



// three states: rest, piano, sim
var restState=true, pianoState=false, simState=false;


$(function() {

  $(document).keydown(function(e) {
    //spacebar triggers restState from simState
    if (e.keyCode == 32 && simState) {
        rest();
    //piano key press triggers pianoState from resttate
    //TODO make it only the piano keys
    }else if (restState) {
      piano()
        //spacebar triggers simState from piano state
    }else if (e.keyCode==32 && pianoState) {
      simulator()
    }


  });

})





var rest=  function () {
  restState = true; simState = false; pianoState = false //insurance
  $('#stop').hide(); $('#start').hide(); $('#instructions').show();
  playedNotes = [];
  kill= true;
  time= 1;
  $('#timer').text('0:00');
  $("html, body").animate({ scrollTop: 0 }, 900);

};
rest()

var piano = function () {
  pianoState = true; restState = false; simState = false //insurance;
  $('#stop').hide(); $('#start').show(); $('#instructions').hide();
  timerID = startTimer();

}

var simulator = function () {
  var objectData = {data1: playedNotes}

  $.ajax(
    {
    dataType: 'json',
    data: objectData,
    type: 'post',
    url: '/new'
  }
).done(function (data) {
    console.log(data);
  })


  pianoState = false;  simState = true; restState = false; //insurance;
    $('#stop').show(); $('#start').hide(); $('#instructions').hide();
  console.log('sim time');
  //stop timer
  window.clearInterval(timerID)
  //clear board
  $('#world').empty(); //is this enough?;
  kill = false;
  // actually run the thing;

   visualizer('sim', playedNotes);
   $("html, body").animate({ scrollTop: $(window).height()-920 }, 1200 );


}








// $(document).keydown(function() {
//   if (!timerStatus) {
//       //  playedNotes=[];
//         killSimulation();
//         intervalID = startTimer();
//   }
// })
//
// $('#start').click(function () {
//   $('#world').empty()
//     kill=false
//     timerStatus=false
//     $('#stop').hide();
//     window.clearInterval(intervalID);
//     // console.log(playedNotes);
//       console.log(playedNotes);
//         visualizer('sim', playedNotes);
//
//
//   });
//
//   $('#stop').click(function () {
//     killSimulation();
//     playedNotes=[];
//});


// var killSimulation = function() {
//   console.log('stopping the sim');
//   kill = true;
//   time = 1;
//   timerStatus = false;
//   $('#stop').hide();
//   kill = false
// }
