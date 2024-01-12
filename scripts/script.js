"use strict";

const startingPage = document.getElementById("starting-page");
const submitNamesPage = document.querySelector(".submit-names");
const submitNameComputerPage = document.querySelector(".submit-name-computer");

const playWFriendPage = document.getElementById("with-friend");
const playWComputerPage = document.getElementById("with-computer");
const btnPlayWFriend = document.querySelector(".play-with-friend");
const btnPlayWComputer = document.querySelector(".play-with-computer");
const btnSubmitNames = document.getElementById("btn-submit-names");
const btnSubmitNameComputer = document.getElementById(
  "btn-submit-name-computer"
);
const btnIcon = document.querySelector(".favicon");

// players
const playerOne = document.querySelector(".cross-player-one");
const playerTwo = document.querySelector(".circle-player-two");
const selfPlayer = document.querySelector(".cross-player");
const computerPlayer = document.querySelector(".circle-computer-player");
// player names
const playerOneName = document.getElementById("fname");
const playerTwoName = document.getElementById("sname");
const selfPlayerName = document.getElementById("yname");
//scores
const playerOneScoreH2 = document.querySelector(".player-one-score");
const playerTwoScoreH2 = document.querySelector(".player-two-score");
const playerOneScoreComH2 = document.querySelector(".player-one-score-com");
const playerTwoScoreComH2 = document.querySelector(".player-two-score-com");
// gameboard
const gameBoard = document.querySelector(".gameboard");
const gameStatus = document.getElementById("game-status");
const btnCells = document.querySelectorAll(".cell");
const btnPlayAgain = document.getElementById("play-again");
const btnBackHomepage = document.getElementById("back-to-homepage");
const gameEndChoices = document.getElementById("game-end-choices");
const blurBg = document.querySelector(".blur-bg");
const crossmarks = document.querySelectorAll(".cross-mark");
const circlemarks = document.querySelectorAll(".circle-mark");

btnPlayWFriend.addEventListener("click", function () {
  startingPage.style.display = "none";
  submitNamesPage.style.display = "block";
  gameEndChoices.style.display = "none";
  gameEndChoices.style.opacity = 0;
  gameStatus.style.transition = 0.3;
});

btnPlayWComputer.addEventListener("click", function () {
  startingPage.style.display = "none";
  submitNameComputerPage.style.display = "block";
  gameEndChoices.style.display = "none";
  gameEndChoices.style.opacity = 0;
  gameStatus.style.transition = 0.3;
});

playerOneName.addEventListener("change", function () {
  playerOneName.classList.remove("check-required");
});

playerTwoName.addEventListener("change", function () {
  playerTwoName.classList.remove("check-required");
});
selfPlayerName.addEventListener("change", function () {
  selfPlayerName.classList.remove("check-required");
});

btnSubmitNames.addEventListener("click", function () {
  if (playerOneName.value.trim() === "" || playerTwoName.value.trim() === "") {
    alert("Name can not be empty!");
    return;
  }

  if (
    playerOneName.value.trim().length >= 9 ||
    playerTwoName.value.trim().length >= 9
  ) {
    alert("Name can not be more than 8 digit!");
    return;
  }
  submitNamesPage.style.display = "none";
  playWFriendPage.style.display = "flex";

  playerOne.innerHTML = playerOneName.value.trim();
  playerTwo.innerHTML = playerTwoName.value.trim();
  gameStatus.children[0].innerHTML = `${playerOneName.value.trim()}'s Turn!`;
  gameBoard.style.display = "block";
  playerOne.style.color = "#00caad";
  gameStatus.style.display = "block";
  gameStatus.style.opacity = 1;
  setTimeout(function () {
    gameStatus.style.opacity = 0;
  }, 1500);
  opponent = "friend";
});

btnSubmitNameComputer.addEventListener("click", function () {
  if (selfPlayerName.value.trim() === "") {
    alert("Name can not be empty!");
    return;
  } else if (selfPlayerName.value.trim().length >= 9) {
    alert("Name can not be more than 8 digit!");
    return;
  } else {
    submitNameComputerPage.style.display = "none";
    playWComputerPage.style.display = "flex";
    selfPlayer.innerHTML = selfPlayerName.value.trim();
    gameBoard.style.display = "block";
    selfPlayer.style.color = "#00caad";
    gameStatus.style.display = "block";
    gameStatus.style.opacity = 1;
    setTimeout(function () {
      gameStatus.style.opacity = 0;
    }, 1500);
    opponent = "computer";
  }
});

btnBackHomepage.addEventListener("click", function () {
  goBackToMainPage();
});

