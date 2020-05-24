function isLoginSuccess() {
    if (localStorage.getItem('session') && localStorage.getItem('session').length > 1)
        loginSuccess();
    else
        loginError();
}

const handleLogin = () => {
    let email = $('#loginEmail');
    let password = $('#loginPassword');
    sendLogin('http://localhost/saxumcordis/coursework/backend/login/auth.php?',
        {email: email.val().trim(), password: password.val()});
    setTimeout(isLoginSuccess, 1000);
}

async function sendLogin(url, data) {
    url += "email=" + data.email + "&password=" + data.password;
    const response = await fetch(url);
    localStorage.setItem('session', JSON.stringify(await response.json()));
}


const loginSuccess = () => {
    if (!localStorage.getItem('session')) {
        setTimeout(hideLogin, 1200);
    }
    else {
        hideLogin();
    }
    localStorage.setItem('login', 'success');
    if (!localStorage.getItem('currentUser'))
        localStorage.setItem('currentUser', JSON.parse(localStorage.getItem('session')).id);
    makeBlogView();
}

const loginError = () => {
   if (localStorage.getItem('session') == 0) {
       errorMessage('user was not found', "#login_form");
       localStorage.removeItem('session');
   }
}

const hideLoginForm = () => {
    let loginSection = $('#login_form');
    loginSection.hide();
}

const showLoginForm = () => {
    let loginSection = $('#login_form');
    loginSection.show();
}

const hideLogin = () => {
    let loginSection = $('.login');
    loginSection.hide();
}

const isFilled = () => {
    return ($('#loginEmail').val().length > 0) && ($('#loginPassword').val().length > 0);
}

if ($('#login_form'))
    isLoginSuccess();