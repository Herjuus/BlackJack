const suits = ['hearts', 'diamonds', 'spades', 'clubs'];
const ranks = ['2', '3', '4', '5', '6', '7', '8',
  '9', '10', 'jack', 'queen', 'king', 'ace'];
const values = {
  'Two': 2, 'Three': 3, 'Four': 4, 'Five': 5, 'Six': 6, 'Seven': 7,
  'Eight': 8, 'Nine': 9, 'Ten': 10, 'Jack': 10, 'Queen': 10,
  'King': 10, 'Ace': 11,
};



class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
    this.image = 'kort/' + rank + '_of_' + suit + '.svg';
  }

  toString() {
    return `${this.rank} of ${this.suit}`;
  }
}

class Deck {
  constructor() {
    this.deck = [];
    for (const suit of suits) {
      for (const rank of ranks) {
        this.deck.push(new Card(suit, rank));
      }
    }
  }

  shuffle() {
    shuffleArray(this.deck);
  }

  deal() {
    return this.deck.pop();
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startGame() {
  const deck1 = new Deck();
  deck1.shuffle();
  const dealerHand = [];
  const yourHand = [];

  dealerHand.push(deck1.deck.pop());
  yourHand.push(deck1.deck.pop());
  dealerHand.push(deck1.deck.pop());
  yourHand.push(deck1.deck.pop());

  document.getElementById("dealerHand").innerHTML += "<img src='" + dealerHand[0].image + "' alt='kort'>";
  document.getElementById("yourHand").innerHTML += "<img src='" + yourHand[0].image + "' alt='kort'>";
  document.getElementById("dealerHand").innerHTML += "<img src='" + dealerHand[1].image + "' alt='kort'>";
  document.getElementById("yourHand").innerHTML += "<img src='" + yourHand[1].image + "' alt='kort'>";

  document.getElementById("startButton").disabled = true;

  // updateDealerHand();
  // updatePlayerHand();

  sessionStorage.setItem('deck1', JSON.stringify(deck1));
  sessionStorage.setItem('dealerHand', JSON.stringify(dealerHand));
  sessionStorage.setItem('yourHand', JSON.stringify(yourHand));

  calculateDealerHand();
  calculatePlayerHand();
}


function hitMe() {
  calculateDealerHand();
  calculatePlayerHand();
  var playerScore = JSON.parse(document.getElementById("playerScore").innerHTML);
  if (playerScore >= 21) {
    document.getElementById("hitMe").disabled = true;
    checkWinner();
    window.alert("You can't hit anymore!");
    return;
  }
  const deck1 = JSON.parse(sessionStorage.getItem('deck1'));
  console.log(deck1);

  const yourHand = JSON.parse(sessionStorage.getItem('yourHand'));
  console.log(yourHand);
  yourHand.push(deck1.deck.pop());

  const x = yourHand.length - 1;
  document.getElementById("yourHand").innerHTML += "<img src='" + yourHand[x].image + "' alt='kort'>";

  sessionStorage.setItem('deck1', JSON.stringify(deck1));
  sessionStorage.setItem('yourHand', JSON.stringify(yourHand));

  calculateDealerHand();
  calculatePlayerHand();
}

function stand() {
  document.getElementById("hitMe").disabled = true;
  document.getElementById("stand").disabled = true;
  var dealerScore = JSON.parse(document.getElementById("dealerScore").innerHTML);
  var playerScore = JSON.parse(document.getElementById("playerScore").innerHTML);
  if (dealerScore < 17) {
    if (dealerScore >= playerScore) {
      calculateDealerHand();
      calculatePlayerHand();
      checkWinner();
    } else {
      setTimeout(hitDealer, 1000);
      calculateDealerHand();
      calculatePlayerHand();
      setTimeout(stand, 1500);
    }
  } else {
    calculateDealerHand();
    calculatePlayerHand();
    checkWinner();
  }
}

function hitDealer() {
  const deck1 = JSON.parse(sessionStorage.getItem('deck1'));
  console.log(deck1);
  const dealerHand = JSON.parse(sessionStorage.getItem('dealerHand'));
  console.log(dealerHand);
  dealerHand.push(deck1.deck.pop());
  const x = dealerHand.length - 1;
  document.getElementById("dealerHand").innerHTML += "<img src='" + dealerHand[x].image + "' alt='kort'>";
  sessionStorage.setItem('deck1', JSON.stringify(deck1));
  sessionStorage.setItem('dealerHand', JSON.stringify(dealerHand));

  calculateDealerHand();
}

function checkWinner() {
  var dealerScore = JSON.parse(document.getElementById("dealerScore").innerHTML);
  var playerScore = JSON.parse(document.getElementById("playerScore").innerHTML);
  calculateDealerHand();
  calculatePlayerHand();
  console.log(dealerScore);
  console.log(playerScore);
  if (playerScore > 21 && dealerScore <= 21) {
    document.getElementById("winner").innerHTML = "Dealer wins!1";
  } else if (dealerScore == 21 && playerScore != 21) {
    document.getElementById("winner").innerHTML = "Dealer wins!2";
  } else if (dealerScore > playerScore && dealerScore <= 21) {
    document.getElementById("winner").innerHTML = "Dealer wins!3";
  } else if (dealerScore < playerScore && playerScore <= 21) {
    document.getElementById("winner").innerHTML = "You win!";
  } else {
    document.getElementById("winner").innerHTML = "It's a tie!";
  }
}

function calculatePlayerHand() {
  yourHand = JSON.parse(sessionStorage.getItem('yourHand'));
  var currentValue = 0;

  for (i = 0; i < yourHand.length; i++) {
    if (yourHand[i].rank == "ace") {
      if (currentValue > 10) {
        currentValue += 1;
      } else {
        currentValue += 11;
      }
    } else if (yourHand[i].rank == "jack" || yourHand[i].rank == "queen" || yourHand[i].rank == "king") {
      currentValue += 10;
    } else {
      currentValue += JSON.parse(yourHand[i].rank);
    }
  }

  document.getElementById("playerScore").innerHTML = currentValue;
}

function calculateDealerHand() {
  dealerHand = JSON.parse(sessionStorage.getItem('dealerHand'));
  var currentValue = 0;

  for (i = 0; i < dealerHand.length; i++) {
    if (dealerHand[i].rank == "ace") {
      if (currentValue > 10) {
        currentValue += 1;
      } else {
        currentValue += 11;
      }
    } else if (dealerHand[i].rank == "jack" || dealerHand[i].rank == "queen" || dealerHand[i].rank == "king") {
      currentValue += 10;
    } else {
      currentValue += JSON.parse(dealerHand[i].rank);
    }
  }

  document.getElementById("dealerScore").innerHTML = currentValue;
}