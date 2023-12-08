<?php
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||| Lager en connection variabel som blir brukt for å koble til rett database i andre dokument ||||||||
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
$server = "localhost";
$user = "root";
$pw = "root";
$db = "blackjack";

$conn = mysqli_connect($server, $user, $pw, $db);

if (!$conn) {
    echo "Connection failed!";
}
