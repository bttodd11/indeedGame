var score = 0;
var color = "blue";




function random(min,max){
 	return Math.round(Math.random() * (max-min) + min);
}

function setBG(){
  if (Math.round(Math.random())){
    return "http://icons.iconarchive.com/icons/hopstarter/halloween-avatars/128/Frankenstein-icon.png";
  } else {
    return "http://icons.iconarchive.com/icons/hopstarter/halloween-avatars/128/Scream-icon.png";
  }
}

var slider = document.getElementById("myRange");



// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
//  var value = this.value;
}



function dropBox(){
  var length = random(100, ($(".game").width() - 100));
  var velocity = 1500;
  var size = random(10, 100);
  var thisBox = $("<div/>", {
    class: "box",
    style:  "width:" +size+ "px; height:"+size+"px; left:" + length+  "px; transition: transform " +velocity+ "ms linear;"
  });
  
  //set data and bg based on data
  thisBox.data("test", Math.round(Math.random()));
  if(thisBox.data("test")){
    thisBox.css({"background": "url('icons/smallPaper.png')", "background-size":"contain"});
  } else {
    thisBox.css({"background": "url('icons/bigPaper.png')", "background-size":"contain"});
  }
  
  
  //insert gift element
  $(".game").append(thisBox);
  
  //random start for animation
  document.getElementById("start").onclick = function() {startGame()};
function startGame(){


  setTimeout(function(){
    thisBox.addClass("move");
  }, 3000)};
  
  //remove this object when animation is over
  thisBox.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
              function(event) {
    $(this).remove();
  });
}

for (i = 0; i < 10; i++) { 
  dropBox();
}

$(document).on('click', '.box', function(){  
  if($(this).data("test")){
    score += 1;
  } else {
    score -= 1;
  }
  
  $(".score").html(score);
  $(this).remove();
});


    var runGame = setInterval(function(){
                for (i = 0; i < 10; i++) { 
                  dropBox();
                }  
              }, 5000);
         


function countdown() {
    	var seconds = 60;
	    // function tick() {
	    //     var counter = document.getElementById("counter");
	    //     seconds--;
	    //     counter.innerHTML = (seconds < 10 ? "0" : "")  + String(seconds) + "S";
	    //     if( seconds > 0 ) {
	    //         setTimeout(tick, 1000);
	    //         draw();
	   	// 		update();
	    //     } else {
	    //         alert("Game over");
	    //         clearInterval(runGame);
	    //     }
	    // }
    	// tick();
    }



countdown();
