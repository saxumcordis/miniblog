const makeBlogView = (id = localStorage.getItem('currentUser')) => {
    $('.login').remove();
    renderHeader(id);
    createMainDiv();
    renderFeed(id);
    renderUsers();
};

const createMainDiv = () => {
    let div = document.createElement('div');
    div.setAttribute('class', 'center_div');
    $('.blog').append(div);
};

const goToUser = (id) => {
    localStorage.setItem('currentUser', id);
    $('.header').remove();
    $('.feed').remove();
    $('.center_div').remove();
    $('.miniUsers').remove();
    renderHeader(id);
    createMainDiv();
    renderFeed(id);
    renderUsers();
}


const logout = () => {
    localStorage.clear();
    location.reload();
}

const refreshPage = () => {
    location.reload();
}
