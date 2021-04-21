// Create handles creation of new html elements using jQuery
// use of jQuery is a short hand way of using javascript document.createElement() and document.setAttribute()
var Create = {
    
    // return input element with button type
	Button: function(options) {
		var button = $("<input>")
            .attr("type", "button")
			.attr("id", options.id)
			.attr("value", options.text)
            .addClass("btn btn-green")
            .click(options.click);

		return button;
	},

    // returns div containing a text box and submit button
    InputGroup: function(options) {
        var element = $("<div>")
            .attr("id", "ig-" + options.id)
            .addClass("input-group w-50");

        $("<input>")
            .attr("type", "text")
            .attr("id", "tb-" + options.id)
            .attr("placeholder", options.name)
            .addClass("form-control input-green")
            .appendTo(element);

        $("<div>").addClass("input-group-append")
            .add(Create.Button(options)).
            appendTo(element);

        return element;
    },

    // returns group of buttons vertically stacked
    Choice: function(options) {
		var buttons = $("<div>")
            .attr("id", options.id)
            .addClass("btn-group-vertical btn-group mb-3");

        var count = 0;
        options.choices.forEach(element => {
            Create.Button({
                id: options.id + count,
                text: element.text,
                click: element.click
            }).appendTo(buttons);
            count++;
        });

        return buttons;
    },

    // returns anchor tag with button styling to take user to different page
    Link: function(options) {
        var link = $("<a>")
            .html("End Game")
            .attr("href", options.address)
            .addClass("btn btn-green cave-element");

        return link;
    }
};