const renderUsers = () => {
    getUsers();
    setTimeout(renderMiniUserList, 1000);
};

const getUsers = () => {
    let access_token = JSON.parse(localStorage.getItem('session')).access_token;
    let url = 'http://localhost/saxumcordis/coursework/backend/profile/users.php?get_users&access_token=' + access_token;
    getUsersRequest(url);
};

const getUsersRequest = async (url) => {
    let response = await fetch(url);
    localStorage.setItem('users', JSON.stringify(await response.json()));
};

const renderMiniUserList = () => {
    let mini_div = document.createElement('div');
    mini_div.setAttribute('class', 'miniUsers');
    $(mini_div).append($('<h1>last 5 users</h1>'));
    $('.center_div').append(mini_div);
    let users = JSON.parse(localStorage.getItem('users'));
    if (!users.length)
        logout();
    users = users.sort((a, b) => JSON.parse(b).userID - JSON.parse(a).userID).slice(0, 5);
    users.forEach(user => renderMiniUser(JSON.parse(user)));
};

const renderMiniUser = (userData) => {
    let user = document.createElement('div');
    user.setAttribute('class', 'miniUser');
    $(user).append('<div class="small_header" style="cursor: pointer; margin-left: 1%" onclick="goToUser(' + userData.userID + ')">' +
        '<img class="small_avatar" src="' + getUserAvatar(userData.avatar) + '"/>' +
        '<h2 class="small_name" style="margin-top: 3%">' + userData.name + '</h2></div>' +
        '<div class="small_header">' +
        '<div class="small_content"><img class="post_icon" src="../images/description.png" alt="bio"/><h2 class="small_content" style="margin: 1% 0 0 5%">' + userData.description + '</h2></div>' +
        '<div class="small_content"><img class="post_icon" src="../images/posts.png" alt="posts"/><h3 class="small_date" style="margin: 1% 0 0 5%">' + userData.posts + '</h3> </div></div>')
    $(".miniUsers").append(user);
};

const getUserAvatar = (avatarSrc) => {
    return "../images/" + avatarSrc;
}


const renderUserList = () => {
    let users = JSON.parse(localStorage.getItem('users'));
    $('.blog').append('<div class="popup-wrapper">' +
        '   <input type="checkbox" class="popup-checkbox" id="userList">' +
        '   <div class="popup">' +
        '       <div class="popup-content">' +
        '           <div class="userSearch"><form onsubmit="return false;">' +
        '                       <input type="text" id="userSearchValue" class="inputFields" oninput="return searchUser(this.value)" style="margin-top: 0; width: 90%; margin-left: 2%"' +
        '                           placeholder=""/>' +
        '                       <input type="submit" style="display: none"/>' +
        '               </form>' +
        '</div>' +
        '           <div style="position: fixed; width: auto; height: auto; margin-left: 21%"><label for="userList" class="popup-closer"  onclick="$(\'.popup-wrapper\').remove();">&#215;</label></div>' +
        '           ' +
        '       </div>' +
        '   </div>' +
        '</div>');
    $('#userList').attr('checked', true);
    users.forEach(user => renderSquareUser(JSON.parse(user)));
};

const renderSquareUser = user => {
    $('.popup-content').append('<div class="square_user">' +
        '   <img class="small_avatar" onclick="goToUser(' + user.userID + ')" style="margin-left: 0; cursor: pointer" src="' + getUserAvatar(user.avatar) + '"/>' +
        '   <h3 class="small_name" onclick="goToUser(' + user.userID + ')" style="margin-left: 0; margin-top: 0; cursor: pointer">' + user.name + '</h3>' +
        '</div>')
};

let removed = [];
const searchUser = searchValue => {
    if (searchValue.length > 0) {
        let users = $('.square_user');
        let search = new RegExp('' + searchValue.toLowerCase() + '', 'u');
        for (let i = 0; i < users.length; ++i) {
            if (!search.test(users[i].childNodes[3].textContent.toLowerCase()))
                removed.push($(users[i]).remove());
            else
                $('.popup-content').append(users[i]);
        }
        for (let i = 0; i < removed.length; ++i) {
            if (search.test(removed[i].children()[1].textContent.toLowerCase()))
                removed[i].appendTo('.popup-content');
        }
    }
    else {
        for (let i = 0; i < removed.length; ++i)
            removed[i].appendTo('.popup-content');
        removed = [];
    }
};
