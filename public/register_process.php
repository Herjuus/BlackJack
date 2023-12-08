<?php

// Process register form

include 'db_connect.php';

// Validate user input and insert into database

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $email = $_POST['email'];


    if (empty($username)) {
        header("Location: register.php?error=Username is required!");
        exit();
    } else if (empty($password)) {
        header("Location: register.php?error=Password is required!");
        exit();
    }

    $sql = "INSERT INTO user (username, password, email) VALUES ('$username', '$password', '$email')";

    if ($conn->query($sql) === TRUE) {
        header("Location: index.php");
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
