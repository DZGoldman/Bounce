//get melodies from database, and preset melodies
$(function () {
    $.get('/recentlycreated').done(function(data) {
      data.reverse().forEach(function(melody) {
        var $melodyDiv = $('<div>');
        $melodyDiv.attr('class', 'top-five');
        $imageThing = $('<div>');
        $imageThing.attr('class', 'image');
        $melodyDiv.append($imageThing)
        if (melody.noteSequence[0]) {
          $melodyDiv.click(function() {
            playedNotes = melody.noteSequence;
            simulator()
          })
          $('#last-five-container').append($melodyDiv)
        }
      });
      createPreset(amazingGrace, 'Amazing Grace');
      createPreset(karmaPolice, 'Karma Police');
      createPreset(ITHOTMK, 'ITHOTMK');
      createPreset(heyJude, 'Hey Jude');
      createPreset(imperialMarch, 'Imperial March')
    });
}); // end of on load

var createPreset = function (notesArray, text) {
  var $melodyDiv = $('<div>');
  $melodyDiv.attr('class', 'top-five');
  $imageThing = $('<div>');
  $imageThing.attr('class', 'image');
  $melodyDiv.append($imageThing);

  $imageThing.text(text)
  $melodyDiv.click(function() {
    playedNotes = notesArray;
    simulator()
  });
  $('#last-five-container').prepend($melodyDiv)
}
