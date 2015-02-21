var app = new Asteroid("localhost:3000");

init();

function init(){
    if (window.localStorage.getItem('isLogged') == "true") {
        $('#logged').css('display', 'block');
        $('#login').css('display', 'none');
    } else {
        $('#logged').css('display', 'none');
        $('#login').css('display', 'block');
    };

    $('.userName').html(window.localStorage.getItem('userName'));
}

$('.login-form').on('submit', function (e) {
    e.preventDefault();
    var login = $(e.target).find('.login').val(),
        pass = $(e.target).find('.password').val();
    window.localStorage.setItem('userName', login);

    app.loginWithPassword(login, pass);
});

app.on('login', function () {
    window.localStorage.setItem('isLogged', true);
    init();
});

app.on('logout', function () {
    window.localStorage.setItem('isLogged', false);
    init();
});

$('.changeUser').on('click', function () {
    app.logout();
})
