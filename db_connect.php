<?php

$server = "localhost";
$user = "root";
$pw = "root";
$db = "blackjack";

$conn = mysqli_connect($server, $user, $pw, $db);

if (!$conn) {
    echo "Connection failed!";
}
