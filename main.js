$(function(){

// init 

var clock = new pomodoro();
clock.displayCurrentTiming();
clock.displayWorkTiming();
clock.displayBreakTiming();

//event listeners

  $(".time-session .minus").click(function() {
    clock.changeWorkTiming("subtract");
  });
  $(".time-session .plus").click(function() {
    clock.changeWorkTiming("add");
  });
  $(".time-break .minus").click(function() {
    clock.changeBreakTiming("subtract");
  });
  $(".time-break .plus").click(function() {
    clock.changeBreakTiming("add");
  });
  $(".time-start").click(function() {
    clock.pauseOrStart();
  });
  $(".time-reset").click(function() {
    clock.reset();
  });


function pomodoro(){



  //all the instance variables

  var _this = this, //refers to this object
  timer, 
  running = false, //is the clock running or not
  typeOfSession = "work", //work or break
  startTime = 1500,  //startTime, 25 min
  currentTime = 1500, //what is the current time display, 25 min
  workTime = 1500, // work Session  = 25 min
  breakTime = 300, //break Session = 5 min
  beginningAudio,
  endingAudio;


  //the methods
  function formatTime(secs) {
      var result = "";
      var seconds = secs % 60;
      var minutes = parseInt(secs / 60) % 60;
      var hours = parseInt(secs / 3600);
      function addLeadingZeroes(time) {
        return time < 10 ? "0" + time : time;
      }
      if (hours > 0) result += (hours + ":");
      result += (addLeadingZeroes(minutes) + ":" + addLeadingZeroes(seconds));
      return result;
    }

  

  this.changeWorkTiming = function(string){

    //changing session timing
    if(running==false){
        this.reset();
    }
    if(string==="add"){
        workTime += 60;
    }
    else if(workTime>60){

      workTime-=60;
    }

      currentTime = workTime;
      startTime = workTime;
      this.displayWorkTiming();
      this.displayCurrentTiming();
      


  }

  this.changeBreakTiming = function(string){

      //change break timing
         if(string==="add"){
        breakTime += 60;
    }
    else if(breakTime>60){

      breakTime-=60;
    }

      this.displayBreakTiming();

  }

  

  this.displayCurrentTiming = function(){

      //displays current Timing
      $('.main_display').text(formatTime(currentTime));

  } 

  this.displayWorkTiming = function() {


    //displays session timing
    $('.time-session .time-session-display').text(parseInt(workTime/60)+ "min"); 
  }

  this.displayBreakTiming = function() {

    //displays break timing
    $('.time-break .time-break-display').text(parseInt(breakTime/60)+" min");
  }

  this.pauseOrStart = function() {

    //toggle between pause and start
    if(running==true){

      clearInterval(timer);
      $('.time-start').text('Start');
      running= false;

    }
    else{

          $('.time-start').text('Pause');
          timer = setInterval(function () {
            // body...
            _this.countDown();

          }, 1000);
         running= true;

    }

  }

  this.countDown = function() {

    //the main function that counts down the timer
    if(currentTime>0) {
      currentTime--;
      this.displayCurrentTiming();

    }
    if(currentTime==0) {

        if(typeOfSession=="work") {

            currentTime = breakTime;
            startTime= breakTime;
            typeOfSession = "break";

        }
    }

  }

  this.reset = function() {

    //resets the timer
    clearInterval(timer);
    running= false;
    typeOfSession="work";
    currentTime = workTime;
    $('.time-start').text("Start");
    this.displayCurrentTiming();
    this.displayWorkTiming();

  }






}


});







