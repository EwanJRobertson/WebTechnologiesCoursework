// Cave contains the main game controls
var Cave = {

    // room exit arrow animation interval
    arrow: null,
    // timer countdown interval
    countdown: null,

    // adds a paragraph to the messages area
    addMessage: function (text) {
        $("<p>").html(text).addClass("typewriter").prependTo("div#msgs");
        setTimeout(function () { $("div#msgs").find(">:first-child").removeClass("typewriter") }, 2900);
    },

    // plays audio element with name in src
    playSound: function (src) {
        $("audio#" + src)[0].play();
    },

    // loads gamesettings into the page
    loadSettings: function () {
        if (sessionStorage.getItem("audio") == "off") {
            Cave.mute();
        }
    },

    // toggles whether audio is muted
    mute: function () {
        $("audio").prop("muted", !$("audio").prop("muted"));
        if ($("a#audiomute svg use").attr("xlink:href") == "#volume-off") {
            $("a#audiomute svg use").attr("xlink:href", "#volume-on");
            sessionStorage.setItem("audio", "on");
        } else {
            $("a#audiomute svg use").attr("xlink:href", "#volume-off");
            sessionStorage.setItem("audio", "off");
        }
    },

    // initialises main game
    init: function () {
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("result");
        sessionStorage.removeItem("attribute");
        sessionStorage.removeItem("ratone");
        sessionStorage.removeItem("rattwo");
        $("#terminal").on("click", Cave.start);
        Cave.addMessage("The room is pitch-black, you see a terminal through the darkness.");
        $("img#arrow").hover(Cave.arrowHover, function () {
            Cave.arrow = setInterval(Cave.arrowFlicker, 500);
        });
        Cave.arrow = setInterval(Cave.arrowFlicker, 500);
    },

    // action on starting terminal in room one
    start: function () {
        $("img#terminal").off("click").removeClass("img").removeClass("clickable");
        $("img#player").toggle();
        $("div#gameArea").addClass("cave-background");
        Cave.addMessage("You turn on the terminal...");
        Terminal.startTerminal();
        Player.inputUsername();
    },

    // flickers outline on images with onclick
    highlight: function () {
        if ($("#gameArea").children().hasClass("highlight")) {
            $("#gameArea").children().removeClass("highlight");
        } else {
            $("#gameArea").find(".clickable").addClass("highlight");
            setTimeout(Cave.highlight, 500);
        }
    },

    // toggles room exit arrow display
    roomExit: function (option) {
        $("img#arrow").off("click").on("click", function () { Cave.newRoom(option) }).toggle();
    },

    // plays room exit animations and sounds, initialises new room
    newRoom: function (option) {
        Player.move();
        $("img#arrow").toggle();
        Cave.playSound("steps");
        Cave.addMessage("You continue through the cave...");
        setTimeout(function () {
            $("div#gameArea").children().hide();
            $("img#magnify").toggle();
            $("img#player").removeClass("moved").toggle();
            console.log(option);
            option.call();
        }, 3000);
    },

    // initialises room two
    roomTwoInit: function () {
        Rat.init("small");
        Cave.addMessage("There is a small rat blocking the way forward.");
        Cave.timer();
    },

    // initialises room three
    roomThreeInit: function () {
        Cave.addMessage("The room is empty...");
        $("img#rock").on("click", function () { Rock.check() }).toggle();
        if (Player.attribute != "str") {
            $("img#rock").addClass("img");
            if (Player.attribute == "per") {
                $("img#rock").addClass("clickable");
            }
        }
        Cave.roomExit(function () { Cave.roomFourInit() })
    },

    // initialises room four
    roomFourInit: function () {
        Rat.init("big");
        Cave.addMessage("There is a rat blocking the way, it's much bigger than the last one.");
    },

    // switches classes on room exit arrow to change size
    arrowFlicker: function () {
        if ($("img#arrow").hasClass("small")) {
            $("img#arrow").removeClass("small").addClass("big");
        } else {
            $("img#arrow").removeClass("big").addClass("small");
        }
    },

    // changes class on room exit arrow, stops animation
    arrowHover: function () {
        clearInterval(Cave.arrow);
        $("img#arrow").removeClass("small").addClass("big");
    },

    // ends game on loss condition
    gameLoss: function () {
        Cave.playSound("scream");
        sessionStorage.setItem("result", "loss");
        new Create.Link({
            address: "./gameend.html",
        }).prependTo("#actions");
    },

    // ends game on win condition
    gameWin: function () {
        sessionStorage.setItem("result", "win");
        new Create.Link({
            address: "./gameend.html",
        }).prependTo("#actions");
    },

    // creates timer for room two
    timer: function () {
        $("<span>").attr("id", "timer").addClass("h3").appendTo("div#gameArea");

        var count = 16;
        Cave.countdown = setInterval(function () {
            count = count - 1;
            if (Player.attribute == "per") {
                $("span#timer").html(count + "s");
            }
            if (count == 0) {
                clearInterval(Cave.countdown);
                Rat.runAway();
                $("div#actions").children().not("#msgs").remove();
                Cave.addMessage("The rat gets bored and runs away.");
            }
        }, 1000);
    },

    // stops timer
    stopTimer: function () {
        clearInterval(Cave.countdown);
    },
};