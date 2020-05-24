const renderFeed = (id) => {
    let feed = document.createElement('div');
    $(feed).append($('<h1>feed</h1>'));
    feed.setAttribute('class', 'feed');
    $('.center_div').append(feed);
    getPosts(id);
    setTimeout(renderPosts, 500);
};

const getPosts = (id) => {
    let access_token = JSON.parse(localStorage.getItem('session')).access_token;
    let url = 'http://localhost/saxumcordis/coursework/backend/profile/feed.php?get_posts&id=' + id +
        '&access_token='+access_token;
    getPostsRequest(url);
};

const getPostsRequest = async (url) => {
    let response = await fetch(url);
    localStorage.setItem('posts', JSON.stringify(await response.json()));
};

const renderPosts = () => {
    const posts = JSON.parse(localStorage.getItem('posts'));
    if (posts != "0")
        posts.reverse().forEach(postData => renderPost(postData));
};

const renderPost = (postData) => {
    let post_div = document.createElement('div');
    post_div.setAttribute('class', 'post');
    $(post_div).append('<div class="small_header"><img class="small_avatar" src="' + getPostAvatar() + '"/>' +
        '<h2 class="small_name">' + postData.author + '</h2>' +
        '<h3 class="small_date">' + getPostDate(postData.pub_date) + '</h3></div>' +
        '<div class="small_header"><h2 class="small_content" style="margin-top: -6px">' + postData.content + '</h2></div>');
    $('.feed').append(post_div);
};

const getPostAvatar = () => {
    let user = JSON.parse((localStorage.getItem('mainUserData')));
    let avatar = "../images/" + user.avatar;
    return avatar;
};

const getPostDate = (dateData) => {
    const months = {0: "Jan",
        1: "Feb", 2: "Mar", 3: "Apr", 4: "May", 5: "Jun", 6: "Jul", 7: "Aug",
        8: "Sep", 9: "Oct", 10: "Nov", 11: "Dec",};
    let date = new Date(dateData);
    return date.getDate() + ' ' + months[date.getMonth()];
};

const newPost = () => {
    $('.blog').append('<div class="popup-wrapper">\n' +
        '        <input type="checkbox" class="popup-checkbox" id="newPost">\n' +
        '        <div class="popup">\n' +
        '            <div class="popup-content">\n' +
        '                <label for="newPost" class="popup-closer" onclick="$(\'.popup-wrapper\').remove();">&#215;</label>\n' +
        '                <h3>Max post length is 256 characters</h3>\n' +
        '                <form id="newPostForm" onsubmit="return false;">\n' +
        '                    <textarea id="newPostContent" class="inputFields" style="width: 96%; resize:none; border-color:#8C1010" cols="128" rows="5"\n' +
        '                    required placeholder="Type your post here"\n' +
        '                    oninput="return validateNewPost(this.value)"></textarea>\n' +
        '                    <button class="nav_btn" style="margin-left: 2%; margin-top: 5%; height: 40px" onclick="isNewPostFilled() ? createPost() : false;">post</button>\n' +
        '                </form>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>');
};

const createPost = () => {
    let postContent = $('#newPostContent').val();
    let access_token = JSON.parse(localStorage.getItem('session')).access_token;

    sendPost('http://localhost/saxumcordis/coursework/backend/profile/feed.php?send_post&', {
        content: postContent, access_token: access_token,
    });
    setTimeout(refreshPage, 1000);
    $('.popup-wrapper').remove();
};

async function sendPost(url, data) {
    url += "content=" + data.content + "&access_token=" + data.access_token;
    await fetch(url);
}


const validateNewPost = () => {
    let newPostContent = document.getElementById('newPostContent');
    let issueArr = [];
    if (/(\w(\s){2}|(\s){2})/.test(newPostContent.value)) {
        newPostContent.value = newPostContent.value.slice(0, newPostContent.value.lastIndexOf(' '));
    }
    if (!(newPostContent.value.length < 257))
        issueArr.push("Max post length is 256 characters.");
    else if (!(newPostContent.value.length > 0))
        issueArr.push("Post cannot be empty.");
    if (issueArr.length > 0) {
        newPostContent.setCustomValidity(issueArr.join("\n"));
        newPostContent.style.borderColor = alertRedInput;
    }
    else {
        newPostContent.setCustomValidity("");
        newPostContent.style.borderColor = defaultInput;
    }
};

const isNewPostFilled = () => {
    return /^.{1,256}$/.test($('#newPostContent').val());
};