<?php
include 'user.php';
if (isset($_GET['access_token']) && isAuth($_GET['access_token'])) {
    if (isset($_GET['change_avatar']))
        changeAvatar();
    else if (isset($_GET['change_name']))
        changeName();
    else if (isset($_GET['change_bio']))
        changeBio();
}



function changeAvatar() {
    $uploads_dir = '../../images';
    $id = getIdByToken($_GET['access_token']);
    $newName = $id.".png";
    foreach ($_FILES["newAvatar"]["error"] as $key => $error) {
        if ($error == UPLOAD_ERR_OK) {
            $tmp_name = $_FILES["newAvatar"]["tmp_name"][$key];
            move_uploaded_file($tmp_name, "$uploads_dir/$newName");
        }
    }
    $conn = openConnection();
    $sql = "UPDATE userinfo SET avatar='".$newName."' WHERE userID='".$id."'";
    $conn->query($sql);
    closeConnection($conn);
    updateProfile($_GET['access_token']);
}

function changeName() {
    if (isset($_POST['newName']) && preg_match('/^.{4,15}$/u', $_POST['newName'])) {
        $id = getIdByToken($_GET['access_token']);
        $conn = openConnection();
        $sql = "UPDATE users SET name='".$_POST['newName']."' WHERE access_token='".$_GET['access_token']."'";
        $updateAuthor = "UPDATE posts SET author='".$_POST['newName']."' WHERE userID ='".$id."'";
        $conn->query($sql);
        $conn->query($updateAuthor);
        closeConnection($conn);
        updateProfile($_GET['access_token']);
    }
}

function changeBio() {
    if (isset($_POST['newBio']) && preg_match('/^.{4,21}$/u', $_POST['newBio'])) {
        $conn = openConnection();
        $id = getIdByToken($_GET['access_token']);
        $sql = "UPDATE userinfo SET description='".$_POST['newBio']."' WHERE userID='".$id."'";
        $conn->query($sql);
        closeConnection($conn);
        updateProfile($_GET['access_token']);
    }

}

function getIdByToken($access_token) {
    $conn = openConnection();
    $sql = "SELECT id from users WHERE access_token ='".$access_token."'";
    $id = $conn->query($sql)->fetch_assoc()['id'];
    closeConnection($conn);
    return $id;
}

function updateProfile($access_token) {
    $conn = openConnection();
    $sql = "UPDATE users SET updated_at='".updateDate()."' WHERE access_token='".$access_token."'";
    $conn->query($sql);
    closeConnection($conn);
}

function updateDate() {
    $date = getdate();
    $date = $date['year'].'-'.$date['mon'].'-'.$date['mday'].' '.$date['hours'].':'.$date['minutes'].':'.$date['seconds'];
    return $date;
}

?>