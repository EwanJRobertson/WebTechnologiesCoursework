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
                    Cave.addMessage("You defeat the rat using your strength.");
                    $("img#rat").toggle();
                    Cave.stopTimer();
                    $("div#ratChoice").remove();
                    Cave.playSound("rat");
                    sessionStorage.setItem("ratone", "attack");
                    $("img#bat").on("click", function () { Bat.pickup() }).toggle();
                    Cave.roomExit(function () { Cave.roomThreeInit() });
                }
            });
        } else {
            choices.push({
                text: "Attack the rat", click: function () {
                    Cave.addMessage("You are no match for even this small rat...");
                    Cave.stopTimer();
                    $("div#ratChoice").remove();
                    sessionStorage.setItem("ratone", "attack");
                    setTimeout(function () { Cave.gameLoss() }, 3000);
                }
            });
        }
        if (Player.attribute == "luc") {
            choices.push({
                text: "(LUC) Scare the rat", click: function () {
                    $("img#rat").toggle();
                    Cave.stopTimer();
                    $("div#ratChoice").remove();
                    Cave.addMessage("You raise your arms and roar towards the rat...");
                    setTimeout(function () { Cave.addMessage("luckily it sees the large shadow you case against the cave wall and gets spooked.") }, 2000);
                    Cave.playSound("rat");
                    sessionStorage.setItem("ratone", "scare");
                    $("img#bat").on("click", function () { Bat.pickup() }).toggle();
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
                    Cave.addMessage("The rat appears injured.");
                    Cave.playSound("stone");
                    $("input#ratChoice0").off("click").on("click", function () {
                        Cave.addMessage("There are no more loose rocks.");
                    });
                    if (Player.inventory.includes("bat")) {
                        $("input#ratChoice1").off("click").on("click", function () {
                            $("div#ratChoice").remove();
                            Cave.playSound("rat");
                            Cave.playSound("bat");
                            sessionStorage.setItem("rattwo", "strrockbat");
                            Cave.addMessage("The rat scarpers away to lick its wounds, allowing you to pass.");
                            setTimeout(function () { Cave.gameWin() }, 3000);
                        });
                    }
                }
            });
        }

        if (Player.attribute == "str" && Player.inventory.includes("bat")) {
            choices.push({
                text: "(STR) Attack the rat using the bat you found.", click: function () {
                    Cave.playSound("rat");
                    Cave.playSound("bat");
                    sessionStorage.setItem("rattwo", "strbat");
                    $("div#ratChoice").remove();
                    Cave.addMessage("The rat is too nimble and you are quickly beaten.");
                    setTimeout(function () { Cave.gameLoss() }, 3000);
                }
            });
        }

        if (Player.attribute == "luc") {
            choices.push({
                text: "(LUC) Wave a large stick at the rat.", click: function () {
                    $("div#ratChoice").remove();
                    Cave.playSound("rat");
                    sessionStorage.setItem("rattwo", "lucstick");
                    Cave.addMessage("The rat appears disoriented by the substance on the end of the stick.")
                    setTimeout(function () { Cave.addMessage("It watches from a distance as it lets you pass.") }, 2000);
                    setTimeout(function () { Cave.gameWin() }, 3000);
                }
            });
        }

        if (Player.attribute == "luc" && Player.inventory.includes("pistol")) {
            choices.push({
                text: "(LUC) Fire the pistol you found.", click: function () {
                    $("div#ratChoice").remove();
                    Cave.playSound("shot");
                    sessionStorage.setItem("rattwo", "lucpistol");
                    setTimeout(function () { Cave.playSound("rat") }, 750);
                    Cave.addMessage("You shoot but miss. The bullet ricochets of the roof cause a large spark to fall into an oil pool.")
                    setTimeout(function () { Cave.addMessage("The rat jumps into a puddle to cool off, allowing you to pass.") }, 2000);
                    setTimeout(function () { Cave.gameWin() }, 3000);
                }
            });
        }

        if (Player.attribute == "luc" && Player.inventory.includes("bat")) {
            choices.push({
                text: "(LUC) Attack the rat using the bat you found.", click: function () {
                    $("div#ratChoice").remove();
                    sessionStorage.setItem("rattwo", "lucbat");
                    Cave.addMessage("The rat is too nimble and you are quickly beaten.");
                    setTimeout(function () { Cave.gameLoss() }, 3000);
                }
            });
        }

        if (Player.attribute == "per" && Player.inventory.includes("pistol")) {
            choices.push({
                text: "(PER) Fire the pistol you found.", click: function () {
                    $("div#ratChoice").remove();
                    Cave.playSound("shot");
                    sessionStorage.setItem("rattwo", "perpistol");
                    setTimeout(function () { Cave.playSound("rat") }, 750);
                    Cave.addMessage("You take aim and pull the trigger... bullseye.");
                    setTimeout(function () { Cave.gameWin() }, 3000);
                }
            });
        }

        if (Player.attribute == "per") {
            choices.push({
                text: "(PER) Attempt to distract the rat with a loud noise.", click: function () {
                    Cave.playSound("stone");
                    sessionStorage.setItem("rattwo", "pernoise");
                    $("div#ratChoice").remove();
                    Cave.addMessage("The rat quickly traces the source of the noise back to you.");
                    setTimeout(function () { Cave.gameLoss() }, 3000);
                }
            });
        }

        if (Player.attribute == "per") {
            choices.push({
                text: "Attempt to sneak past the rat.", click: function () {
                    sessionStorage.setItem("rattwo", "sneak");
                    $("div#ratChoice").remove();
                    Cave.addMessage("The successfully sneak past the rat.");
                    setTimeout(function () { Cave.gameWin() }, 3000);
                }
            });
        } else {
            choices.push({
                text: "Attempt to sneak past the rat.", click: function () {
                    sessionStorage.setItem("rattwo", "sneak");
                    $("div#ratChoice").remove();
                    Cave.addMessage("The rat smells you out quickly.");
                    setTimeout(function () { Cave.gameLoss() }, 3000);
                }
            });
        }

        return choices;
    },

    // handles rat behaviour when timer runs out
    runAway: function () {
        $("img#rat").off("click").toggle();
        Bat.condition = "bad";
        sessionStorage.setItem("ratone", "wait")
        $("img#bat").on("click", function () { Bat.pickup() }).toggle();
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
    pickup: function () {
        if (Bat.condition == "good") {
            Player.inventory.push("bat");
            Cave.addMessage("You pickup the baseball bat, it seems sturdy enough.");
        } else {
            Cave.addMessage("You attempt to pickup the baseball bat, it crumbles in your hands.");
        }
        $("img#bat").toggle();
    }
}

// Rock defines all rock behaviours
var Rock = {

    // reveals pistol depending on player attribute
    check: function () {
        if (Player.attribute != "str") {
            $("img#pistol").on("click", function () { Pistol.pickup() }).toggle();
            $("img#rock").toggle();
            if (Player.attribute == "per") {
                Cave.addMessage("You find a pistol behind the rock.");
            } else {
                Cave.addMessage("You trip and fall but find a pistol behind the rock.");
            }
        } else {
            Cave.addMessage("You don't find anything.");
        }
    }
}

// Defines all pistol behaviours
var Pistol = {

    // adds pistol to player inventory
    pickup: function () {
        Player.inventory.push("pistol");
        Cave.addMessage("You take the pistol.");
        $("img#pistol").toggle();
    }
}