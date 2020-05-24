<?php
include 'user.php';
if (isset($_GET['access_token']) && isAuth($_GET['access_token'])) {
    if (isset($_GET['get_users']))
        echo getUserIDList();
}
else
    echo "-1";

function getUserIDList() {
    $conn = openConnection();
    $sql = "SELECT id from users";
    $usersID = $conn->query($sql);
    closeConnection($conn);
    $users = array();
   while ($userID = $usersID->fetch_assoc())
      array_push($users, getUser($userID['id']));
    return json_encode($users, JSON_PRETTY_PRINT);
}

?>