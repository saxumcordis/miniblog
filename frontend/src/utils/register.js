function passwordValidation(passwordInput) {
    let password = document.getElementById("passwordRegister");
    let issueArr = [];
    if (!/^.{7,15}$/.test(passwordInput))
        issueArr.push("Password must be between 7-15 characters.");
    if (!/\d/.test(passwordInput))
        issueArr.push("Must contain at least one number.");
    if (!/[a-z]/.test(passwordInput))
        issueArr.push("Must contain a lowercase letter.");
    if (!/[A-Z]/.test(passwordInput))
        issueArr.push("Must contain an uppercase letter.");
    if (!/(?=.*[@$!%*?&])/.test(passwordInput))
        issueArr.push("Must contain an special symbol [@$!%*?&]");
    if (issueArr.length > 0) {
        password.setCustomValidity(issueArr.join("\n"));
        password.style.borderColor = alertRedInput;
    } else {
        password.setCustomValidity("");
        password.style.borderColor = defaultInput;
    }
}

function nameValidation(nameInput) {
    let name = document.getElementById('nameRegister');
    let issueArr = [];
    if (/(\w(\s){2}|(\s){2})/.test(nameInput))
        name.value = name.value.slice(0, name.value.lastIndexOf(' '));
    if (!/^.{4,15}$/u.test(nameInput))
        issueArr.push("Name must be between 4-15 characters.");
    if (issueArr.length > 0) {
        name.setCustomValidity(issueArr.join("\n"));
        name.style.borderColor = alertRedInput;
    } else {
        name.setCustomValidity("");
        name.style.borderColor = defaultInput;
    }
}

function isRepeatedPass() {
    let repeated = document.getElementById('repeatPassword');
    let password = document.getElementById("passwordRegister");
    let issueArr = [];
    if (repeated.value != password.value)
        issueArr.push("Your password and confirmation password do not match");
    if (issueArr.length > 0) {
        repeated.setCustomValidity(issueArr.join("\n"));
        repeated.style.borderColor = alertRedInput;
    } else {
        repeated.setCustomValidity("");
        repeated.style.borderColor = defaultInput;
    }
}

function isFilledRegCorrect () {
    return (/^[a-zA-Z0-9_\.]+@[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+$/.test($('#emailRegister').val()) &&
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,15}/.test($('#passwordRegister').val()) &&
        ($('#repeatPassword').val() == $('#passwordRegister').val()) &&
        /^.{4,15}$/.test($('#nameRegistered')))
}

const startRegister = () => {
    let email = $('#emailRegister').val().trim();
    let password = $('#passwordRegister').val();
    let name = $('#nameRegister').val().trim();

    sendRegister('http://localhost/saxumcordis/coursework/backend/login/register.php?',
        {email: email, password: password, name: name});
    setTimeout(isRegisterSuccess, 1000);
}

async function sendRegister(url, data) {
    url += "email=" + data.email + "&password=" + data.password + "&name=" + data.name;
    const response = await fetch(url);
    localStorage.setItem('registerInfo', JSON.stringify(await response.json()));
}

const isRegisterSuccess = () => {
    let status = localStorage.getItem('registerInfo');
    if (status == "1")
        registerMessage(0, 'success');
    else if (status == "-1")
        registerMessage(1, 'error');
    else if (status == "0")
        registerMessage(2, 'warning');
    else if (status == "-2")
        registerMessage(3, 'warning');
    localStorage.removeItem('registerInfo');
}

const hideRegisterForm = () => {
    let loginSection = $('#register_form');
    loginSection.hide();
}

const showRegisterForm = () => {
    let loginSection = $('#register_form');
    loginSection.show();
}

const switchLoginForms = (toHide) => {
    if (toHide == 'register') {
        hideRegisterForm();
        showLoginForm();
    } else if (toHide == 'login') {
        hideLoginForm();
        showRegisterForm();
    } else if (toHide == 'restore') {
        hideRestoreForm();
        showLoginForm();
    } else if (toHide == 'login2') {
        hideLoginForm();
        showRestoreForm();
    }
}