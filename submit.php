<?php
// Database credentials
$servername = "localhost"; // Use your server host
$username = "xbygrwxg_mscorp7";        // Use your MySQL username
$password = "ms7777ms";            // Use your MySQL password
$dbname = "xbygrwxg_mscorp7";        // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Insert data into database
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $comments = $_POST['comments'];

    $sql = "INSERT INTO msform1 (name, email, comments) VALUES ('$name', '$email', '$comments')";
    if ($conn->query($sql) === TRUE) {
        echo "Submitted successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Retrieve data from database
$sql = "SELECT * FROM msform1";
$result = $conn->query($sql);

$conn->close();
?>
