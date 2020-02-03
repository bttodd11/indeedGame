//  Starting variables
let score = 0;
let int;
const slider = document.getElementById("myRange");
const output = document.getElementById("value");
const modal = document.getElementById("pauseWindow");
const btn = document.getElementById("pause");
const span = document.getElementsByClassName("close")[0];
const toggle = document.getElementById("toggle");
const reset = document.getElementById("reset");
const game = document.getElementsByClassName("game");

output.innerHTML = slider.value;
let velocity = 5000;


slider.oninput = () => {
    output.innerHTML = this.value;
  }




// The function to start the setInterval that will start the 
// game, This will drop 6 applicants every 4 seconds.
const startGame = () => {
    int = setInterval(function () {
        for (i = 0; i < 5; i++) {
            applicantDrop();
        }
    }
        , 4000)
}

// Pausing game that will clear the previous setInterval
const pauseGame = () => {
    clearInterval(int);
}

// Randomizer for needed functions
const random = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}



// The function that will drop the applicants with a random size
// and a chosen speed
const applicantDrop = () => {
    // Creating the box for the applicants
    const length = random(100, (game.width - 100));
    const velocity = document.getElementById("myRange").value * 100;
    const applicantSize = random(30, 100);
    const thisBox = document.createElement("<div/>", {
        class: "box",
        style: "width:" +
            applicantSize + "px; height:" +
            applicantSize + "px; left:" +
            length + "px; transition: transform " +
            velocity + "ms linear;"
    });

    thisBox.data("applicants", Math.round(Math.random() * 5));
    if (thisBox.data("applicants") == 1) {
        thisBox.css({ "background": "url('icons/teacher.png')", "background-size": "contain" });
    } else if (thisBox.data("applicants") == 2) {
        thisBox.css({ "background": "url('icons/nursef.png')", "background-size": "contain" });
    }
    else if (thisBox.data("applicants") == 3) {
        thisBox.css({ "background": "url('icons/nurse.png')", "background-size": "contain" });
    }
    else if (thisBox.data("applicants") == 4) {
        thisBox.css({ "background": "url('icons/doctor.png')", "background-size": "contain" });
    }
  
  
    // Insert applicant to the game
    game.appendChild(thisBox);
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


$(document).on('click', '.box', function () {
    var size = $(this).width()
    var finder = $(this)
    if ($(this).data("applicants")) {
        if (size > 90) {
            score += 1;
        }
        else if (size <= 90 && size >= 60) {
            score += 3;
        }
        else if (size < 60){
            score += 10;
        }
    }
    $(".score").html(score);
    $(this).remove();
});


const clock = () => {
    var seconds = 120;
    const count = () => {
        seconds--;
        if (seconds > 0) {
            setTimeout(count, 1000);
        } else {
            alert("Game over");
            clearInterval(startGame);
        }
    }
    count();
}
clock();

const toggleFunc = function() {
    if (toggle.innerHTML === "Start") {
        startGame();
        toggle.innerHTML = "Pause";
      } else if(toggle.innerHTML === "Pause"){
          pauseGame()
          modal.style.display = "block";
         toggle.innerHTML = "Start";

      }
  }

const resumeGame = () => {
    modal.style.display = "none";
    startGame();
}
const resetFunc = () => {
    modal.style.display = "none";
    clock()
    startGame()
    score = 0
    $(".score").html(score);
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
