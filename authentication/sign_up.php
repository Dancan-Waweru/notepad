<?php
$host = "localhost";
$dbname = "Ophelia";
$dbuser = "root";      // change if needed
$dbpass = "";          // change if needed

// connect to database
$conn = new mysqli($host, $dbuser, $dbpass, $dbname);

// check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// get form data
$username = $_POST['username'];
$password = $_POST['password'];

// hash the password (this is critical)
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// prepare SQL (prevents SQL injection)
$stmt = $conn->prepare("INSERT INTO user (username, password) VALUES (?, ?)");
$stmt->bind_param("ss", $username, $hashedPassword);

// execute

if ($stmt->execute()) {
    // redirect to dashboard folder
    header("Location: ../dashboard/");
    exit();
}  else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
