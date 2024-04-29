"use scrict;";
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;
const number = document.querySelector(".number");
const currentScore = document.querySelector(".score");
const message = document.querySelector(".message");
const alert = document.querySelector(".alert");
const highScore = document.querySelector(".highscore");

// function created to change the background colors
const changeBackground = function (color, width) {
  document.querySelector("body").style.backgroundColor = color;
  document.querySelector(".number").style.width = width;
  document.querySelector(".number").style.borderColor = color;
  document.querySelector(".number").style.color = color;
  document.querySelector(".btn").style.borderColor = color;
  document.querySelector(".btn").style.color = color;
  document.querySelector(".check").style.borderColor = color;
  document.querySelector(".check").style.color = color;
};

// Function to play the game sound effect
function playWin() {
  var audio = document.getElementById("myAudio1");
  audio.play();
}
function playLost() {
  var audio = document.getElementById("myAudio2");
  audio.play();
}
function playRetry() {
  var audio = document.getElementById("myAudio3");
  audio.play();
}
function playClick() {
  var audio = document.getElementById("myAudio4");
  audio.play();
}

const gameLost = function () {
  message.textContent = "You Lost The Game";
  currentScore.textContent = 0;
  changeBackground("#750E21", "16rem");
  number.textContent = secretNumber;
  message.textContent = "Try Again !!!";
  alert.style.visibility = "visible";
  playLost();
};
document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  playClick();
  switch (true) {
    //when there is wrong or no input found
    case !guess:
      message.textContent = "Wrong Input !!!";
      break;

    //when player input is not betwwen the range
    case guess < 1 || guess === 0 || guess > 20:
      if (score > 1) {
        message.textContent = "Guess from 1 to 20";
        score--;
        currentScore.textContent = score;
      } else {
        gameLost();
      }
      break;

    //when player input is correct, he win's
    case guess === secretNumber:
      message.textContent = "You're Winner.!!!";
      number.textContent = secretNumber;
      if (highscore < score) {
        highscore = score;
        highScore.textContent = highscore;
      }
      playWin();
      changeBackground("#42855B", "28rem");
      alert.textContent = "Play Again";
      alert.style.visibility = "visible";
      break;

    //when player input not correct
    case guess !== secretNumber:
      if (score > 1) {
        message.textContent =
          guess > secretNumber ? "Number Too High !" : "Number Too Low !";
        score--;
        currentScore.textContent = score;
      } else {
        gameLost();
      }
      break;

    default:
      currentScore.textContent = score;
  }
});

// adding keyboard events
document.addEventListener("keydown", handleKeyPress1);
function handleKeyPress1(event) {
  // for keyboard enter and spacebar button pressed
  if (event.keyCode === 13 || event.keyCode === 32) {
    document.querySelector(".check").click();
  }
  // for keyboard esc button pressed
  else if (event.keyCode === 27) {
    document.querySelector(".again").click();
  }
}

// for try again button pressed
document.querySelector(".again").addEventListener("click", function () {
  playRetry();
  score = 20;
  currentScore.textContent = score;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  number.textContent = "?";
  message.textContent = "Start guessing ...";
  document.querySelector(".guess").value = "";
  alert.style.visibility = "hidden";
  changeBackground("#405545", "15rem");
  document.querySelector(".guess").focus();
});
