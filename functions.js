var xphBreak = xphSettings.colorscheme + "&m" + br();

function br() {
	if (!arguments[0]) {
		return ChatLib.getChatBreak("-");
	} else {
		return ChatLib.getChatBreak(arguments[0]);
	}
}

function xphCenter(text) {
	return ChatLib.getCenteredText(text);
}

function xphChat(text) {
	if (!arguments[0]) {
		return ChatLib.chat("");
	}
	return ChatLib.chat(text);
}