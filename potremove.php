<?php
include 'db_connect.php';

session_start();

// Assuming POST request is sent with JSON data
$data = json_decode(file_get_contents('php://input'), true);

if (isset($_SESSION['id']) && isset($data['outcome'])) {
    // Retrieving userid and chips from the POST data
    $userId = $_SESSION['id'];
    $sql = "SELECT chips FROM pot WHERE user_id = '$userId'";
    $chips = mysqli_query($conn, $sql);
    $outcome = $data['outcome'];

    if ($outcome == 'blackjack') {
        $chips = $chips * 2;
        $sql2 = "UPDATE user SET chips = chips + '$chips' WHERE id = '$userId'";
        if ($conn->query($sql2) === TRUE) {
        } else {
            $response = array('success' => false, 'message' => 'Error:blackjack ' . $conn->error);
            echo json_encode($response);
        }
    } elseif ($outcome == 'win') {
        $chips = $chips * 1.5;
        $sql2 = "UPDATE user SET chips = chips + '$chips' WHERE id = '$userId'";
        if ($conn->query($sql2) === TRUE) {
        } else {
            $response = array('success' => false, 'message' => 'Error:win ' . $conn->error);
            echo json_encode($response);
        }
    } elseif ($outcome == 'tie') {
        $chips = $chips;
        $sql2 = "UPDATE user SET chips = chips + '$chips' WHERE id = '$userId'";
        if ($conn->query($sql2) === TRUE) {
        } else {
            $response = array('success' => false, 'message' => 'Error:tie ' . $conn->error);
            echo json_encode($response);
        }
    } elseif ($outcome == 'loss') {
        $chips = 0;
        $sql2 = "UPDATE user SET chips = chips + '$chips' WHERE id = '$userId'";
        if ($conn->query($sql2) === TRUE) {
        } else {
            $response = array('success' => false, 'message' => 'Error:loss ' . $conn->error);
            echo json_encode($response);
        }
    }

    $sql3 = "DELETE FROM pot WHERE user_id = '$userId'";
    if ($conn->query($sql3) === TRUE) {
    } else {
        $response = array('success' => false, 'message' => 'Error:deletefrom ' . $conn->error);
        echo json_encode($response);
    }

    // Sending a response back to the client
    $response = array('success' => true, 'message' => 'Chips awarded ' . $userId);
    echo json_encode($response);
} else {
    // If userid or chips are not received properly
    $response = array('success' => false, 'message' => 'Missing data');
    echo json_encode($response);
}
