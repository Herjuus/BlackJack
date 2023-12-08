<?php
include 'db_connect.php';

session_start();

// Assuming POST request is sent with JSON data
$data = json_decode(file_get_contents('php://input'), true);

if (isset($_SESSION['id']) && isset($data['chips'])) {
    // Retrieving userid and chips from the POST data
    $userId = $_SESSION['id'];
    $chips = $data['chips'];

    $sql1 = "INSERT INTO pot (user_id, chips) VALUES ('$userId', '$chips')";
    if ($conn->query($sql1) === TRUE) {
        // header("Location: public/index.php");
    } else {
        echo "Error: " . $sql1 . "<br>" . $conn->error;
    }

    $sql2 = "UPDATE user SET chips = chips - '$chips' WHERE id = '$userId'";
    if ($conn->query($sql2) === TRUE) {
        // header("Location: public/index.php");
    } else {
        echo "Error: " . $sql2 . "<br>" . $conn->error;
    }

    // Sending a response back to the client
    $response = array('success' => true, 'message' => 'Chips added to pot ' . $userId);
    echo json_encode($response);
} else {
    // If userid or chips are not received properly
    $response = array('success' => false, 'message' => 'Missing userid or chips');
    echo json_encode($response);
}
