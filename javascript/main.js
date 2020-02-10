//  Starting variables
let score = 0;
let int;
let timeElasped;
let thisBox;
let isModalOpen = true;
let isGamePlaying = true;
const modal = document.getElementById("pauseWindow");
const output = document.getElementById("value");
const resume = document.getElementById("resume");
const logo = document.getElementsByClassName("mainLogo")[0];
const logoHeading = document.getElementsByClassName("mainTitle")[0];
const slider = document.getElementById("myRange");
const btn = document.getElementById("pause");
const span = document.getElementsByClassName("close")[0];
const toggle = document.getElementById("toggle");
const scoreRestart = document.getElementsByClassName("score")[0];
const reset = document.getElementById("reset");
const game = document.querySelector(".game");
const gameWidth = game.clientWidth;
const gameHeight = game.clientHeight;
let gameRaf,
start = null,
last = 0

output.innerHTML = slider.value;

slider.oninput = () => {
    output.innerHTML = slider.value;
    if(output.innerHTML >= 50){
        output.style.color = "red";
    }
    else{
        output.style.color = "green";
    }
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
const handlerStartGame = () => {
    gameRaf = requestAnimationFrame(gameTimer);
};

// Pausing game that will clear the previous setInterval
const handlerPauseGame = () => {
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
     $(".score").html("Score: " + score);
     value.remove()
    };

const toggleFunc = function() {
    switch (toggle.innerHTML) {
        case "Start":
            handlerStartGame();
            toggle.innerHTML = "Pause";
            break;
    
        case "Pause":
            if(isGamePlaying){
            handlerPauseGame()
            modal.style.display = "block";
            logo.style.display = "none";
            logoHeading.style.display = "none";
            logo.style.display = "none";
            resume.innerHTML = "Continue"
            toggle.innerHTML = "";
            reset.style.display = "inline-block";
            }
            break;
    }
}
  

const resumeGame = () => {
    modal.style.display = "none";
    handlerStartGame();
    toggle.innerHTML = "Pause";
}
const resetFunc = () => {
    modal.style.display = "block";
    logo.style.display = "block";
    logoHeading.style.display = "block";
    reset.style.display = "none";
    resume.innerHTML = "Start Game";
    score = 0;
    $(".score").html(score);
    scoreRestart.innerHTML = "Score";
  }
