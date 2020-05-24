const hideRestoreForm = () => {
    let loginSection = $('#restore_form');
    loginSection.hide();
}

const showRestoreForm = () => {
    let loginSection = $('#restore_form');
    loginSection.show();
}


const restoreUser = () => {
    let email = $('#emailRestore').val().trim();
    let name = $('#nameRestore').val().trim();
    let password = $('#passwordRestore').val();

    sendRestore('http://localhost/saxumcordis/coursework/backend/login/restore.php?',
        {email: email, password: password, name: name});
    setTimeout(isRestoreSuccess, 1000);
}

async function sendRestore(url, data) {
    url += "email=" + data.email + "&restore_pass=" + data.password + "&name=" + data.name;
    const response = await fetch(url);
    localStorage.setItem('restoreInfo', JSON.stringify(await response.json()));
}

const isRestoreSuccess = () => {
    let status = localStorage.getItem('restoreInfo');
    if (status == "1")
        restoreMessage(0, 'success');
    else if (status == "-1")
        restoreMessage(1, 'error');
    else if (status == "0")
        restoreMessage(2, 'warning');
    else if (status == "-2")
        restoreMessage(3, 'warning');
    localStorage.removeItem('restoreInfo');
}

const isFilledResCorrect = () => {
    return (/^[a-zA-Z0-9_\.]+@[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+$/.test($('#emailRestore').val()) &&
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,15}/.test($('#passwordRestore').val()) &&
        $('#nameRestore').val().length > 0);
}