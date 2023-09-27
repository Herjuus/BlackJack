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
        random.shuffle(this.deck);
    }

    deal() {
        return this.deck.pop();
        document.getElementById("yourHand").innerHTML += "<img src='" + this.deck.pop().image + "' />";
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function playGame() {
    var deck1 = new Deck()
    // var deck2 = new Deck()
    // var deck3 = new Deck()
    // var deck4 = new Deck()


    shuffleArray(deck1.deck)
    // shuffleArray(deck2.deck)
    // shuffleArray(deck3.deck)
    // shuffleArray(deck4.deck)

    var hand1 = new Hand()
    var hand2 = new Hand()

    hit(deck1, hand1)
    hit(deck1, hand2)

    hit(deck1, hand1)
    hit(deck1, hand2)
}

class Hand {
    constructor() {
        this.cards = [];
        this.value = 0;
        this.aces = 0;
    }

    addCard(card) {
        this.cards.push(card);
        this.value += values[card.rank];
        if (card.rank === 'Ace') {
            this.aces += 1;
        }
    }

    adjustForAce() {
        while (this.value > 21 && this.aces) {
            this.value -= 10;
            this.aces -= 1;
        }
    }
}

// class Chips {
//     constructor() {
//         this.total = 100;
//         this.bet = 0;
//     }

//     winBet() {
//         this.total += this.bet;
//     }

//     loseBet() {
//         this.total -= this.bet;
//     }
// }

// function takeBet(chips) {
//     while (true) {
//         const bet = parseInt(prompt('How many chips would you like to bet?'), 10);
//         if (isNaN(bet)) {
//             alert('Sorry, a bet must be an integer!');
//         } else if (bet > chips.total) {
//             alert(`Sorry, your bet can't exceed ${chips.total}`);
//         } else {
//             chips.bet = bet;
//             break;
//         }
//     }
// }

function hit(deck, hand) {
    hand.addCard(deck.deal());
    hand.adjustForAce();
}

let playing = true;

function hitOrStand(deck, hand) {
    while (playing) {
        const choice = prompt("Would you like to Hit or Stand? Enter 'h' or 's'");
        if (choice.toLowerCase() === 'h') {
            hit(deck, hand);
        } else if (choice.toLowerCase() === 's') {
            alert("Player stands. Dealer is playing.");
            playing = false;
        } else {
            alert("Sorry, please try again.");
        }
    }
}

function showSome(player, dealer) {
    console.log("\nDealer's Hand:");
    console.log(" <card hidden>");
    console.log('', dealer.cards[1].toString());
    console.log("\nPlayer's Hand:");
    for (const card of player.cards) {
        console.log(card.toString());
    }
}

function showAll(player, dealer) {
    console.log("\nDealer's Hand:");
    for (const card of dealer.cards) { }
}

