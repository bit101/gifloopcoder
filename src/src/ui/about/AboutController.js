define(function(require) {

	var AboutView = require("ui/about/AboutView");

	function show() {
		AboutView.show();
	}

	return {
		show: show
	}

});