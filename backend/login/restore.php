<?php
include '../database/db_connection.php';

if (isset($_SERVER["REMOTE_ADDR"]) && isset($_GET['email']) && isset($_GET['name'])) {
    echo restoreUser();
}

function restoreUser() {
    $name = $_GET['name'];
    $email = $_GET['email'];

    if (isUserExists($email, $name))
        return changePassword($email);
    return 0;

}

function isUserExists($email, $name) {
    $conn = openConnection();
    $sql = "SELECT id from users WHERE email='".$email."' and name='".$name."'";
    $isExists = $conn->query($sql);
    closeConnection($conn);

    return $isExists->num_rows;
}

function checkPassword($pass) {
    $patternPassword = '/^(?=.*[a-z])(?=.*[A-ZА-Я])(?=.*\d)(?=.*[@$!%*?&])[A-Za-zа-яА-Я\d@$!%*?&]{7,15}$/';

    return preg_match($patternPassword, $pass);
}

function changePassword($email) {
    $pass = $_GET['restore_pass'];
    if (!checkPassword($pass))
        return 2;
    $pass = md5($pass);
    $conn = openConnection();
    $sql = "UPDATE users SET password='".$pass."', updated_at='".getUpdateDate()."' WHERE email='".$email."'";
    $result = ($conn->query($sql) === TRUE);
    closeConnection($conn);
    if ($result)
        return 1;
    else
        return -1;
}

function getUpdateDate() {
    $date = getdate();
    $date = $date['year'].'-'.$date['mon'].'-'.$date['mday'].' '.$date['hours'].':'.$date['minutes'].':'.$date['seconds'];
    return $date;
}


?>