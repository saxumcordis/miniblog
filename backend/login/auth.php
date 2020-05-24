<?php
include '../database/db_connection.php';
if (isset($_SERVER["REMOTE_ADDR"]) && isset($_GET['email']) && isset($_GET['password'])) {
    echo getSession(checkUser());

}

function checkUser() {
    $conn = openConnection();
    $email = $_GET['email'];
    $pass = md5($_GET['password']);
    $sql = "SELECT * from users WHERE email = '".$email."' AND password = '".$pass."'";
    $result = $conn->query($sql);
    closeConnection($conn);
    return $result->num_rows ? $result : 0;
}

function getSession($data) {
    if (!$data)
        return 0;
    $userData = $data->fetch_assoc();
    return '{"access_token":"'.updateAccessToken().'",'
            .'"id":"'.$userData['id'].'"}';
}

function updateAccessToken() {
    $conn = openConnection();
    $newToken = md5(getAuthDate());
    $sql = "UPDATE users SET access_token='".$newToken."' WHERE email='".$_GET['email']."'";
    $conn->query($sql);
    closeConnection($conn);
    return $newToken;
}

function getAuthDate() {
    $date = getdate();
    $date = $date['year'].'-'.$date['mon'].'-'.$date['mday'].' '.$date['hours'].':'.$date['minutes'].':'.$date['seconds'];
    return $date;
}

?>