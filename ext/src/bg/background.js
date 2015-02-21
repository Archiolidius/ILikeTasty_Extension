// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        chrome.pageAction.show(sender.tab.id);
        sendResponse();
    });


var application = {
    init: function () {
        application.secondCount = 4;
        application.app = new Asteroid("localhost:3000");
        application.startTimer(application.secondCount);
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
                body: "Ей! Очередной шаг приготовления вашего блюда подошел к концу. Поспешите на кухню и продолжайте готовить!",
            });
            audioNotification();

            function audioNotification() {
                var yourSound = new Audio('../../resourses/sounds-924-long-chime-sound.mp3');
                yourSound.play();
            }
        }
    }
}
application.init();
