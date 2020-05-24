<?php
include '../database/db_connection.php';

if (isset($_GET['access_token']) && isAuth($_GET['access_token'])) {
    if (isset($_GET['get_posts']))
        echo getPosts();
    else if (isset($_GET['send_post']))
        echo sendPost();
}
else
    echo "-1";

function getPosts() {
    if (isset($_GET['id'])) {
        $conn = openConnection();
        $sql = "SELECT * from posts WHERE userID ='" . $_GET['id'] . "'";
        $posts = array();

        $getPosts = $conn->query($sql);
        if ($getPosts->num_rows) {
            while ($post = $getPosts->fetch_assoc())
                array_push($posts, $post);
            closeConnection($conn);
            return json_encode($posts, JSON_PRETTY_PRINT);
        }
        else
            return 0;
    }
    else
        return 0;
}


function sendPost() {
    if (isset($_GET['content']) && preg_match("/^.{1,256}$/u", $_GET['content'])) {
        $date = getPostDate();
        $content = $_GET['content'];
        $user = getUserIDName();
        $lastPostID = getLastPostID($user['id']);
        $conn = openConnection();
        $sql = "INSERT INTO posts (userID, author, postUserID, pub_date, content) VALUES";
        $data = " ('".$user['id']."', '".$user['name']."', '".(++$lastPostID)."', '".$date."', '".$content."')";
        if ($conn->query($sql.$data) === TRUE) {
            closeConnection($conn);
            return updatePostCounter($user['id']);
        }
        else
            return -2;
    }

    return 0;
}

function getLastPostID($userID) {
    $conn = openConnection();
    $sql = "SELECT postUserID from posts WHERE userID='".$userID."' ORDER BY postUserID DESC LIMIT 1";
    $id = $conn->query($sql)->fetch_assoc()['postUserID'];
    return $id;
}

function getUserIDName() {
    $conn = openConnection();
    $user = $conn->query("SELECT id,name from users WHERE access_token ='".$_GET['access_token']."'")->fetch_assoc();
    closeConnection($conn);
    return $user;
}

function getPostDate() {
    $date = getdate();
    $date = $date['year'].'-'.$date['mon'].'-'.$date['mday'].' '.$date['hours'].':'.$date['minutes'].':'.$date['seconds'];
    return $date;
}

function updatePostCounter($userID) {
    $conn = openConnection();
    $countPosts = $conn->query("SELECT ID from posts WHERE userID='".$userID."'")->num_rows;
    $sql = "UPDATE userinfo set posts ='".($countPosts)."' WHERE userID ='".$userID."'";
    if ($conn->query($sql) === TRUE) {
        closeConnection($conn);
        return 1;
    }
    else
        return -2;
}

function isAuth($access_token) {
    $conn = openConnection();
    $check = $conn->query("SELECT * from users WHERE access_token ='".$access_token."'");
    $status = $check->num_rows ? 1 : 0;
    closeConnection($conn);
    return $status;
}

?>

