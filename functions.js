var br = "&m" + ChatLib.getChatBreak("-");
var xphBreak = "&e" + br;

function br() {
	if (!arguments[0]) {
		return ChatLib.getChatBreak("-");
	} else {
		return ChatLib.getChatBreak(arguments[0]);
	}
}

function center(text) {
	return ChatLib.getCenteredText(text);
}

function chat(text) {
	if (!arguments[0]) {
		return ChatLib.chat("");
	}
	return ChatLib.chat(text);
}