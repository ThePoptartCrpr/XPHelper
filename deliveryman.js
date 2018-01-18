// \n&r&6Click the link to visit our website and claim your reward: &r&bhttp://rewards.hypixel.net/claim-reward/e43737ef&r\n&r

// &aToday's voting link is &r&bvote.hypixel.net/0&r&a!&r&a &aFollow the instructions on the website to redeem &95,000 XP &aand &63,000 Arcade Coins&a!&r


// &r&aYou have successfully claimed &r&32,000 &r&3Hypixel &r&3Experience&r&a and &r&63,000 &r&6Arcade &r&6Coins&r&a!&r

// &fYou have claimed a &r&f&l[Common Quakecraft Coins] &r&freward card!&r

// &6Thanks for supporting the server! You earned &r&95,000 XP&r&6 and 3,000 Arcade Coins!&r

TriggerRegister.registerChat("openVoteLink").setChatCriteria("&aToday's voting link is &r&b${URL}&r&a!&r&a &aFollow the instructions on the website to redeem &95,000 XP &aand &63,000 Arcade Coins&a!&r");
TriggerRegister.registerChat("openRewardLink").setChatCriteria("\n&r&6Click the link to visit our website and claim your reward: &r&b${URL}&r\n&r");

TriggerRegister.registerChat("xphDailyClaimed").setChatCriteria("&r&aYou have successfully claimed &r&32,000 &r&3Hypixel &r&3Experience&r&a and &r&63,000 &r&6Arcade &r&6Coins&r&a!&r");
TriggerRegister.registerChat("xphCardClaimed").setChatCriteria("&fYou have claimed a &r${card} &r&freward card!&r");
TriggerRegister.registerChat("xphVoteClaimed").setChatCriteria("&6Thanks for supporting the server! You earned &r&95,000 XP&r&6 and 3,000 Arcade Coins!&r");

TriggerRegister.registerWorldLoad("xphLobbySwitchWarn");

TriggerRegister.registerCommand("xphDismissWarn", "xphdismisswarn", "/xphdismisswarn");
TriggerRegister.registerCommand("xphUndoDismiss", "xphundodismiss", "/xphundodismiss");

function openVoteLink(URL) {
	if (xphSettings.deliveryman.autoOpen == true) {
		ChatLib.chat("&aAutomatically opening the voting link.");
		java.awt.Desktop.getDesktop().browse(new java.net.URI("http://" + URL));
	}
}

function openRewardLink(URL) {
	if (xphSettings.deliveryman.autoOpen == true) {
		ChatLib.chat("&aAutomatically opening the reward link.");
		java.awt.Desktop.getDesktop().browse(new java.net.URI(URL));
	}
}

function xphDailyClaimed() {
	xphDailyStats.deliveryman.daily = true;
	xphDailyStats.xp += 2000;
	xphDailyStats.coins += 3000;
	xphTotalStats.xp += 2000;
	xphTotalStats.coins += 3000;
}

function xphCardClaimed(URL) {
	xphDailyStats.card = true;
}

function xphVoteClaimed() {
	xphDailyStats.voted = true;
	xphDailyStats.xp += 5000;
	xphDailyStats.coins += 3000;
	xphTotalStats.xp += 5000;
	xphTotalStats.coins += 3000;
}

// Warning
function xphLobbySwitchWarn() {
	if ((xphSettings.deliveryman.warnOnSwitch == true) && (xphDailyStats.dismissed == false) && (serverIP.indexOf("hypixel") !== -1)) {
		if ((xphDailyStats.voted == false) || (xphDailyStats.daily == false) || (xphDailyStats.card == false)) {
			new Thread(function() {
				Thread.sleep(2000);
				ChatLib.chat(xphBreak);
				if (xphDailyStats.voted == false && xphDailyStats.card == false && xphDailyStats.daily == false) {
	      	ChatLib.chat("&cYou haven\'t claimed your daily rewards, reward card or voted yet today!");
				} else if (xphDailyStats.voted == false && xphDailyStats.card == false) {
		  		ChatLib.chat("&cYou haven\'t claimed your reward card or voted yet today!");
				} else if (xphDailyStats.voted == false && xphDailyStats.daily == false) {
		  		ChatLib.chat("&cYou haven\'t claimed your daily rewards or voted yet today!");
				} else if (xphDailyStats.daily == false && xphDailyStats.card == false) {
		  		ChatLib.chat("&cYou haven\'t claimed your daily rewards or reward card yet today!");
				} else if (xphDailyStats.daily == false) {
		  		ChatLib.chat("&cYou haven\'t claimed your daily rewards yet today!");
		 		}	else if (xphDailyStats.card == false) {
		  		ChatLib.chat("&cYou haven\'t claimed your reward card yet today!");
				} else if (xphDailyStats.voted == false) {
		  		ChatLib.chat("&cYou haven\'t voted yet today!");
				}
				xphChat();
				var warpClickable = new Message(ChatLib.clickable("&e[WARP]", "run_command", "/delivery", "&aWarp to the delivery man"));
				ChatLib.chat(warpClickable);
				xphChat();
				var dismissClickable = new Message(ChatLib.clickable("&c[Dismiss]", "run_command", "/xphdismisswarn", "&cDismiss this warning"));
				ChatLib.chat(dismissClickable);
				ChatLib.chat(xphBreak);
			}).start();
		}
	}
}

function xphDismissWarn() {
	ChatLib.chat(xphBreak);
	ChatLib.chat("&cDismissed the warning.");
	ChatLib.chat(xphBreak);
	xphDailyStats.dismissed = true;
}

// Debug commands
function xphUndoDismiss() {
	xphDailyStats.dismissed = false;
}
