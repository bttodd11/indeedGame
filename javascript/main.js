var score = 0;
var int;
const velocity = 0;

const startGame = () => {
    int = setInterval(function(){
        for (i = 0; i < 6; i++) {
            dropBox();
        }
    }
    ,4000)
}

document.getElementById("start").onclick = function(){startGame()};
document.getElementById("stop").onclick = function(){pauseGame()};

function random(min,max){
 	return Math.round(Math.random() * (max-min) + min);
}

function setBG(){
  if (Math.round(Math.random())){
    return "icons/bigPaper.png";
  } 
}


const pauseGame = () => {
    clearInterval(int);
}

function dropBox(){
  var length = random(100, ($(".game").width() - 100));
  const velocity = 3500;
  var size = random(10, 100);
  var thisBox = $("<div/>", {
    class: "box",
    style:  "width:" +size+ "px; height:"+size+"px; left:" + length+  "px; transition: transform " +velocity+ "ms linear;"
  });
  
  //set data and bg based on data
  thisBox.data("test", Math.round(Math.random()));
  if(thisBox.data("test")){
    thisBox.css({"background": "url('icons/bigPaper.png')", "background-size":"contain"});
  } 
  
  
  //insert gift element
  $(".game").append(thisBox);
  
  //random start for animation
   setTimeout(function(){
    thisBox.addClass("move");
  }, random(0, 3000));
  
  //remove this object when animation is over
  thisBox.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
              function(event) {
    $(this).remove();
  });
}

// function start(){
// var runGame = setInterval(run, 10);
// var stop = document.getElementById("stop").onclick = function(){start()};
// if(stop){
//     clearInterval(runGame)
// }
// function run(){
//     for (i = 0; i < 3; i++) { 
//         dropBox();
//     }
// }
// }

$(document).on('click', '.box', function(){
  if($(this).data("test")){
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


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("stop");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
  pauseGame()
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
