$(document).ready(function() {
  // clicking the "-" button subtracts one from work time
  $('#work-minus').click(function() {
    var time = $('#work-time').text();
    if (time > 0) { // but only in it's above zero
      time--;
      $('#work-time').text(time)
    }
  });
  
  // clicking the "+" button adds one to the work time
  $('#work-plus').click(function() {
    var time = $('#work-time').text();
    time++;
    $('#work-time').text(time)
  });  
  
  // Same two buttons for the break time
  $('#break-minus').click(function() {
    var time = $('#break-time').text();
    if ( time > 0 ) {
      time--;
      $('#break-time').text(time)
    }
  });
  
  $('#break-plus').click(function() {
    var time = $('#break-time').text();
    time++;
    $('#break-time').text(time)
  });  
  
  // "ticker" is the setInterval inside the doTimer function
  // declared here so it's in scope for the next 3 buttons
  var ticker; 
  
  // the stop button
  $('#stop-timer').click(function() {
    if (ticker) { // if ticker is defined
      clearInterval(ticker); // stop the timer
      // set the timer div back to the default colors
      $('#timer').removeClass('work-timer');
      $('#timer').removeClass('break-timer');
    }
  });
  
  // the work start button
  $('#start-work').click(function() {
    if (ticker) // if ticker is defined
      clearInterval(ticker); // stop it first
    doTimer('work'); // then start it with work time amount
  });
  
  // the break start button
  $('#start-break').click(function() {
    if (ticker)
      clearInterval(ticker);
    doTimer('break'); // use the break time amount now
  });
  
  // function that runs the timer
  function doTimer(type) {
    // create a timer function
    function makeTimer(minutesToTime) {
      // to hold seconds till done
      var secondsToTime = minutesToTime * 60;
  
      return function() {
       // and subtract by one on each function call
       return secondsToTime--;
      };
    }
    
    // format the timeInSeconds to mm:ss
    function formatTime(timeInSeconds) {
      var minutes, seconds;
      minutes = Math.floor(timeInSeconds / 60);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = timeInSeconds % 60;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      return minutes + ":" + seconds;
    }
    
 
    var timer; // variable to hold the timer function
    
    // initialize the timer function
    // and setup the timer div
    if (type === "work") {
      timer = makeTimer($('#work-time').text());
      $('#timer').removeClass('break-timer');
      $('#timer').addClass('work-timer');
      $('#type').text('Work');
    } else {
      timer = makeTimer($('#break-time').text());
      $('#timer').removeClass('work-timer');
      $('#timer').addClass('break-timer');
      $('#type').text('Break');
    }
    
    // put starting time in the timer div
    $('#time').text(formatTime(timer()));
    
    // interval runs every second
    ticker = setInterval(function() {
      var time = timer(); // grabs new seconds till done
      if (time > 0) { // if there are any left
        $('#time').text(formatTime(time)); // update the div
      } else { // otherwise
        clearInterval(ticker); // stop the timer
        
        // play the annoying buzzer sound
        var wav = 'https://dl.dropboxusercontent.com/s/d6wmaaxoa73t9n6/Door%20Buzzer.mp3';
        var audio = new Audio(wav);
			  audio.play();
        
        // and start up the other timer type
        if (type === 'work') {
          doTimer('break');
        } else {
          doTimer('work');
        }
      }
    }, 1000);
  }
});