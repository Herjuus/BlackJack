<?php
session_start();
include 'db_connect.php';

// If the user is logged in, show the game. If not, redirect to index.php

if (isset($_SESSION['id']) && isset($_SESSION['username'])) {

  $sql = "SELECT chips FROM user WHERE id = " . $_SESSION['id'];
  $result = $conn->query($sql);
  $row = $result->fetch_assoc();
  $chips = $row['chips'];

?>
  <!--
||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
|||||| Selve blackjack siden, de fleste divene blir lagt til via js ||||||
||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  -->
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="blackJack.css?v=<?php echo time(); ?>" />
    <title>BlackJack.kg</title>
  </head>

  <body>

    <header>
      <button id="startButton" onclick="startGame()">Start!</button>
      <h1 id="winner">BlackJack.KG</h1> <button onclick="reset()">reset</button>
    </header>

    <div class="table">
      <div class="handBack">
        <h2 id="dealerScore"></h2>
        <div id="dealerHand">
          <!-- <img src="kort/10_of_clubs.svg" class="firstCard" alt="kort">
          <img src="kort/10_of_hearts.svg" class="secondCard" alt="kort">
          <img src="kort/10_of_hearts.svg" class="thirdCard" alt="kort"> -->
        </div>
      </div>

      <div class="handBack">
        <h2 id="playerScore"></h2>
        <div id="playerHand">
          <!-- <img src="kort/10_of_clubs.svg" class="firstCard" alt="kort">
          <img src="kort/10_of_hearts.svg" class="secondCard" alt="kort">
          <img src="kort/10_of_hearts.svg" class="thirdCard" alt="kort"> -->
        </div>
      </div>

      <div id="chipCase">
        <h1>Your chips</h1>
        <h2 id="yourBalance"><?php echo $chips ?></h2>
        <div class="buttonCase">
          <button class="chip" id="plus10" onclick="changeBet(event)">10</button>
          <button class="chip" id="plus50" onclick="changeBet(event)">50</button>
          <button class="chip" id="plus100" onclick="changeBet(event)">100</button>
          <button id="betButton" onclick="betting()">Bet</button>
          <input type="number" min="0" id="yourBet" value="0" />
          <button id="stand" onclick="stand()">STAND</button>
          <button id="hitMe" onclick="hitMe()">HIT</button>

        </div>
      </div>
    </div>

    </div>

    <footer><a href="logout.php">Logg ut</a></footer>

  </body>
  <script src="blackJack.js?v=<?php echo time(); ?>"></script>

  </html>

<?php
} else {
  header("Location: index.php");
  exit();
}
?>