<?php
include '../database/db_connection.php';
if (isset($_GET['access_token']) && isset($_GET['id']) && isAuth($_GET['access_token'])) {
    $response = "";
    if (isset($_GET['getUser']))
        $response .= getUser($_GET['id']);
    echo $response;
}

function getUser ($id) {
    $conn = openConnection();
    $sql = "SELECT * from userinfo WHERE userID ='".$id."'";
    $result = $conn->query($sql);
    if ($result->num_rows) {
        $result = $result->fetch_assoc();
        $result["name"] = $conn->query("SELECT name from users WHERE id ='".$id."'")->fetch_assoc()['name'];
        closeConnection($conn);
        return json_encode($result, JSON_PRETTY_PRINT);
    }
    return 0;
}

function isAuth($access_token) {
    $conn = openConnection();
    $check = $conn->query("SELECT * from users WHERE access_token ='".$access_token."'");
    $status = $check->num_rows ? 1 : 0;
    closeConnection($conn);
    return $status;
}

?>