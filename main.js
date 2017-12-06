var xphDate = new Date();

var xphSettings = {
	testVar: "e"
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

TriggerRegister.registerGameLoad("func_loadSettings");

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

function func_loadSettings() {
	try {
		var readFile = FileLib.read("XPHelper", "Data/DayTesting.json");
	} catch (e) {
		FileLib.write("XPHelper", "Data/DayTesting.json", JSON.stringify(xphDayTesting));
	}

	if (readFile) {
		xphDayTesting = JSON.parse(readFile);
	}
}