btnPlayAgain.addEventListener("click", function () {
  gameStatus.children[0].innerHTML = `It's Your Turn!`;
  setTimeout(function () {
    gameStatus.style.opacity = 0;
  }, 3000);
  blurBg.style.display = "none";
  gameEndChoices.style.display = "none";
  gameEndChoices.style.opacity = 0;
  selectedCellsList = [];
  currentPlayer = "0";
  crossmarks.forEach(function (crossmark) {
    crossmark.style.opacity = 0;
  });
  circlemarks.forEach(function (circlemark) {
    circlemark.style.opacity = 0;
  });
  playerOne.style.color = "#00caad";
  playerTwo.style.color = "#d9d9e5";
  selfPlayer.style.color = "#d9d9e5";
  computerPlayer.style.color = "#d9d9e5";
});

btnIcon.addEventListener("click", function () {
  goBackToMainPage();
  submitNamesPage.style.display = "none";
  submitNameComputerPage.style.display = "none";
  playerOneName.classList.remove("check-required");
  playerTwoName.classList.remove("check-required");
  selfPlayerName.classList.remove("check-required");
});

// game start
let currentPlayer = "0"; // either "0" or "1"
// store id of clicked cells, a list of strings
let selectedCellsList = [];
let opponent = "";
let firstCell = 0;
let secondCell = 0;
let thirdCell = 0;
let playerOneScore = 0;
let playerTwoScore = 0;
let playerOneScoreCom = 0;
let playerTwoScoreCom = 0;

// click cells
btnCells.forEach(function (btnCell) {
  btnCell.addEventListener("click", function () {
    // doesn't need to be outside coz we don't need to remember the previous value, but it needs to be outside for loop so the if statement can access it

    let hasThisCellBeenClickedBefore = false;
    // if computer(player 2) hasn't click, player 1 can't click
    if (opponent === "computer" && currentPlayer === "1") {
      alert("Please wait for Robot to select!");
      return;
    }
    // check the list, it's on the list, do nothing, if it's not, show the mark(display = 'block')
    if (
      selectedCellsList[parseInt(btnCell.dataset.cell)] === "0" ||
      selectedCellsList[parseInt(btnCell.dataset.cell)] === "1"
    ) {
      hasThisCellBeenClickedBefore = true;
    }

    if (hasThisCellBeenClickedBefore === true) {
      return;
    }
    // select and show the mark of clicked cell
    btnCell.children[Number(currentPlayer)].style.opacity = 1;
    //add data to the array list
    selectedCellsList[parseInt(btnCell.dataset.cell)] = currentPlayer;

    //win check
    if (winCheck(currentPlayer) === true) {
      // debugger;
      //add scores
      if (currentPlayer === "0") {
        playerOneScore++;
        playerOneScoreH2.innerHTML = `${playerOneScore}`;
        playerOneScoreCom++;
        playerOneScoreComH2.innerHTML = `${playerOneScoreCom}`;
        selfPlayer.style.color = "#00caad";
      } else {
        playerTwoScore++;
        playerTwoScoreH2.innerHTML = `${playerTwoScore}`;
      }
      return;
    }
    // draw check
    if (drawCheck() === true) {
      return;
    }

    // computer: switch player
    if (opponent === "computer") {
      // 1. generate random numebr between 0 to 8;
      // 2. if the cell is "0" or "1", regenerate the random number.
      // 3. while cell is selected, keep regenerate the random number.
      let randomNum = Math.floor(Math.random() * 9);
      while (
        selectedCellsList[randomNum] === "0" ||
        selectedCellsList[randomNum] === "1"
      ) {
        randomNum = Math.floor(Math.random() * 9);
      }

      setTimeout(function () {
        console.log("inside settimneout", randomNum);
        btnCells[randomNum].children[1].style.opacity = 1;
      }, 600);
      selectedCellsList[randomNum] = "1";

      currentPlayer = "1";

      //computer win check
      if (winCheck(currentPlayer) === true) {
        playerTwoScoreCom++;
        playerTwoScoreComH2.innerHTML = `${playerTwoScoreCom}`;
        computerPlayer.style.color = "#00caad";
        return;
      }
      //computer draw check
      if (drawCheck() === true) {
        return;
      }

      currentPlayer = "0";
    } else {
      // if play with friends, switch player
      if (currentPlayer === "0") {
        playerOne.style.color = "#d9d9e5";
        playerTwo.style.color = "#00caad";
        // selfPlayer.style.color = "#d9d9e5";
        // computerPlayer.style.color = "green";
        currentPlayer = "1";
      } else {
        playerOne.style.color = "#00caad";
        playerTwo.style.color = "#d9d9e5";
        // selfPlayer.style.color = "green";
        // computerPlayer.style.color = "#d9d9e5";
        currentPlayer = "0";
      }
    }
  });
});

