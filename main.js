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

function func_newday() {
	xphDayTesting.day = xphDate.getMonth() + " " + xphDate.getDay() + " " + xphDate.getYear();
	ChatLib.chat(xphDayTesting.day);
	setTimeout(function() {
		
	}, 4000);
}