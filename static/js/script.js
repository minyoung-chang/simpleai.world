// Your Age in Days
function ageInDays() {
    var today = new Date();
    var birthday_input = prompt('When is your birthday? (mm/dd/yyyy)');
    var birthday = new Date(birthday_input);

    var differenceInTime = today.getTime() - birthday.getTime();
    var differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + differenceInDays + ' days old')
    h1.setAttribute('id', 'differenceInDaysId');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function resetAgeInDays() {
    document.getElementById('differenceInDaysId').remove();
}

// Generate Cats
function generateCat() {
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');

    image.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}

function removeGenerateCat() {
    var div = document.getElementById('flex-cat-gen');
    div.removeChild(div.lastElementChild);
}

function resetGenerateCat() {
    var div = document.getElementById('flex-cat-gen');
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

// rock paper scissors
function rpsGame(userChoice) {
    var humanChoice, botChoice;
    humanChoice = userChoice.id;
    botChoice = numberToChoice(randToRpsInt())
    results = decideWinner(humanChoice, botChoice);

    rpsFrontEnd(humanChoice, botChoice, finalMessage(results[0]))
}

function decideWinner(humanChoice, botChoice) {
    var rpsDatabase = {
        'rock': {
            'rock': 0.5,
            'paper': 0,
            'scissors': 1
        },

        'paper': {
            'rock': 1,
            'paper': 0.5,
            'scissors': 0
        },

        'scissors': {
            'rock': 0,
            'paper': 1,
            'scissors': 0.5
        }
    };

    var humanScore = rpsDatabase[humanChoice][botChoice];
    var botScore = rpsDatabase[botChoice][humanChoice];

    return [humanScore, botScore];
}

function randToRpsInt() {
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
    return ["rock", "paper", "scissors"][number];
}

function finalMessage(userScore) {
    switch(userScore) {
        case 0:
            return {'message': 'You lost!', 'color': 'red'};
        case 0.5:
            return {'message': 'You Tied!', 'color': 'yellow'};
        case 1:
            return {'message': 'You Won!', 'color': 'green'};
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    var imageDatabse = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    };

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');
    var replayDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imageDatabse[humanImageChoice] + "' style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>";
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px, padding: 30px; '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src='" + imageDatabse[botImageChoice] + "' style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>"
    replayDiv.innerHTML = "<button class='btn btn-primary' id='replay-button' onclick='resetRps()'>Replay</button>"
    
    document.getElementById('flex-box-rps-div').appendChild(replayDiv);
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

function resetRps() {
    var div = document.getElementById('flex-box-rps-div');
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }

    var newDiv = document.createElement('div');
    newDiv.innerHTML = `
            <div class="flex-box-rps" id="flex-box-rps-div">
                <img id="rock" src="static/images/rock.jpg" onclick="rpsGame(this)">
                <img id="paper" src="static/images/paper.jpg" onclick="rpsGame(this)">
                <img id="scissors" src="static/images/scissors.jpg" onclick="rpsGame(this)">
            </div>
    `;
    document.getElementById('container-3-id').appendChild(newDiv);
}


// change button colors
var all_buttons = document.getElementsByTagName('button');
var copyAllButtons = [];

for (let i=0; i < all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonThingy) {
    switch(buttonThingy.value) {
        case 'red':
            buttonRed();
            break;
        case 'green':
            buttonGreen();
            break;
        case 'reset':
            buttonColorReset();
            break;
        case 'random':
            buttonRandom();
            break;
    }
}

function buttonRed() {
    for (let i=0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonGreen() {
    for (let i=0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonColorReset() {
    for (let i=0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function buttonRandom() {
    var choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];
    

    for (let i=0; i < all_buttons.length; i++) {
        var randInt = Math.ceil(Math.random() * 3)
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randInt]);
    }
}

// Blackjack

let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '0C', 'KC', 'JC', 'QC', 'AC',
              '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '0S', 'KS', 'JS', 'QS', 'AS',
              '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '0H', 'KH', 'JH', 'QH', 'AH',
              '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '0D', 'KD', 'JD', 'QD', 'AD'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '0': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1, 11]},
    'numWins': 0,
    'numLosses': 0,
    'numDraws': 0,
    'count': 0
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);
document.querySelector('#blackjack-reset-button').addEventListener('click', blackjackReset);

var currentDeck = [];

function resetDeck() {
    for (let i=0; i < blackjackGame['cards'].length; i++) {
        currentDeck.push(blackjackGame['cards'][i]);
    }
}

resetDeck();

function blackjackHit() {
    document.querySelector('#blackjack-result').textContent = "Let's Play!";
    document.querySelector('#blackjack-result').style.color = 'black';
    let card = drawCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
}

function drawCard() {
    let ind = Math.floor(Math.random() * currentDeck.length);
    console.log(currentDeck.length);
    let currentCard = currentDeck[ind];
    let currentNum = currentCard[0]
    if (currentNum == 0) {
        currentNum = 10;
    } else if ((currentNum === 'A') || (currentNum === 'J') || (currentNum === 'Q') || (currentNum === 'K')) {
        currentNum = 10;
    } else {
        currentNum = Number(currentNum);
    }
    
    if ((currentNum >= 2) && (currentNum <= 6)) {
        blackjackGame['count'] += 1;
    } else if (currentNum == 10) {
        blackjackGame['count'] -= 1;
    }
    
    currentDeck.splice(ind, 1);
    
    if (currentDeck.length == 0) {
        resetDeck();
        blackjackGame['count'] = 0;
    }
    document.querySelector('#blackjack-count').textContent = blackjackGame['count'];
    document.querySelector('#blackjack-cards-left').textContent = currentDeck.length;
    
    if (blackjackGame['count'] > 0) {
        document.querySelector('#blackjack-table-status').textContent = 'Hot!';
        document.querySelector('#blackjack-table-status').style.color = 'red';
    } else {
        document.querySelector('#blackjack-table-status').textContent = 'Cold..';
        document.querySelector('#blackjack-table-status').style.color = 'skyblue';
    }
    
    
    return currentCard;
}

function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.jpg`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal() {
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

    for (i=0; i < yourImages.length; i++) {
        yourImages[i].remove();
    }

    for (i=0; i < dealerImages.length; i++) {
        dealerImages[i].remove();
    }

    let winner = computeWinner();
    updateResult(winner);

    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#your-blackjack-result').style.color = '#ffffff';

    document.querySelector('#dealer-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';
}

function updateScore(card, activePlayer) {
    if (card[0] === 'A') {
        if (activePlayer['score'] + blackjackGame['cardsMap'][card[0]][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card[0]][1];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card[0]][0];
        }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card[0]];
    }
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = `${activePlayer['score']} BUST!`;
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function dealerLogic() {
    while (DEALER['score'] < 21) {
        if (DEALER['score'] <= YOU['score']) {
            let card = drawCard();
            showCard(card, DEALER);
            updateScore(card, DEALER);
            showScore(DEALER);
        } else {
            break;
        }   
    }
}

function computeWinner() {
    let winner;

    if (YOU['score'] <= 21) {
        if ((YOU['score'] > DEALER['score']) || (DEALER['score'] > 21)) {
            winner = YOU;
        } else if (YOU['score'] < DEALER['score']){
            winner = DEALER;
        } else if (YOU['score'] === DEALER['score']){
            winner = null;
        }
        
    } else {
        winner = DEALER;
    }

    return winner;
}

function updateResult(winner) {
    let message, messageColor;
    if (winner === YOU) {
        blackjackGame['numWins'] += 1;
        document.querySelector('#wins').textContent = blackjackGame['numWins'];
        message = 'YOU WON!';
        messageColor = 'green';
        winSound.play();

    } else if (winner === DEALER) {
        blackjackGame['numLosses'] += 1;
        document.querySelector('#losses').textContent = blackjackGame['numLosses'];
        message = 'YOU LOST.';
        messageColor = 'red';
        lossSound.play();

    } else {
        blackjackGame['numDraws'] += 1;
        document.querySelector('#draws').textContent = blackjackGame['numDraws'];
        message = 'YOU TIED.';
        messageColor = 'yellow';
    }
    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
}

function blackjackReset() {
    blackjackGame['numWins'] = 0;
    document.querySelector('#wins').textContent = blackjackGame['numWins'];
    blackjackGame['numLosses'] = 0;
    document.querySelector('#losses').textContent = blackjackGame['numLosses'];
    blackjackGame['numDraws'] = 0;
    document.querySelector('#draws').textContent = blackjackGame['numDraws'];

}