function winCheck(currentPlayer) {
  let winMoveCheck = checkWinCombo();
  let winNameFriend = winName();
  let winNameComputer = winNameCom();

  if (winMoveCheck === true) {
    gameStatus.style.opacity = 1;

    if (opponent === "friend") {
      gameStatus.children[0].innerHTML = `${winNameFriend} Wins!`;
    } else {
      gameStatus.children[0].innerHTML = `${winNameComputer} Wins!`;
    }

    //select clicked unwin cells
    gameBoardFade();
    //twinkle win cells
    winTwinkle(0, 0, currentPlayer);
    winTwinkle(1, 250, currentPlayer);
    winTwinkle(0, 500, currentPlayer);
    winTwinkle(1, 750, currentPlayer);
    winTwinkle(0, 1000, currentPlayer);
    winTwinkle(1, 1250, currentPlayer);
    winTwinkle(0.5, 1900, currentPlayer);

    setTimeout(showEndChoices, 1900);
  }
  return winMoveCheck;
}

function winName() {
  let winPlayerName;
  if (currentPlayer === "0") {
    winPlayerName = playerOneName.value.trim();
  } else {
    winPlayerName = playerTwoName.value.trim();
  }
  return winPlayerName;
}

function winNameCom() {
  let winPlayerName;
  if (currentPlayer === "0") {
    winPlayerName = selfPlayerName.value.trim();
  } else {
    winPlayerName = `Computer`;
  }
  return winPlayerName;
}

function winTwinkle(opacity, waitTime, currentPlayer) {
  setTimeout(function () {
    btnCells[firstCell].children[Number(currentPlayer)].style.opacity = opacity;
    btnCells[secondCell].children[Number(currentPlayer)].style.opacity =
      opacity;
    btnCells[thirdCell].children[Number(currentPlayer)].style.opacity = opacity;
  }, waitTime);
}

function drawTwinkle(opacity, waitTime) {
  setTimeout(function () {
    gameStatus.style.opacity = opacity;
    gameStatus.children[0].innerHTML = `Draw!`;
  }, waitTime);
}

function showEndChoices() {
  gameEndChoices.style.display = "flex";
  gameEndChoices.style.opacity = 1;
  blurBg.style.display = "flex";
}

function gameBoardFade() {
  for (let i = 0; i < selectedCellsList.length; i++) {
    if (
      selectedCellsList[i] === "0" &&
      i !== firstCell &&
      i !== secondCell &&
      i !== thirdCell
    ) {
      btnCells[i].children[0].style.opacity = 0.5;
    } else if (
      selectedCellsList[i] === "1" &&
      i !== firstCell &&
      i !== secondCell &&
      i !== thirdCell
    ) {
      btnCells[i].children[1].style.opacity = 0.5;
    }
  }
}

function goBackToMainPage() {
  startingPage.style.display = "block";
  playWFriendPage.style.display = "none";
  playWComputerPage.style.display = "none";
  gameBoard.style.display = "none";
  blurBg.style.display = "none";
  gameStatus.style.display = "none";
  gameStatus.style.opacity = 0;
  gameStatus.style.transition = "0s";

  gameStatus.children[0].innerHTML = `It's Your Turn!`;
  gameEndChoices.style.display = "none";
  gameEndChoices.style.opacity = 0;
  selectedCellsList = [];
  currentPlayer = "0";
  crossmarks.forEach(function (crossmark) {
    crossmark.style.opacity = 0;
  });
  circlemarks.forEach(function (circlemark) {
    circlemark.style.opacity = 0;
  });
  playerOne.style.color = "#00caad";
  playerTwo.style.color = "#d9d9e5";
  selfPlayer.style.color = "#d9d9e5";
  computerPlayer.style.color = "#d9d9e5";
  playerOneName.value = "";
  playerTwoName.value = "";
  selfPlayerName.value = "";
  playerOneScore = 0;
  playerTwoScore = 0;
  playerOneScoreH2.innerHTML = `${playerOneScore}`;
  playerTwoScoreH2.innerHTML = `${playerTwoScore}`;
  playerOneScoreCom = 0;
  playerTwoScoreCom = 0;
  playerOneScoreComH2.innerHTML = `${playerOneScoreCom}`;
  playerTwoScoreComH2.innerHTML = `${playerTwoScoreCom}`;
}

// This function has a "return", so it is allowed to be called both of the following ways:
// 1. drawCheck();
// 2. let a = drawCheck();
function drawCheck() {
  let clickedCellsCounter = 0;
  for (let i = 0; i < selectedCellsList.length; i++) {
    if (selectedCellsList[i] === "0" || selectedCellsList[i] === "1") {
      clickedCellsCounter++;
    }
  }

  let drawHappened = clickedCellsCounter === 9;
  if (drawHappened === true) {
    drawTwinkle(0, 0);
    drawTwinkle(1, 250);
    drawTwinkle(0, 500);
    drawTwinkle(1, 750);
    drawTwinkle(0, 1000);
    drawTwinkle(1, 1250);
    //marks opacity = 0.5
    setTimeout(function () {
      for (let i = 0; i < selectedCellsList.length; i++) {
        if (selectedCellsList[i] === "0") {
          btnCells[i].children[0].style.opacity = 0.5;
        } else {
          btnCells[i].children[1].style.opacity = 0.5;
        }
      }
    }, 800);
    setTimeout(showEndChoices, 2200);
  }
  return drawHappened; //if it doesn't return, it will return 'undefined'
}

