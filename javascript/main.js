var score = 0;
var color = "blue";




function random(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function setBG() {
    if (Math.round(Math.random())) {
        return "icons/bigPaper.png";
    }
}

//random start for animation
document.getElementById("start").onclick = function () { startGame() };
function startGame(){
    for (i = 0; i < 10; i++) {
        dropBox();
    }
    var runGame = setInterval(function () {
        for (i = 0; i < 5; i++) {
            dropBox();
        }
    }, 1000);
}
function pauseWindow() {
    var txt;
    var person = prompt("Adjust your speed");

  }


var slider = document.getElementById("myRange");
var output = document.getElementById("value");




//Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
  output.innerHTML = this.value;
}



function dropBox() {
    console.log("call")
    var length = random(100, ($(".game").width() - 100));
    var velocity = 4000;
    var size = random(10, 100);
    var thisBox = $("<div/>", {
        class: "box",
        style: "width:" + size + "px; height:" + size + "px; left:" + length + "px; transition: transform " + velocity + "ms linear;"
    });

    //set data and bg based on data
    thisBox.data("test", Math.round(Math.random()));
    if(thisBox.data("test")){
      thisBox.css({"background": "url('http://icons.iconarchive.com/icons/hopstarter/halloween-avatars/128/Frankenstein-icon.png')", "background-size":"contain"});
    } else {
      thisBox.css({"background": "url('icons/bigPaper.png')", "background-size":"contain"});
    }


    //insert gift element
    $(".game").append(thisBox);
        setTimeout(function(){
            thisBox.addClass("move");
        },random(0, 5000))
    //remove this object when animation is over
    thisBox.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
        function (event) {
            $(this).remove();
        });
    }




$(document).on('click', '.box', function () {
    // if ($(this).data("test")) {
    //     score += 1;
    // } else {
    //     score -= 1;
    // }

    // $(".score").html(score);
    $(this).remove();
});



// var runGame = setInterval(function () {
//     for (i = 0; i < 10; i++) {
//         dropBox();
//     }
// }, 3000);



function countdown() {
    var seconds = 60;
    function tick() {
        var counter = document.getElementById("counter");
        seconds--;
        counter.innerHTML = (seconds < 10 ? "0" : "") + String(seconds) + "S";
            setTimeout(tick, 1000);
      
 
            // alert("Game over");
            // clearInterval(runGame);
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
