const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var time = [0,0,0,0];
var interval;
var timeRunning = false;


// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero (time){
if (time <= 9){
	time = "0" + time;
	}
	return time;
}

// Run a standard minute/second/hundredths timer:
function runtime(){
    var currentTime = leadingZero(time[0]) + ":" + leadingZero(time[1]) + ":" + time[2];
	theTimer.innerHTML = currentTime;
    ++time[3];

    time[0] = Math.floor((time[3]/6000));
    time[1] = Math.floor((time[3]/100) - time[0]*60);
    time[2] = Math.floor(time[3] - time[1]*100 - time[0]*6000);
}


// Match the text entered with the provided text on the page:
function inputCheck () {
  let textEnterd = testArea.value;
  let originTextMatch = originText.substring(0,textEnterd.length);

  if(textEnterd == originText){
      testWrapper.style.borderColor = "green";
      clearInterval(interval);
      
  }else {
  	 if(textEnterd == originTextMatch){
  	 	testWrapper.style.borderColor = "blue";
  	 }else{
  	 	testWrapper.style.borderColor = "orange";
  	 }
  }

}

// Start the timer:
function start(){
  let textEnteredLength = testArea.value.length;
  
  if (textEnteredLength === 0 && !timeRunning ){
  	interval = setInterval(runtime, 10);
  	timeRunning = true;
  }

}

// Reset everything:
function reset(){
	testArea.value = "";
	theTimer.innerHTML = "00:00:00";
	clearInterval(interval);
	time = [0,0,0,0];
  
	timeRunning = false;
	
}


// Event listeners for keyboard input and the reset button:
testArea.addEventListener('keypress', start, false);
testArea.addEventListener('keyup', inputCheck,false);
resetButton.addEventListener('click', reset, false);
