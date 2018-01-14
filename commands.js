TriggerRegister.registerCommand("command_xph", "xph", "/xph");
TriggerRegister.registerCommand("command_xphtest", "xphtest", "/xphtest");

var xphSettingsClickable = new Message(ChatLib.clickable("&b[SETTINGS]", "run_command", "/xph gui", "&bManage XPHelper settings"));

function command_xph() {
	switch(arguments[0]) {
		case "gui": xphOpenGui();
	}
	if (!arguments[0]) {
		xphChat(xphBreak);
		xphChat(xphCenter("&aXP&bHelper"));
		xphChat();
		xphChat(xphSettingsClickable);
		xphChat();
		xphChat(xphBreak);
	}
}

function command_xphtest() {
	ChatLib.chat(JSON.stringify(xphSettings));
}
