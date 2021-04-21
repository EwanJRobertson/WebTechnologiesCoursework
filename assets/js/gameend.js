var Gameend = {

    // adds message to message area
    addMessage: function (text) {
        $("<p>").html(text).addClass("typewriter").appendTo("div#msgs");
        setTimeout(function () { $("div#msgs").children().removeClass("typewriter") }, 2900);
    },

    // adds title based on win loss condition and adds messages depending on player choices
    endText: function () {
        var name = sessionStorage.getItem("name");
        if (sessionStorage.getItem("result") == "win") {
            $("h1#result").html("Game Win");
            Gameend.addMessage(name + " escaped the cave with the map to find a replacement water chip, saving the entire settlement.");
        } else if (sessionStorage.getItem("result") == "loss") {
            $("h1#result").html("Game Loss");
            Gameend.addMessage(name + " failed to return the map of where to find a replacement water chip, dooming the entire settlement.");
        }

        setTimeout(function () {
            if (sessionStorage.getItem("attribute") == "per") {
                Gameend.addMessage(name + " noticed the password not so subtley written above their head. Allowing them access to the data.");
            } else if (sessionStorage.getItem("attribute" == "str")) {
                Gameend.addMessage();
            } else {
                Gameend.addMessage();
            }
        }, 3000);

        setTimeout(function () {
            if (sessionStorage.getItem("attribute") == "str" && sessionStorage.getItem("ratone") == "attack") {
                Gameend.addMessage(name + " defeated the rat using their great strength.");
            } else if (sessionStorage.getItem("ratone") == "attack") {
                Gameend.addMessage(name + " lunged for the rat but they were no match.");
            } else if (sessionStorage.getItem("ratone") == "scare") {
                Gameend.addMessage(name + " roared, frightening the rat away.");
            } else if (sessionStorage.getItem("ratone") == "wait") {
                Gameend.addMessage(name + " waited patiently for the rat to scurry away.");
            }
        }, 6000);

        setTimeout(function () {
            if (sessionStorage.getItem("rattwo") == "strrockbat") {
                Gameend.addMessage(name + " injured the giant rat with a rock before leaping in with their trusty baseball bat.");
            } else if (sessionStorage.getItem("rattwo") == "strbat") {
                Gameend.addMessage(name + "  charged in with their rickety bat but they were swiftly beaten.");
            } else if (sessionStorage.getItem("rattwo") == "lucstick") {
                Gameend.addMessage(name + "  disoriented the giant rat with their patented rat repellent.");
            } else if (sessionStorage.getItem("rattwo") == "lucpistol") {
                Gameend.addMessage(name + "  precisely shot a pool of oil setting the giant rat ablaze, as it leapt into a puddle to cool off the player escaped.");
            } else if (sessionStorage.getItem("rattwo") == "lucbat") {
                Gameend.addMessage(name + "  charged in with their bat, but their luck didn't hold out.");
            } else if (sessionStorage.getItem("rattwo") == "perpistol") {
                Gameend.addMessage(name + "  showed why they are the finest gun in the west, taking down the giant rat in a single shot.");
            } else if (sessionStorage.getItem("rattwo") == "pernoise") {
                Gameend.addMessage(name + " s eye was good, but the giant rats eye was quicker.");
            } else if (sessionStorage.getItem("attribute") == "per" && sessionStorage.getItem("rattwo") == "sneak") {
                Gameend.addMessage(name + "  slipped through the shadows and past the giant rat.");
            } else if (sessionStorage.getItem("rattwo") == "sneak") {
                Gameend.addMessage(name + "  attempted to sneak past the giant rat, but their movement was too clunky.");
            }
        }, 9000);
    },

}