var xphDate = new Date();

var xphSettings = {
	test: "a",
	testVar: "e",
	colorscheme: "&e",
	deliveryman: {
		autoOpen: "true"
	}
}

var xphDailyStats = {
	xp: 0,
	coins: 0,
	challenges: 0,
	challengesleft: 0,
	quests: 0
}

var xphTotalStats = {
	xp: 0,
	challenges: 0,
	quests: 0,
	coins: 0,
	xpBags: 0,
	votes: 0,
	rewardCards: 0,
	dailyRewards: 0,
	mysteryBoxes: 0,
	lootChests: 0,
	soulWells: 0
}

var xphDayTesting = {
	day: "",
	testday: ""
}

TriggerRegister.registerWorldLoad("func_newday");
TriggerRegister.registerWorldLoad("func_initializeVars");

TriggerRegister.registerGameLoad("func_loadSettings");
TriggerRegister.registerGameUnload("func_saveSettings");

function func_newday() {
	xphDayTesting.testday = xphDate.getMonth() + " " + xphDate.getDate() + " " + xphDate.getFullYear();
	new Thread(function() {
		Thread.sleep(2000);
		if (xphDayTesting.testday != xphDayTesting.day) {
			xphDayTesting.day = xphDate.getMonth() + " " + xphDate.getDate() + " " + xphDate.getFullYear();
			FileLib.write("XPHelper", "Data/DayTesting.json", JSON.stringify(xphDayTesting));
		}
	}).start();
}

function func_initializeVars() {
	xphBreak = "&e&m" + br();
}

function func_loadSettings() {
	try {
		var dayFile = FileLib.read("XPHelper", "Data/daytesting.json");
	} catch (e) {
		FileLib.write("XPHelper", "Data/daytesting.json", JSON.stringify(xphDayTesting));
	}

	if (dayFile) {
		xphDayTesting = xphLoadSettings(xphDayTesting, "XPHelper", "Data/daytesting.json");
	}
	
	try {
		var settingsFile = FileLib.read("XPHelper", "Data/settings.json");
	} catch (e) {
		FileLib.write("XPHelper", "Data/settings.json", JSON.stringify(xphSettings));
	}
	
	if (settingsFile) {
		xphSettings = xphLoadSettings(xphSettings, "XPHelper", "Data/settings.json");
	}
}

function func_saveSettings() {
	FileLib.write("XPHelper", "Data/settings.json", JSON.stringify(xphSettings));
}