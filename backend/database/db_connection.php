<?php
session_start();

function openConnection()
{
    $dbHost = "localhost";
    $dbUser = "root";
    $dbPassword = "";
    $db = "coursework";

    $conn = new mysqli($dbHost, $dbUser, $dbPassword, $db);
    if ($conn->connect_error)
        die("Connection failed: " . $conn->connect_error);

    return $conn;
}

function closeConnection($conn) {
    mysqli_close($conn);
}

?>