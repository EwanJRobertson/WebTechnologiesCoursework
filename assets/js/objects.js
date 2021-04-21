// Rat defines all rat behaviours
var Rat = {

    // initialies rat
    init: function (option) {
        $("img#rat").removeClass("small").removeClass("big").off("click");
        $("img#rat").addClass(option + " img clickable").on("click", function () { Rat.choices(option); }).toggle();
    },

    // gets player choice possibilities and prepends them to action area at the top of the messages
    choices: function (option) {
        $("img#rat").off().removeClass("clickable").removeClass("img");
        var choices = [];

        if (option == "small") {
            choices = Rat.ratSmallChoices();
        } else if (option == "big") {
            choices = Rat.ratBigChoices();
        }

        new Create.Choice({
            id: "ratChoice",
            choices: choices,
        }).prependTo("#actions");
    },

    // creates possible player choices for small rat in room two
    ratSmallChoices: function () {
        var choices = [];

        if (Player.attribute == "str") {
            choices.push({
                text: "Attack the rat", click: function () {
                    Cave.addmessage("You defeat the rat using your strength.");
                    $("img#rat").toggle();
                    Cave.stoptimer();
                    $("div#ratChoice").remove();
                    Cave.playsound("rat");
                    localStorage.setItem("ratone", "attack");
                    $("img#bat").on("click", function () { Bat.pickupBat() }).toggle();
                    Cave.roomExit(function () { Cave.roomThreeInit() });
                }
            });
        } else {
            choices.push({
                text: "Attack the rat", click: function () {
                    Cave.addmessage("You are no match for even this small rat...");
                    Cave.stoptimer();
                    $("div#ratChoice").remove();
                    localStorage.setItem("ratone", "attack");
                    setTimeout(function () { Cave.gameloss() }, 3000);
                }
            });
        }
        if (Player.attribute == "luc") {
            choices.push({
                text: "(LUC) Scare the rat", click: function () {
                    $("img#rat").toggle();
                    Cave.stoptimer();
                    $("div#ratChoice").remove();
                    Cave.addmessage("You raise your arms and roar towards the rat...");
                    setTimeout(function () { Cave.addmessage("luckily it sees the large shadow you case against the cave wall and gets spooked.") }, 2000);
                    Cave.playsound("rat");
                    localStorage.setItem("ratone", "scare");
                    $("img#bat").on("click", function () { Bat.pickupBat() }).toggle();
                    Cave.roomExit(function () { Cave.roomThreeInit() });
                }
            });
        }

        return choices;
    },

    // creates possible player choices for big rat in room four
    ratBigChoices: function () {
        var choices = [];

        if (Player.attribute == "str") {
            choices.push({
                text: "(STR) Throw a rock at the rat.", click: function () {
                    Cave.addmessage("The rat appears injured.");
                    Cave.playsound("stone");
                    $("input#ratChoice0").off("click").on("click", function () {
                        Cave.addmessage("There are no more loose rocks.");
                    });
                    if (Player.inventory.includes("bat")) {
                        $("input#ratChoice1").off("click").on("click", function () {
                            $("div#ratChoice").remove();
                            Cave.playsound("rat");
                            Cave.playsound("bat");
                            localStorage.setItem("rattwo", "strrockbat");
                            Cave.addmessage("The rat scarpers away to lick its wounds, allowing you to pass.");
                            setTimeout(function () { Cave.gamewin() }, 3000);
                        });
                    }
                }
            });
        }

        if (Player.attribute == "str" && Player.inventory.includes("bat")) {
            choices.push({
                text: "(STR) Attack the rat using the bat you found.", click: function () {
                    Cave.playsound("rat");
                    Cave.playsound("bat");
                    localStorage.setItem("rattwo", "strbat");
                    $("div#ratChoice").remove();
                    Cave.addmessage("The rat is too nimble and you are quickly beaten.");
                    setTimeout(function () { Cave.gameloss() }, 3000);
                }
            });
        }

        if (Player.attribute == "luc") {
            choices.push({
                text: "(LUC) Wave a large stick at the rat.", click: function () {
                    $("div#ratChoice").remove();
                    Cave.playsound("rat");
                    localStorage.setItem("rattwo", "lucstick");
                    Cave.addmessage("The rat appears disoriented by the substance on the end of the stick.")
                    setTimeout(function () { Cave.addmessage("It watches from a distance as it lets you pass.") }, 2000);
                    setTimeout(function () { Cave.gamewin() }, 3000);
                }
            });
        }

        if (Player.attribute == "luc" && Player.inventory.includes("pistol")) {
            choices.push({
                text: "(LUC) Fire the pistol you found.", click: function () {
                    $("div#ratChoice").remove();
                    Cave.playsound("shot");
                    localStorage.setItem("rattwo", "lucpistol");
                    setTimeout(function () { Cave.playsound("rat") }, 750);
                    Cave.addmessage("You shoot but miss. The bullet ricochets of the roof cause a large spark to fall into an oil pool.")
                    setTimeout(function () { Cave.addmessage("The rat jumps into a puddle to cool off, allowing you to pass.") }, 2000);
                    setTimeout(function () { Cave.gamewin() }, 3000);
                }
            });
        }

        if (Player.attribute == "luc" && Player.inventory.includes("bat")) {
            choices.push({
                text: "(LUC) Attack the rat using the bat you found.", click: function () {
                    $("div#ratChoice").remove();
                    localStorage.setItem("rattwo", "lucbat");
                    Cave.addmessage("The rat is too nimble and you are quickly beaten.");
                    setTimeout(function () { Cave.gameloss() }, 3000);
                }
            });
        }

        if (Player.attribute == "per" && Player.inventory.includes("pistol")) {
            choices.push({
                text: "(PER) Fire the pistol you found.", click: function () {
                    $("div#ratChoice").remove();
                    Cave.playsound("shot");
                    localStorage.setItem("rattwo", "perpistol");
                    setTimeout(function () { Cave.playsound("rat") }, 750);
                    Cave.addmessage("You take aim and pull the trigger... bullseye.");
                    setTimeout(function () { Cave.gamewin() }, 3000);
                }
            });
        }

        if (Player.attribute == "per") {
            choices.push({
                text: "(PER) Attempt to distract the rat with a loud noise.", click: function () {
                    Cave.playsound("stone");
                    localStorage.setItem("rattwo", "pernoise");
                    $("div#ratChoice").remove();
                    Cave.addmessage("The rat quickly traces the source of the noise back to you.");
                    setTimeout(function () { Cave.gameloss() }, 3000);
                }
            });
        }

        if (Player.attribute == "per") {
            choices.push({
                text: "Attempt to sneak past the rat.", click: function () {
                    localStorage.setItem("rattwo", "sneak");
                    $("div#ratChoice").remove();
                    Cave.addmessage("The successfully sneak past the rat.");
                    setTimeout(function () { Cave.gamewin() }, 3000);
                }
            });
        } else {
            choices.push({
                text: "Attempt to sneak past the rat.", click: function () {
                    localStorage.setItem("rattwo", "sneak");
                    $("div#ratChoice").remove();
                    Cave.addmessage("The rat smells you out quickly.");
                    setTimeout(function () { Cave.gameloss() }, 3000);
                }
            });
        }

        return choices;
    },

    // handles rat behaviour when timer runs out
    runaway: function () {
        $("img#rat").off("click").toggle();
        Bat.condition = "bad";
        localStorage.setItem("ratone", "wait")
        $("img#bat").on("click", function () { Bat.pickupBat() }).toggle();
        Cave.roomExit(function () { Cave.roomThreeInit() })
    },
}

