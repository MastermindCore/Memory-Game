// Create a list that holds all of your cards
let cards = ["diamond", "paper-plane-o", "anchor", "bolt", "cube", "anchor", "leaf", "bicycle", "diamond", "bomb", "leaf", "bomb", "bolt", "bicycle", "paper-plane-o", "cube"];

const modal = document.querySelector(".modal");
const modalText = document.querySelector(".modalText");
const playAgain = document.querySelector(".playAgain");

const stars = document.querySelector(".stars");
const moves = document.querySelector(".moves");
let timer = document.querySelector(".timer");
const restart = document.querySelector(".restart");
const deck = document.querySelector(".deck");

let interval;
let second = 0;
let minute = 0;
let timeStart = false;

let cards_select = [];
let matches = 0;
let movesCount = 0; // Initialize moves count here
let starsCount = 3;
let movesWait = false;

function newGame() {
    resetTimer();
    deck.innerHTML = '';
    timer.style.display = "none";
    timeStart = false;
    timer.textContent = '0 Minutes 0 Seconds'; // Reset timer display
    shuffle(cards);
    cards_select = [];
    matches = 0;
    movesCount = 0; // Reset move count
    moves.textContent = movesCount;

    for (let i = 0; i < cards.length; i++) {
        deck.insertAdjacentHTML('afterbegin', '<li class="card"><i class="fa fa-' + cards[i] + '"></i></li>');
    }

    stars.innerHTML = '<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>';
    starsCount = 3;
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex, temporaryValue;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function startTimer() {
    if (!timeStart) {
        interval = setInterval(function () {
            second++;
            if (second === 60) {
                minute++;
                second = 0;
            }
            timer.textContent = minute + ' Minutes ' + second + ' Seconds';
        }, 1000);
        timeStart = true;
    }
}

function resetTimer() {
    // Reset the timer values
    minute = 0;
    second = 0;
    timer.textContent = '0 Minutes 0 Seconds';
    clearInterval(interval); // Stop any ongoing interval
    interval = null; // Clear the interval reference
}

function checkWin() {
    if (matches === cards.length / 2) {
        clearInterval(interval); // Stop the timer
        showModal(); // Show the modal
    }
}

function showModal() {
    modal.style.display = "block"; // Show the modal
    modalText.textContent = `You've won! Time: ${minute} minutes and ${second} seconds. Moves: ${movesCount}`;
}

function flipCard(card) {
    card.classList.add("open", "show");
}

function cardMatch() {
    cards_select[0].classList.remove("open", "show");
    cards_select[0].classList.add("match");
    cards_select[1].classList.remove("open", "show");
    cards_select[1].classList.add("match");
    cards_select = [];
    matches++;
    checkWin(); // Check if the game is won after each match
}

deck.addEventListener("click", function (event) {
    let clickedCard = event.target;
    if (!clickedCard.classList.contains("card") || cards_select.length === 2 || clickedCard.classList.contains("match")) {
        return;
    }

    flipCard(clickedCard);
    cards_select.push(clickedCard);

    if (cards_select.length === 2) {
        movesCount++;
        moves.textContent = movesCount;

        if (cards_select[0].innerHTML === cards_select[1].innerHTML) {
            cardMatch();
        } else {
            setTimeout(function () {
                cards_select[0].classList.remove("open", "show");
                cards_select[1].classList.remove("open", "show");
                cards_select = [];
            }, 1000);
        }
    }
});

playAgain.addEventListener("click", function () {
    modal.style.display = "none"; // Hide the modal
    newGame(); // Start a new game
    resetTimer(); // Reset the timer
    startTimer(); // Start the timer for the new game
});

newGame(); // Start a new game initially
startTimer(); // Start the timer for the new game

