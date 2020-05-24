function getUserData(id) {
    let access_token = JSON.parse(localStorage.getItem('session')).access_token;
    let url = 'http://localhost/saxumcordis/coursework/backend/profile/user.php?getUser&id=' + id +
        '&access_token='+access_token;
    getUserDataRequest(url);
    setTimeout(renderMainUser, 500);
}

const getUserDataRequest = async (url) => {
    let response = await fetch(url);
    localStorage.setItem('mainUserData', JSON.stringify(await response.json()));
};


const renderHeader = (id) => {
    let header = document.createElement('div');
    header.setAttribute('class', 'header');
    $('.blog').append(header);
    getUserData(id);
    setTimeout(renderMenu, 500);
}

const renderMainUser = () => {
    let user = JSON.parse((localStorage.getItem('mainUserData')));
    renderMainAvatar(user.avatar);
    renderMainInfo(user);

};

const renderMainAvatar = (avatarSrc) => {
    let src = "../images/" + avatarSrc;
    let avatar = document.createElement('div');
    avatar.setAttribute('class', 'avatarHead');
    $(avatar).css("background", "url('" + src + "')");
    $(avatar).css("background-size", "120px 120px");
    $('.header').append(avatar);
};

const renderMainInfo = (user) => {
    profileButtons(user);
    $('.header').append('<div class="miniHeadInfo"><h3 style="margin-top: 1%">' + user.name + '</h3><p>posts: ' + user.posts + '</p>' +
        '<p>' + user.description + profileButtons(user) + '</div>');
};

const profileButtons = (user) => {
    if (user.userID == JSON.parse(localStorage.getItem('session')).id)
        return '</p><p></p><label for="newPost">' +
            '<img onclick="newPost()" class="header_icon" src="../images/plus.png" alt="New post"/>' +
            '</label><label for="profileSettings">' +
            '<img onclick="editProfile()" style="margin-left: 20px" class="header_icon" src="../images/edit.png" alt="Edit your profile"/></label></p>';
    else
        return "";
}

const renderMenu = () => {
    $('.header').append('<div class="menu_div"><h1>INCREDIBLE PARTY</h1><nav class="menu"">' +
        '<button class="nav_btn" onclick="renderUserList()">users</label>' +
        '<button class="nav_btn" onclick="goToUser(JSON.parse(localStorage.getItem(\'session\')).id)">profile</button>' +
        '<button class="nav_btn" onclick="logout()">logout</button></nav></div>');
}
