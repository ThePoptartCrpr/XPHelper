TriggerRegister.registerCommand("command_xph", "xph", "/xph");

function command_xph() {
	/*switch(arguments[0]) {
		case "gui": xphOpenGui();
	}*/
	if (!arguments[0]) {
		chat(xphBreak);
		chat(center("&aXP&bHelper"));
		chat();
		chat(xphBreak);
	}
}