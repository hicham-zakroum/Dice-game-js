"use strict";

////// selecting elements
// the active player green icon
const green0 = document.querySelector(".green--0");
const green1 = document.querySelector(".green--1");
const newGame = document.querySelector(".btn--new");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");
const dice = document.querySelector(".dice");
const rollDice = document.querySelector(".btn--roll");
const hold = document.querySelector(".btn--hold");

//// sub functions
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
  green0.classList.toggle("active");
  green1.classList.toggle("active");

  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
};

///// the init values
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

//// roll dice function
const randomDice = function () {
  const random = Math.trunc(Math.random() * 6) + 1;
  dice.classList.remove("hidden");
  dice.src = `dice-${random}.png`;
  if (random !== 1) {
    currentScore += random;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
};

//// hold function
const holdScore = function () {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  if (scores[0] >= 100 || scores[1] >= 100) {
    const scoreActive = document.getElementById(`score--${activePlayer}`);
    document.querySelector(".player--active").classList.add("player--winner");
    dice.classList.add("hidden");
    rollDice.classList.add("hidden");
    hold.classList.add("hidden");
    scoreActive.textContent = `YOU win 🎉🎉`;
    scoreActive.classList.add("winner");
  } else {
    switchPlayer();
  }
};

//// new game function
const reset = function () {
  activePlayer = 0;
  scores = [0, 0];
  score0.textContent = 0;
  score1.textContent = 0;
  dice.classList.add("hidden");
  document.querySelector("#current--0").textContent = 0;
  document.querySelector("#current--1").textContent = 0;
  dice.classList.add("hidden");
  rollDice.classList.remove("hidden");
  hold.classList.remove("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
  green0.classList.add("active");
  green1.classList.remove("active");
};

//// the main logic
dice.classList.add("hidden");
rollDice.addEventListener("click", randomDice);
hold.addEventListener("click", holdScore);
newGame.addEventListener("click", reset);
