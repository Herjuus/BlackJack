// HOVED JS FOR BLACKJACK FUNKSJONER

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||| Kort og kortstokk laging |||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

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

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||| Start og reset spill |||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

document.getElementById("hitMe").disabled = true;
document.getElementById("stand").disabled = true;
document.getElementById("startButton").disabled = true;

function startGame() {
  document.getElementById("hitMe").disabled = false;
  document.getElementById("stand").disabled = false;
  document.getElementById("betButton").disabled = true;
  const deck1 = new Deck();
  deck1.shuffle();
  const dealerHand = [];
  const playerHand = [];

  dealerHand.push(deck1.deck.pop());
  playerHand.push(deck1.deck.pop());
  dealerHand.push(deck1.deck.pop());
  playerHand.push(deck1.deck.pop());

  document.getElementById("dealerHand").innerHTML += '<img id="firstD" class="rot6" src="' + dealerHand[0].image + '" alt="kort">';
  document.getElementById("playerHand").innerHTML += '<img id="firstP" class="rot6" src="' + playerHand[0].image + '" alt="kort">';
  document.getElementById("dealerHand").innerHTML += '<img id="secondD" class="rot8" src="' + dealerHand[1].image + '" alt="kort">';
  document.getElementById("playerHand").innerHTML += '<img id="secondP" class="rot8" src="' + playerHand[1].image + '" alt="kort">';
  document.getElementById("startButton").disabled = true;

  // updateDealerHand();
  // updatePlayerHand();

  sessionStorage.setItem('deck1', JSON.stringify(deck1));
  sessionStorage.setItem('dealerHand', JSON.stringify(dealerHand));
  sessionStorage.setItem('playerHand', JSON.stringify(playerHand));

  calculateDealerHand();
  calculatePlayerHand();
}

let rounds = 0;

function reset() {
  rounds++;
  if (rounds == 5) {

  }
  sessionStorage.clear();
  document.getElementById("dealerHand").innerHTML = "";
  document.getElementById("playerHand").innerHTML = "";
  document.getElementById("dealerScore").innerHTML = "0";
  document.getElementById("playerScore").innerHTML = "0";
  document.getElementById("winner").innerHTML = "Blackjack.KG";
  document.getElementById("hitMe").disabled = true;
  document.getElementById("stand").disabled = true;
  document.getElementById("startButton").disabled = true;
  document.getElementById("betButton").disabled = false;
  document.getElementById("plus10").disabled = false;
  document.getElementById("plus50").disabled = false;
  document.getElementById("plus100").disabled = false;
  const rest = [];
  for (i = 0; i < dealerHand.length; i++) {
    rest.push(dealerHand.pop());
  }
  for (i = 0; i < playerHand.length; i++) {
    rest.push(playerHand.pop());
  }
  console.log(rest);
  if (rounds == 5) {
    for (i = 0; i < deck1.length; i++) {
      rest.push(deck1.pop());
    }
    startGame();
  }
}

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||| Hit and stand for player |||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

var hitAmount = 0;  //hitAmount is used to keep track of how many times the player has hit

function hitMe() {
  hitAmount++;

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
  const playerHand = JSON.parse(sessionStorage.getItem('playerHand'));
  playerHand.push(deck1.deck.pop());


  //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  //|||||| Setter nye kort i riktig klass for at de skal ligge oppå hverandre ||||||||
  //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


  if (hitAmount == 1) {
    style = 'class="rot9"';
    const x = playerHand.length - 1;

    document.getElementById('firstP').className = 'rot5';
    document.getElementById('secondP').className = 'rot7';

    document.getElementById("playerHand").innerHTML += '<img id="thirdP" src="' + playerHand[x].image + '"' + style + ' alt="kort">';
  } else if (hitAmount == 2) {
    style = 'class="rot10"';
    const x = playerHand.length - 1;

    document.getElementById('firstP').className = 'rot4';
    document.getElementById('secondP').className = 'rot6';
    document.getElementById('thirdP').className = 'rot8';

    document.getElementById("playerHand").innerHTML += '<img id="fourthP" src="' + playerHand[x].image + '"' + style + ' alt="kort">';
  } else if (hitAmount == 3) {
    style = 'class="rot11"';
    const x = playerHand.length - 1;

    document.getElementById('firstP').className = 'rot3';
    document.getElementById('secondP').className = 'rot5';
    document.getElementById('thirdP').className = 'rot7';
    document.getElementById('fourthP').className = 'rot9';

    document.getElementById("playerHand").innerHTML += '<img id="fifthP" src="' + playerHand[x].image + '"' + style + ' alt="kort">';
  } else if (hitAmount == 4) {
    style = 'class="rot12"';
    const x = playerHand.length - 1;

    document.getElementById('firstP').className = 'rot2';
    document.getElementById('secondP').className = 'rot4';
    document.getElementById('thirdP').className = 'rot6';
    document.getElementById('fourthP').className = 'rot8';
    document.getElementById('fifthP').className = 'rot10';

    document.getElementById("playerHand").innerHTML += '<img id="sixth" src="' + playerHand[x].image + '"' + style + ' alt="kort">';
  } else if (hitAmount == 5) {
    style = 'class="rot13"';
    const x = playerHand.length - 1;

    document.getElementById('firstP').className = 'rot3';
    document.getElementById('secondP').className = 'rot5';
    document.getElementById('thirdP').className = 'rot7';
    document.getElementById('fourthP').className = 'rot9';
    document.getElementById('fifthP').className = 'rot11';

    document.getElementById("playerHand").innerHTML += '<img id="seventh" src="' + playerHand[x].image + '"' + style + ' alt="kort">';
  }

  console.log(playerHand);


  sessionStorage.setItem('deck1', JSON.stringify(deck1));
  sessionStorage.setItem('playerHand', JSON.stringify(playerHand));

  calculateDealerHand();
  calculatePlayerHand();
}

