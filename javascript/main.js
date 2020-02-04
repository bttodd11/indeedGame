//  Starting variables
let score = 0;
let int;
let timeElasped;
let thisBox;
const slider = document.getElementById("myRange");
const output = document.getElementById("value");
const modal = document.getElementById("pauseWindow");
const btn = document.getElementById("pause");
const span = document.getElementsByClassName("close")[0];
const toggle = document.getElementById("toggle");
const reset = document.getElementById("reset");
const game = document.querySelector(".game");
const gameWidth = game.clientWidth;
const gameHeight = game.clientHeight;
let gameRaf,
start = null,
last = 0

output.innerHTML = slider.value;
let velocity = 5000;


slider.oninput = () => {
    output.innerHTML = slider.value;
  }


const animateApplicant = () => {
    var animateTime = slider.value/ 60 + 'px',
    applicantPosition = parseInt($('.box').css('top'));

    if(applicantPosition >= gameHeight){
        $('.box:first-child').remove();
    } else {
        $('.box').css({
            top: '+=' + animateTime,
        });
    }
};

gameTimer = function(timestamp){
    gameRaf = window.requestAnimationFrame(gameTimer);
    animateApplicant();
    timeElasped = Math.floor(timestamp / 1000);
    if (!last || timestamp - last >= 1000){
        var progress = timestamp - start;
        last = timestamp;
        createApplicant();
    }
};



// The function to start the setInterval that will start the 
// game, This will drop 6 applicants every 4 seconds.
const startGame = () => {
    gameRaf = requestAnimationFrame(gameTimer);
    clock();
};

// Pausing game that will clear the previous setInterval
const pauseGame = () => {
   cancelAnimationFrame(gameRaf);
}


// The function that will drop the applicants with a random size
// and a chosen speed
const createApplicant = () => {
    // Creating the box for the applicants
    let applicantSize = Math.floor(Math.random() * 100) + 10;
    let leftPos = Math.floor(Math.random() * gameWidth);
    let thisBox = document.createElement('div');
    const randomIcon = Math.round(Math.random() * 5);
    let yPos;

    if(leftPos + applicantSize > gameWidth){
        left = leftPos - applicantSize;
    } else if (leftPos - applicantSize < 0) {
        left = leftPos + applicantSize;
    }
    
    thisBox.className = 'box';
    thisBox.style = 
        'width:' + 
        applicantSize +
        'px;' +
        'height:' +
        applicantSize +
        'px;' +
        'left:' +
        leftPos +
        'px;' +
        'top:' +
        yPos +
        'px;';

    switch (randomIcon) {
        case 0:
            thisBox.style.background = "url('icons/teacher.png')";
            thisBox.style.backgroundSize = "contain";
            break;
        case 1:
            thisBox.style.background = "url('icons/nurse.png')";
            thisBox.style.backgroundSize = "contain";
            break;
        case 2:
            thisBox.style.background = "url('icons/nursef.png')";
            thisBox.style.backgroundSize = "contain";
            break;

        case 3:
            thisBox.style.background = "url('icons/doctor.png')";
            thisBox.style.backgroundSize = "contain";
            break; 
    }
    game.appendChild(thisBox);
    thisBox.addEventListener('click', () => scoreSub())

  
    const scoreSub = () => {
        var value = thisBox.style.width.substring(0, thisBox.style.width.length - 3);
  
    
     switch (value) {
         case "1":
             score += 10;
             break;

         case "2":
             score += 9;
             break;

         case "3":
             score += 8;
             break;

         case "4":
             score += 7;
             break;

         case "5":
             score += 6;
             break;

         case "6":
             score += 5;
             break;

         case "7":
             score += 4;
             break;

         case "8":
             score += 3;
             break;
         case "9":
             score += 2;
             break;
         case "10":
             score += 1;
             break;

     }
     $(".score").html(score);
     thisBox.remove()
    };
}

  

 

const applicantDrop = (topPos) => {
    const length = random(100, ($(".game").width() - 100));
    let velocity = document.getElementById("myRange").value * 100;

    thisBox.style.transform = 'translateY(' + topPos + 'px)';

    'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend'
        .split(' ')
        .forEach((eventName) => {
            thisBox.addEventListener(eventName, () => thisBox.remove(), { once: true });
        });
}







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
    switch (toggle.innerHTML) {
        case "Start":
            startGame();
            toggle.innerHTML = "Pause";
            break;
    
        case "Pause":
            pauseGame()
            modal.style.display = "block";
            break;
    }
  }

  const toggleModal = function(){
    switch (resume.innerHTML) {
        case "Continue":
            modal.style.display = "none";
            startGame();
            break;
        case "Reset":
            modal.style.display = "none";
            resetFunc();
        break;
    }

  }

const resumeGame = () => {
    modal.style.display = "none";
    startGame();
}
const resetFunc = () => {
    modal.style.display = "block";
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