// Terminal defines terminal behaviours
var Terminal = {

    // holds interval for terminal flickering
    terminalAnimation: null,

    // creates interval for terminal flickering
    startTerminal: function () {
        Terminal.terminalAnimation = setInterval(Terminal.terminalFlicker, 1000);
        $("img#terminal").off("click");
    },

    // changes terminal image source to make image appear animated
    terminalFlicker: function () {
        if ($("img#terminal").attr("src") == "./assets/images/terminal-on.png") {
            $("img#terminal").attr("src", "./assets/images/terminal-off.png");
        } else {
            $("img#terminal").attr("src", "./assets/images/terminal-on.png");
        }
    },
}

// Bat defines all bat behaviours
var Bat = {

    // working condition of the bat
    condition: "good",

    // checks bat condition, if good adds to player inventory
    pickupBat: function () {
        if (Bat.condition == "good") {
            Player.inventory.push("bat");
            Cave.addmessage("You pickup the baseball bat, it seems sturdy enough.");
        } else {
            Cave.addmessage("You attempt to pickup the baseball bat, it crumbles in your hands.");
        }
        $("img#bat").toggle();
    }
}

// Rock defines all rock behaviours
var Rock = {

    // reveals pistol depending on player attribute
    checkrock: function () {
        if (Player.attribute != "str") {
            $("img#pistol").on("click", function () { Pistol.pickup() }).toggle();
            $("img#rock").toggle();
            if (Player.attribute == "per") {
                Cave.addmessage("You find a pistol behind the rock.");
            } else {
                Cave.addmessage("You trip and fall but find a pistol behind the rock.");
            }
        } else {
            Cave.addmessage("You don't find anything.");
        }
    }
}

// Defines all pistol behaviours
var Pistol = {

    // adds pistol to player inventory
    pickup: function () {
        Player.inventory.push("pistol");
        Cave.addmessage("You take the pistol.");
        $("img#pistol").toggle();
    }
}