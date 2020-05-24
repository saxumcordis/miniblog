<?php
include '../database/db_connection.php';
if (isset($_SERVER["REMOTE_ADDR"]) && isset($_GET['email']) && isset($_GET['password'])) {
    $registerStatus = validateRegister();
    if ($registerStatus == 1) {
        fillUserInfo();
        echo "1";
    }
    else if ($registerStatus == -1)
        echo "-1";
    else if ($registerStatus == -2)
         echo "-2";
    else if ($registerStatus == 0)
         echo "0";
}


function validateRegister () {
    if (!isEmailBusy($_GET['email'])) {
        return registerUser();
    }
    return 0;
}

function isEmailBusy ($email) {
    $conn = openConnection();
    $sql = "SELECT email from users WHERE email='".$email."'";
    $check = $conn->query($sql)->num_rows;
    closeConnection($conn);
    return $check;
}

function registerUser() {
    $email = $_GET['email'];
    $password = md5($_GET['password']);
    $name = $_GET['name'];
    if (!checkData($name, $email, $_GET['password']))
        return -1;
    $date = registerDate();
    $access_token = md5($email);

    $conn = openConnection();
    $sql = "INSERT INTO users (name, email, password, access_token, created_at, updated_at) VALUES";
    $data = ' ("'.$name.'", "'.$email.'", "'.$password.'", "'.$access_token.'", "'.$date.'", "'.$date.'")';
    if ($conn->query($sql.$data) === TRUE)
        return 1;
    else
        return -2;
}

function registerDate() {
    $date = getdate();
    $date = $date['year'].'-'.$date['mon'].'-'.$date['mday'].' '.$date['hours'].':'.$date['minutes'].':'.$date['seconds'];
    return $date;
}

function checkData($name, $email, $password) {
    $patternEmail = '/^[a-zA-Z0-9_\.]+@[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+$/';
    $patternPassword = '/^(?=.*[a-z])(?=.*[A-ZА-Я])(?=.*\d)(?=.*[@$!%*?&])[A-Za-zа-яА-Я\d@$!%*?&]{7,15}$/';
    $patternName = '/^.{4,15}$/u';
    if (preg_match($patternEmail, $email) && preg_match($patternPassword, $password)
            && preg_match($patternName, $name))
        return 1;
    return 0;
}

function fillUserInfo() {
    $conn = openConnection();
    $userID = $conn->query("SELECT id from users WHERE email='".$_GET['email']."'")->fetch_assoc()['id'];
    $sql = "INSERT INTO userinfo (userID, description) VALUES";
    $data = ' ("'.$userID.'", "new user")';
    $conn->query($sql.$data);
    closeConnection($conn);
}