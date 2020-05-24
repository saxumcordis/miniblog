const editProfile = () => {
    $('.blog').append('<div class="popup-wrapper">' +
        '<input type="checkbox" class="popup-checkbox" id="profileSettings"/>' +
        '   <div class="popup">' +
        '       <div class="popup-content" style="height: 80%">' +
        '           <label for="profileSettings" class="popup-closer" onclick="$(\'.popup-wrapper\').remove();">&#215;</label>' +
        '           <div><h3>Profile settings</h3>' +
        '           <form id="changeAvatar" onsubmit="return false;">' +
        '               <div class="edit_div"><img class="edit_avatar" src="' + getPostAvatar() + '"/> ' +
        '                   <div class="form" style="margin-left: 20px;"><h3 style="margin-left: 10px; font-size: 16px">It is better to have new avatar in square form. ' +
        '                       New avatar must be in png format.<br/>New name should be between 4-15 characters. New bio should be between 4-21 characters.</h3> </div></div>' +
        '               <input type="file" style="display: none" id="newAvatar" name="newAvatar[]"' +
        '                           oninput="return avatarValidation(this.files.item(0))">' +
        '               <label for="newAvatar">\n' +
        '                   <i></i>\n' +
        '                   <span class="inputFields" style="width: 125px">upload new file</span>\n' +
        '               </label>' +
        '               <input type="submit" value="change avatar" class="nav_btn" style="width: 150px; border-color: #8C1010" disabled="true" id="newAvatar-btn"/>' +
        '           </form>' +
        '           <form id="changeName" onsubmit="return false;">' +
        '               <input type="text" id="newName" name="newName" class="inputFields" style="width: 125px" placeholder="' + JSON.parse(localStorage.getItem('mainUserData')).name + '"' +
        '                           oninput="return newNameValidation(this.value)"/>' +
        '               <input type="submit" value="change name" class="nav_btn" style="width: 150px; border-color: #8C1010" disabled="true" id="newName-btn"/>' +
        '           </form>' +
        '           <form id="changeBio" onsubmit="return false;">' +
        '               <input type="text" id="newBio" name="newBio" class="inputFields" style="width: 125px" placeholder="' + JSON.parse(localStorage.getItem('mainUserData')).description + '"' +
        '               oninput="return newBioValidation(this.value)"/>' +
        '               <input type="submit" value="change bio" class="nav_btn" style="width: 150px; border-color: #8C1010" disabled="true" id="newBio-btn"/>' +
        '           </form>' +
        '       </div>' +
        '   </div>' +
        '   </div>' +
        '</div>');
    $("#changeAvatar").submit(function(event){
        event.preventDefault();
        let formData = new FormData($(this)[0]);
        let access_token = JSON.parse(localStorage.getItem('session')).access_token;
        $.ajax({
            url: 'http://localhost/saxumcordis/coursework/backend/profile/settings.php?change_avatar&access_token=' + access_token,
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
        });
        setTimeout(refreshPage, 200);
        return false;
    });
    $("#changeName").submit(function(event){
        event.preventDefault();
        let formData = new FormData($(this)[0]);
        let access_token = JSON.parse(localStorage.getItem('session')).access_token;
        $.ajax({
            url: 'http://localhost/saxumcordis/coursework/backend/profile/settings.php?change_name&access_token=' + access_token,
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
        });
        setTimeout(refreshPage, 200);
        return false;
    });
    $("#changeBio").submit(function(event){
        event.preventDefault();
        let formData = new FormData($(this)[0]);
        let access_token = JSON.parse(localStorage.getItem('session')).access_token;
        $.ajax({
            url: 'http://localhost/saxumcordis/coursework/backend/profile/settings.php?change_bio&access_token=' + access_token,
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
        });
        setTimeout(refreshPage, 200);
        return false;
    });
};


const avatarValidation = (avatar) => {
    let avatar_btn = document.getElementById('newAvatar-btn');
    let issueArr = [];
    if (avatar.type != "image/png")
        issueArr.push("The picture should be in '.png' format");
    handleIssue(issueArr, avatar_btn);
};

const newNameValidation = (newNameInput) => {
    let newName_btn = document.getElementById('newName-btn');
    let newName = document.getElementById('newName');
    let issueArr = [];
    if (/(\w(\s){2}|(\s){2})/.test(newNameInput))
        newName.value = newNameInput.slice(0, newNameInput.lastIndexOf(' '));
    if (!/^.{4,15}$/u.test(newNameInput))
        issueArr.push("Name must be between 4-15 characters.");
    handleIssue(issueArr, newName_btn);
};

const newBioValidation = (newBioInput) => {
    let newBio_btn = document.getElementById('newBio-btn');
    let newBio = document.getElementById('newBio');
    let issueArr = [];
    if (/(\w(\s){2}|(\s){2})/.test(newBioInput))
        newBio.value = newBioInput.slice(0, newBioInput.lastIndexOf(' '));
    if (!/^.{4,21}$/.test(newBioInput))
        issueArr.push("Name must be between 4-15 characters.");
    handleIssue(issueArr, newBio_btn);
};

const handleIssue = (issueArr, place) => {
    if (issueArr.length > 0) {
        place.setCustomValidity(issueArr.join('\n'));
        place.style.borderColor = alertRedInput;
        $(place).attr("disabled", true);
    }
    else {
        place.setCustomValidity("");
        place.style.borderColor = defaultInput;
        $(place).removeAttr('disabled');
    }
};