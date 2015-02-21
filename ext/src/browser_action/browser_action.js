$('.login-form').on('submit', function (e) {
    e.preventDefault();
var login = $(e.target).find('.login').val(),
    pass = $(e.target).find('.password').val();
    var app = new Asteroid("localhost:3000");
    app.loginWithPassword(login, pass);
    app.on('login', function () {
        $('#logged').css('display', 'block');
        $('#login').css('display', 'none');
    });
});