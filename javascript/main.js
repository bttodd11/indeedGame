//  Starting variables
let score = 0;
let int;
let timeElasped;
let thisBox;
let value;
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
    const boxArray = Array.from(document.querySelectorAll('.box'));
    var animateTime = slider.value / 60 + 'px',
    applicantPosition = parseInt($('.box').css('top'));

    if(applicantPosition >= gameHeight){game.removeChild(boxArray[0])}
    else{
        $('.box').css({
            top: '+=' + animateTime,
        });
    }
}


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
        leftPos = leftPos - applicantSize;
    } else if (leftPos - applicantSize < 0) {
        leftPos = leftPos + applicantSize;
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

     thisBox.setAttribute('data-ptvalue', Math.floor(applicantSize / 10) )
    switch (randomIcon) {
        case 0:
            thisBox.style.background = "url('icons/bat1.png')";
            thisBox.style.backgroundSize = "contain";
            break;
        case 1:
            thisBox.style.background = "url('icons/bat2.png')";
            thisBox.style.backgroundSize = "contain";
            break;
        case 2:
            thisBox.style.background = "url('icons/bat3.png')";
            thisBox.style.backgroundSize = "contain";
            break;
        case 3:
             thisBox.style.background = "url('icons/bat2.png')";
             thisBox.style.backgroundSize = "contain";
             break;

    }
    game.appendChild(thisBox);
    thisBox.addEventListener('click', (e) => scoreSub(e))

};

    
    const scoreSub = (e) => {
        var value =  e.currentTarget;

     switch (value.dataset.ptvalue) {
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
     console.log(thisBox)
     $(".score").html("Score: " + score);
     value.remove()
    };

const toggleFunc = function() {
    switch (toggle.innerHTML) {
        case "Start":
            startGame();
            toggle.innerHTML = "Pause";
            break;
    
        case "Pause":
            pauseGame()
            modal.style.display = "block";
            document.getElementById("overlay").style.display = "block";
            toggle.innerHTML = "";
            break;
    }
  }

const resumeGame = () => {
    modal.style.display = "none";
    startGame();
    toggle.innerHTML = "Pause";
    document.getElementById('overlay').style.opacity = '1';
}
const resetFunc = () => {
    modal.style.display = "none";
    toggle.innerHTML = "Pause"
    startGame()
    document.getElementById('overlay').style.opacity = '1';
    score = 0;
    $(".score").html(score);
  }
