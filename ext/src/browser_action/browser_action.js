var app = new Asteroid("iliketasty.meteor.com");

var application = {
    init: function () {
        application.secondCount = 4;
//        application.app = new Asteroid("localhost:3000");

        app.subscribe('Timers')
        var timer = app.getCollection("timers");

        setTimeout(function() {
            var timer = app.getCollection("timers");
            var laundryTimerRQ = timer.reactiveQuery({});

            // Log the array of results
            console.log(laundryTimerRQ.result);
            // Listen for changes
            laundryTimerRQ.on("change", function () {
                console.log(laundryTimerRQ.result);
                var timerTime = laundryTimerRQ.result[laundryTimerRQ.result.length - 1].timerTime;
                application.startTimer(timerTime);

            });
        }, 1000);

//        application.startTimer(application.secondCount);
    },
    startTimer: function (secondCount) {
        var interval = window.setInterval(function () {
            secondCount--;
            chrome.browserAction.setBadgeText({text: '' + secondCount})
            if (secondCount === 0) {
                application.endTimer();
                window.clearInterval(interval);
            }
        }, 1000);
    },
    endTimer: function () {
        if (Notification) {
            var notification = new Notification('Поспешите на кухню!', {
                icon: 'http://yellowicons.com/wp-content/uploads/Food-Icon-1.png',
                body: "Эй! Очередной шаг приготовления вашего блюда подошел к концу. Поспешите на кухню и продолжайте готовить!",
            });
            audioNotification();

            function audioNotification() {
                var yourSound = new Audio('../../resourses/sounds-924-long-chime-sound.mp3');
                yourSound.play();
            }
        }
    }
}
//application.init();


//var app = new Asteroid("localhost:3000");

init();

function init() {
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
    application.init();
});

app.on('logout', function () {
    window.localStorage.setItem('isLogged', false);
    init();
});

$('.changeUser').on('click', function () {
    app.logout();
})