function stand() {
  document.getElementById("hitMe").disabled = true;
  document.getElementById("stand").disabled = true;

  // Get scores
  const dealerScore = JSON.parse(document.getElementById("dealerScore").innerHTML);
  const playerScore = JSON.parse(document.getElementById("playerScore").innerHTML);

  // Check if player has blackjack
  if (playerScore == 21) {
    checkWinner();
    return;
  }

  // Check if player has more than 21
  if (playerScore > 21) {
    checkWinner();
    return;
  }

  // Dealer draws cards until they reach a score of 17 or higher
  for (i = 0; i < 5; i++) {
    if (dealerScore < 17) {
      hitDealer();
      calculateDealerHand();
    } else {
      break;
    }
  }

  // Check the winner after the dealer has drawn their cards
  checkWinner();
}


//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||Hit for dealer |||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||



function hitDealer() {
  hitAmount++;
  calculateDealerHand();
  calculatePlayerHand();

  // Get session storage
  const deck1 = JSON.parse(sessionStorage.getItem('deck1'));
  const dealerHand = JSON.parse(sessionStorage.getItem('dealerHand'));

  //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  //|||||| Setter nye kort i riktig klass for at de skal ligge oppå hverandre ||||||||
  //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

  if (hitAmount == 1) {
    style = 'class="rot9"';
    const x = dealerHand.length - 1;

    document.getElementById('firstD').className = 'rot5';
    document.getElementById('secondD').className = 'rot7';

    document.getElementById("dealerHand").innerHTML += '<img id="thirdD" class="" src="' + dealerHand[x].image + '"' + style + ' alt="kort">';
  } else if (hitAmount == 2) {
    style = 'class="rot10"';
    const x = dealerHand.length - 1;

    document.getElementById('firstD').className = 'rot4';
    document.getElementById('secondD').className = 'rot6';
    document.getElementById('thirdD').className = 'rot8';

    document.getElementById("dealerHand").innerHTML += '<img id="fourthD" class="" src="' + dealerHand[x].image + '"' + style + ' alt="kort">';
  } else if (hitAmount == 3) {
    style = 'class="rot11"';
    const x = dealerHand.length - 1;

    document.getElementById('firstD').className = 'rot3';
    document.getElementById('secondD').className = 'rot5';
    document.getElementById('thirdD').className = 'rot7';
    document.getElementById('fourthD').className = 'rot9';

    document.getElementById("dealerHand").innerHTML += '<img id="fifthD" class="" src="' + dealerHand[x].image + '"' + style + ' alt="kort">';
  }

  // Update session storage
  sessionStorage.setItem('deck1', JSON.stringify(deck1));
  sessionStorage.setItem('dealerHand', JSON.stringify(dealerHand));

  calculateDealerHand();
}

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||| Check winner, calculate playerhand and dealerhand ||||||||||
//|||||| Alt som trengs for å sjekke vinner |||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