function checkWinCombo() {
  let winMove = false;
  //player 1
  if (
    selectedCellsList[0] === "0" &&
    selectedCellsList[1] === "0" &&
    selectedCellsList[2] === "0"
  ) {
    winMove = true;
    firstCell = 0;
    secondCell = 1;
    thirdCell = 2;
  }

  if (
    selectedCellsList[3] === "0" &&
    selectedCellsList[4] === "0" &&
    selectedCellsList[5] === "0"
  ) {
    winMove = true;
    firstCell = 3;
    secondCell = 4;
    thirdCell = 5;
  }

  if (
    selectedCellsList[6] === "0" &&
    selectedCellsList[7] === "0" &&
    selectedCellsList[8] === "0"
  ) {
    winMove = true;
    firstCell = 6;
    secondCell = 7;
    thirdCell = 8;
  }

  if (
    selectedCellsList[0] === "0" &&
    selectedCellsList[3] === "0" &&
    selectedCellsList[6] === "0"
  ) {
    winMove = true;
    firstCell = 0;
    secondCell = 3;
    thirdCell = 6;
  }

  if (
    selectedCellsList[1] === "0" &&
    selectedCellsList[4] === "0" &&
    selectedCellsList[7] === "0"
  ) {
    winMove = true;
    firstCell = 1;
    secondCell = 4;
    thirdCell = 7;
  }

  if (
    selectedCellsList[2] === "0" &&
    selectedCellsList[5] === "0" &&
    selectedCellsList[8] === "0"
  ) {
    winMove = true;
    firstCell = 2;
    secondCell = 5;
    thirdCell = 8;
  }

  if (
    selectedCellsList[2] === "0" &&
    selectedCellsList[4] === "0" &&
    selectedCellsList[6] === "0"
  ) {
    winMove = true;
    firstCell = 2;
    secondCell = 4;
    thirdCell = 6;
  }

  if (
    selectedCellsList[0] === "0" &&
    selectedCellsList[4] === "0" &&
    selectedCellsList[8] === "0"
  ) {
    winMove = true;
    firstCell = 0;
    secondCell = 4;
    thirdCell = 8;
  }

  //player 2
  if (
    selectedCellsList[0] === "1" &&
    selectedCellsList[1] === "1" &&
    selectedCellsList[2] === "1"
  ) {
    winMove = true;
    firstCell = 0;
    secondCell = 1;
    thirdCell = 2;
  }

  if (
    selectedCellsList[3] === "1" &&
    selectedCellsList[4] === "1" &&
    selectedCellsList[5] === "1"
  ) {
    winMove = true;
    firstCell = 3;
    secondCell = 4;
    thirdCell = 5;
  }

  if (
    selectedCellsList[6] === "1" &&
    selectedCellsList[7] === "1" &&
    selectedCellsList[8] === "1"
  ) {
    winMove = true;
    firstCell = 6;
    secondCell = 7;
    thirdCell = 8;
  }

  if (
    selectedCellsList[0] === "1" &&
    selectedCellsList[3] === "1" &&
    selectedCellsList[6] === "1"
  ) {
    winMove = true;
    firstCell = 0;
    secondCell = 3;
    thirdCell = 6;
  }

  if (
    selectedCellsList[1] === "1" &&
    selectedCellsList[4] === "1" &&
    selectedCellsList[7] === "1"
  ) {
    winMove = true;
    firstCell = 1;
    secondCell = 4;
    thirdCell = 7;
  }

  if (
    selectedCellsList[2] === "1" &&
    selectedCellsList[5] === "1" &&
    selectedCellsList[8] === "1"
  ) {
    winMove = true;
    firstCell = 2;
    secondCell = 5;
    thirdCell = 8;
  }

  if (
    selectedCellsList[2] === "1" &&
    selectedCellsList[4] === "1" &&
    selectedCellsList[6] === "1"
  ) {
    winMove = true;
    firstCell = 2;
    secondCell = 4;
    thirdCell = 6;
  }

  if (
    selectedCellsList[0] === "1" &&
    selectedCellsList[4] === "1" &&
    selectedCellsList[8] === "1"
  ) {
    winMove = true;
    firstCell = 0;
    secondCell = 4;
    thirdCell = 8;
  }
  return winMove;
}

// const winCombinations = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [2, 4, 6],
//   [0, 4, 8],
// ];
