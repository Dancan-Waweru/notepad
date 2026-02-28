<?php
session_start();

$host = "localhost";
$dbname = "Ophelia";
$dbuser = "root";
$dbpass = "";

$conn = new mysqli($host, $dbuser, $dbpass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$username = $_POST['username'];
$password = $_POST['password'];

// fetch user
$stmt = $conn->prepare("SELECT id, password FROM user WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    // verify password
    if (password_verify($password, $user['password'])) {

        // create session
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $username;

        // go to dashboard
        header("Location: ../dashboard/");
        exit();
    } else {
        echo "Wrong password.";
    }
} else {
    echo "User not found.";
}

$stmt->close();
$conn->close();
?>