function checkWinner() {

  let outcome = 'nothing';

  var dealerScore = JSON.parse(document.getElementById("dealerScore").innerHTML);
  var playerScore = JSON.parse(document.getElementById("playerScore").innerHTML);
  calculateDealerHand();
  calculatePlayerHand();

  //||||||||||||||||||||||||||||||||||||
  //|||||| Selve vinner logikken |||||||
  //||||||||||||||||||||||||||||||||||||

  if (playerScore == 21 && dealerScore != 21) {
    document.getElementById("winner").innerHTML = "You win!";
    outcome = 'blackjack';
  } else if (playerScore > 21 && dealerScore <= 21) {
    document.getElementById("winner").innerHTML = "Dealer wins!";
    outcome = 'loss';
  } else if (dealerScore > 21 || playerScore > dealerScore) {
    document.getElementById("winner").innerHTML = "You win!";
    outcome = 'win';
  } else if (playerScore < dealerScore) {
    document.getElementById("winner").innerHTML = "Dealer wins!";
    outcome = 'loss';
  } else {
    document.getElementById("winner").innerHTML = "It's a tie!";
    outcome = 'tie';
  }

  //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  //|||||| Sender data til backend for å regne hvor mye chips man vinner å sette inn i database ||||||||
  //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

  console.log(outcome);
  const data = {
    // userid: userId,
    outcome: outcome
  };

  fetch('../potremove.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      // Handle the response data here
      console.log('Response from server:', data);
    })
  // .catch(error => {
  //   // Handle errors here
  //   console.error('There was a problem with the fetch operation:', error);
  // });


}

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||| Begge calculate funksjonene er for å ha playerscore og dealerscore med rett verdi for ess ||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

function calculatePlayerHand() {
  playerHand = JSON.parse(sessionStorage.getItem('playerHand'));
  var currentHandValue = parseInt(document.getElementById("playerScore").innerHTML);
  var aceValue = 0;

  for (i = 0; i < playerHand.length; i++) {
    if (playerHand[i].rank == "ace") {
      if (currentHandValue >= 11) {
        aceValue += 1;
      } else {
        aceValue += 11;
      }
    } else if (playerHand[i].rank == "jack" || playerHand[i].rank == "queen" || playerHand[i].rank == "king") {
      aceValue += 10;
    } else {
      aceValue += JSON.parse(playerHand[i].rank);
    }
  }

  document.getElementById("playerScore").innerHTML = aceValue;
}

function calculateDealerHand() {
  dealerHand = JSON.parse(sessionStorage.getItem('dealerHand'));
  var currentHandValue = parseInt(document.getElementById("dealerScore").innerHTML);
  var aceValue = 0;

  for (i = 0; i < dealerHand.length; i++) {
    if (dealerHand[i].rank == "ace") {
      if (currentHandValue > 10) {
        aceValue += 1;
      } else {
        aceValue += 11;
      }
    } else if (dealerHand[i].rank == "jack" || dealerHand[i].rank == "queen" || dealerHand[i].rank == "king") {
      aceValue += 10;
    } else {
      aceValue += JSON.parse(dealerHand[i].rank);
    }
  }

  document.getElementById("dealerScore").innerHTML = aceValue;
}

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||| Vedde system |||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||



function checkBalance() {
  var balance = document.getElementById("yourBalance").innerHTML;
  if (balance <= 0) {
    window.alert("You don't have any money left!");
    document.getElementById("betButton").disabled = true;
  }
}

function betting() {
  var balance = document.getElementById("yourBalance").innerHTML;
  var bet = document.getElementById("yourBet").value;

  // const userId = 'userID';
  const chips = bet; // Replace with the actual number of chips

  const data = {
    // userid: userId,
    chips: chips
  };

  //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  //|||||| Legger de chipsene man vedder inn i potten ||||||||
  //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

  fetch('../potadd.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      // Handle the response data here
      console.log('Response from server:', data);
    })
    .catch(error => {
      // Handle errors here
      console.error('There was a problem with the fetch operation:', error);
    });



  // var balance = document.getElementById("balance").innerHTML;
  var newBalance = balance - bet;
  if (newBalance < 0) {
    window.alert("You don't have enough money!");
  } else {
    document.getElementById("yourBalance").innerHTML = newBalance;
    document.getElementById("startButton").disabled = false;
    document.getElementById("betButton").disabled = true;
    document.getElementById("betButton").disabled = true;
    document.getElementById("plus10").disabled = true;
    document.getElementById("plus50").disabled = true;
    document.getElementById("plus100").disabled = true;
  }
}

function changeBet(event) {
  let bet = parseInt(document.getElementById("yourBet").value);
  let change = event.target.innerHTML;
  change = parseInt(change);
  console.log(change);
  bet += change;
  document.getElementById("yourBet").value = bet;
}
