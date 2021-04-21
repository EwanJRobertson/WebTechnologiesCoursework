// Player defines all player behaviours
var Player = {

    // primary player attribute
    attribute: null,
    // list of items the player is carrying
    inventory: [],
    // holds interval for player animation
    animation: null,

    // creates input for player name
    inputUsername: function () {
        new Create.InputGroup({
            id: "username",
            name: "Username",
            text: "Enter",
            click: Player.submitUsername,
        }).prependTo("#actions").find("input#tb-username").focus();
    },

    // handles input validation for player name and sets local storage item name
    submitUsername: function () {
        Cave.playsound("typing");
        if ($("input#tb-username").val().length != 0) {
            var user = $("input#tb-username").val();
            $("div#ig-username").children().removeClass("input-error");
            Cave.addmessage("'Welcome " + user + "'");
            localStorage.setItem("name", user);
            $("div#ig-username").remove();
            setTimeout(function () { Player.getAttribute() }, 3000);
        } else {
            $("div#ig-username").children().addClass("input-error");
        }
    },

    // creates input for player attribute
    getAttribute: function () {
        Cave.addmessage("'Please enter your password:'");
        new Create.Choice({
            id: "attributeChoice",
            count: "3",
            choices: [{ text: "(PER) Look around...", click: function () { Cave.playsound("typing"); Player.setAttribute({ choice: "per", msg: "You notice the password written on the ceiling" }) } },
            { text: "(STR) Disable terminal...", click: function () { Player.setAttribute({ choice: "str", msg: "You pull the harddrive out" }) } },
            { text: "(LUC) Guess password...", click: function () { Cave.playsound("typing"); Player.setAttribute({ choice: "luc", msg: "You guess the password" }) } }],
        }).prependTo("#actions");
    },

    // sets player attribute to player choice
    setAttribute: function (options) {
        Player.attribute = options.choice;
        localStorage.setItem("attribute", Player.attribute);
        $("#attributeChoice").remove();
        Cave.addmessage(options.msg + " and have successfully obtained the data.");
        Cave.roomExit(function () { Cave.roomTwoInit() });
    },

    // handles player animation
    move: function () {
        $("img#player").addClass("moved");
        Player.animation = setInterval(function () {
            if ($("img#player").attr("src") == "./assets/images/playerwalkright.png") {
                $("img#player").attr("src", "./assets/images/playerwalkleft.png");
            } else {
                $("img#player").attr("src", "./assets/images/playerwalkright.png");
            }
        }, 250);
        setTimeout(function () {
            clearInterval(Player.animation);
            $("img#player").attr("src", "./assets/images/playerstand.png");
        }, 3000);
    },
}