//  Starting variables
var score = 0;
var int;
const velocity = 0;

// The function to start the setInterval that will start the 
// game, This will drop 6 applicants every 4 seconds.
const startGame = () => {
    int = setInterval(function () {
        for (i = 0; i < 6; i++) {
            applicantDrop();
        }
    }
        , 3000)
}

// Pausing game that will clear the previous setInterval
const pauseGame = () => {
    clearInterval(int);
}

// Randomizer for size of icons between chosen px (10-100)
function random(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}



// The function that will drop the applicants with a random size
// and a chosen speed
function applicantDrop(){
// Creating the box for the applicants
  var length = random(100, ($(".game").width() - 100));
  const velocity = 3500;
  var applicantSize = random(10, 100);
  var thisBox = $("<div/>", {
    class: "box",
    style:  "width:" + 
    applicantSize+  "px; height:"+ 
    applicantSize+  "px; left:" + 
    length +  "px; transition: transform " + 
    velocity+ "ms linear;"
  });
  
  thisBox.data("applicants", Math.round(Math.random()));
  if(thisBox.data("applicants")){
    thisBox.css({"background": "url('icons/bubble.png')", "background-size":"contain"});
  } 
  
  
    // Insert applicant to the game
    $(".game").append(thisBox);
    setTimeout(function () {
        thisBox.addClass("move");
    }, random(0, 3000));
  

    // If the applicant reachs the botton of the length remove 
    // The applicant from the screen
    thisBox.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
        function (event) {
            $(this).remove();
        });
}


$(document).on('click', '.box', function(){
  if($(this).data("applicants")){
    score += 1;
    console.log(score)
  } 

  $(".score").html(score);
  $(this).remove();
});


function countdown() {
    	var seconds = 90;
	    function tick() {
	        var counter = document.getElementById("counter");
	        seconds--;
	        counter.innerHTML = (seconds < 10 ? "0" : "")  + String(seconds) + "S";
	        if( seconds > 0 ) {
	            setTimeout(tick, 1000);
	        } else {
	            alert("Game is paused");
	            clearInterval(runGame);
	        }
	    }
    	tick();
	}

countdown();

// jQuery needed for onClicks and Modal

$("#pause").hide();



// Get the modal
var modal = document.getElementById("pauseWindow");

// Opens modal, pauses game
var btn = document.getElementById("pause");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// Test
document.getElementById("start").onclick = function() {
    startGame();
    $("#start").hide()
    $("#pause").show()
  }

// When the user clicks on the button, open the modal
document.getElementById("pause").onclick = function() {
  modal.style.display = "block";
  pauseGame();
  $("#pause").show()


}

document.getElementsByClassName("box").onclick = function () {
    if ($(this).data("applicants")) {
        score += 1;
        console.log(score)
    }
    $(".score").html(score);
    $(this).remove();
}


// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
