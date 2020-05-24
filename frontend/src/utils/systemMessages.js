let alertRedInput = "#8C1010";
let defaultInput = "rgba(10, 180, 180, 1)";

const createMessage = (message, type, where, duration) => {
    let msg = document.createElement('h3');
    msg.setAttribute('class', type);
    msg.textContent = message;
    $(where).append(msg);
    $("h3[class$='-msg']").hide();
    animateMsg();
};

const   successMessage = (message, where, duration) => {
    createMessage(message, 'success-msg', where, duration);
};

const   errorMessage = (message, where, duration) => {
    createMessage(message, 'error-msg', where, duration);
};

const   warningMessage = (message, where, duration) => {
    createMessage('warning', 'error-msg', where, duration);
};

const   infoMessage = (message, where, duration) => {
    createMessage('', 'info-msg', where, duration);
};

const animateMsg = (duration = 1400) => {
    $("h3[class$='-msg']").fadeIn(duration / 1000).fadeOut(duration - (duration / 1000), function() {  $( this ).remove();});
};

const registerMessage = (messageNum, type) => {
    const messages = ["<h3 class='message_text' style='width: 500px'>You have been registered successfully. <br/> " +
    "Now you can login. <br/> <a href='.'>Refresh the page</a> <br/>" +
    " and you can start using our blog after signing in. </h3>", "<h3 class='message_text' style='width: 500px'>Your input is not correct. <br/> " +
    "<br/> <a href='.'>Refresh the page</a> <br/>" +
    " and try again </h3>", "<h3 class='message_text' style='width: 500px'>Email is busy. <br/> " +
    "<br/> <a href='.'>Refresh the page</a> <br/>" +
    " and try again with another one </h3>", "<h3 class='message_text' style='width: 500px'>Server error. <br/> " +
    "<br/> <a href='.'>Refresh the page</a> <br/>" +
    " and try again</h3>"];

    showLoginMessage(messages, messageNum, type);
};

const restoreMessage = (messageNum, type) => {
    const messages = ["<h3 class='message_text'> Your password has been changed successfully. <br/>" +
    "Now you can login. <br/><a href='.'>Refresh the page</a> <br/>" +
    "and you can start our using blog after signing in.", "<h3 class='message_text' style='width:500px'>New password does not match the requirements. <br/>" +
    "<br/><a href='.'>Refresh the page</a> <br/>" +
    "and try again", "<h3 class='message_text' style='width:500px'>User does not exist. <br/>" +
    "<br/><a href='.'>Refresh the page</a> <br/>" +
    "and try again", "<h3 class='message_text' style='width:500px'>Server error. <br/>" +
    "<br/><a href='.'>Refresh the page</a> <br/>" +
    "and try again"];

    showLoginMessage(messages, messageNum, type);
};

const showLoginMessage = (messages, messageNum, type) => {
    let div = document.createElement('div');
    div.setAttribute('class', 'login');
    let messageBox = document.createElement('p');
    messageBox.setAttribute('class', type + '-msg');
    messageBox.setAttribute('style', "margin: auto");
    messageBox.innerHTML = messages[messageNum];
    div.append(messageBox);

    $('.login').replaceWith(div);
};