// I'm absolute trash at GUIs so credit for most of the base code goes to FalseHonesty and kerbybit

var xphGui = new Gui();
var xphScrolled = 0;

var xphTestSelector;

var titleString;
var titleWidth;

var xphCurrentMenu;

var bgalpha;

xphGui.registerClicked("xphGuiClicked");
TriggerRegister.registerStep("xphGuiStep");
xphGui.registerDraw("xphGuiDraw");

function xphOpenGui() {

	xphGuiSettingsMenu = new xphGuiMenu("&eGUI Settings");
	xphDeliveryManMenu = new xphGuiMenu("&6Delivery Man Settings");

	xphSettingsMenu = new xphGuiMenu("&bSettings");
	xphMainMenu = new xphGuiMenu("&aXP&bHelper");

	xphDailyStatsMenu = new xphStatsMenu("&2Stats");
	xphTotalStatsMenu = new xphStatsMenu("&2Stats");

	xphComingSoonMenu = new xphGuiMenu("&cComing soon!");

	xphBgFadeIntoggle = new xphOnOffToggleSelector("Fade in the GUI background", "xphSettings.gui.bgfadein");

	xphDeliveryOpenToggle = new xphOnOffToggleSelector("Automatically open Delivery Man links", "xphSettings.deliveryman.autoOpen");
	xphDeliveryWarnToggle = new xphOnOffToggleSelector("Warning if you haven't claimed daily rewards when you switch lobbies", "xphSettings.deliveryman.warnOnSwitch");

	xphGuiSettingsButton = new xphButton("GUI", Renderer.color(255, 255, 85, 150), Renderer.YELLOW, Renderer.WHITE, xphGuiSettingsMenu);
	xphDeliveryManSettingsButton = new xphButton("Delivery Man", Renderer.color(255, 170, 0, 150), Renderer.GOLD, Renderer.WHITE, xphDeliveryManMenu);
	xphSettingsButton = new xphButton("Settings", Renderer.color(85, 255, 255, 150), Renderer.AQUA, Renderer.WHITE, xphSettingsMenu);
	xphStatsButton = new xphButton("Stats", Renderer.color(85, 255, 85, 150), Renderer.GREEN, Renderer.WHITE, xphDailyStatsMenu);
	xphInfoButton = new xphButton("Info", Renderer.color(255, 170, 0, 150), Renderer.GOLD, Renderer.WHITE, xphComingSoonMenu);
	xphGoalsButton = new xphButton("Goals", Renderer.color(255, 85, 85, 150), Renderer.RED, Renderer.WHITE, xphComingSoonMenu);
	xphQuestsButton = new xphButton("Quests", Renderer.color(0, 170, 0, 150), Renderer.DARK_GREEN, Renderer.WHITE, xphComingSoonMenu);

	xphTotalStatsButton = new xphButton("Lifetime Stats", Renderer.color(85, 255, 255, 150), Renderer.AQUA, Renderer.WHITE, xphTotalStatsMenu);
	xphDailyStatsButton = new xphButton("Daily Stats", Renderer.color(85, 255, 255, 150), Renderer.AQUA, Renderer.WHITE, xphDailyStatsMenu);

	xphMainMenuBackButton = new xphBackButton(xphMainMenu);
	xphSettingsMenuBackButton = new xphBackButton(xphSettingsMenu);

	xphMainMenu.addSetting(xphSettingsButton);
	xphMainMenu.addSetting(xphStatsButton);
	xphMainMenu.addSetting(xphInfoButton);
	xphMainMenu.addSetting(xphGoalsButton);
	xphMainMenu.addSetting(xphQuestsButton);

	xphSettingsMenu.addSetting(xphGuiSettingsButton);
	xphSettingsMenu.addSetting(xphDeliveryManSettingsButton);
	xphSettingsMenu.addSetting(xphMainMenuBackButton);

	xphGuiSettingsMenu.addSetting(xphBgFadeIntoggle);
	xphGuiSettingsMenu.addSetting(xphSettingsMenuBackButton);

	xphDeliveryManMenu.addSetting(xphDeliveryOpenToggle);
	xphDeliveryManMenu.addSetting(xphDeliveryWarnToggle);
	xphDeliveryManMenu.addSetting(xphSettingsMenuBackButton);

	xphDailyStatsMenu.addButton(xphTotalStatsButton);
	xphDailyStatsMenu.addString("&aTotal XP gained today: &9", xphDailyStats.xp);
	xphDailyStatsMenu.addString("&eTotal challenges completed today: &b", xphDailyStats.challenges);
	xphDailyStatsMenu.addString("&eChallenges left today: &b", xphDailyStats.challengesleft);
	xphDailyStatsMenu.addString("&aTotal quests completed today: &e", xphDailyStats.quests);
	xphDailyStatsMenu.addString("&aTotal coins gained today: &6", xphDailyStats.coins);
	xphDailyStatsMenu.addButton(xphMainMenuBackButton);

	xphTotalStatsMenu.addButton(xphDailyStatsButton);
	xphTotalStatsMenu.addString("&aTotal XP gained: &9", xphTotalStats.xp);
	xphTotalStatsMenu.addString("&eTotal challenges completed: &b", xphTotalStats.challenges);
	xphTotalStatsMenu.addString("&aTotal quests completed: &e", xphTotalStats.quests);
	xphTotalStatsMenu.addString("&aTotal coins gained: &6", xphTotalStats.coins);
	xphTotalStatsMenu.addString("", "");
	xphTotalStatsMenu.addString("&aTotal votes: &e", xphTotalStats.votes);
	xphTotalStatsMenu.addString("&aTotal reward cards claimed: &e", xphTotalStats.rewardCards);
	xphTotalStatsMenu.addString("&aTotal daily rewards claimed: &e", xphTotalStats.dailyRewards);
	xphTotalStatsMenu.addButton(xphMainMenuBackButton);

	xphComingSoonMenu.addSetting(xphMainMenuBackButton);

	xphCurrentMenu = xphMainMenu;

	xphGui.open();
}

function xphSaveSettings() {
  FileLib.write("XPHelper/Data", "settings.json", JSON.stringify(xphSettings));
}

function xphGuiClicked(mouseX, mouseY, button) {
	if (button == 0) {
		xphCurrentMenu.click();
	}

	if (button == -1) {
		xphScrolled -= 10;
	} else if (button == -2) {
		xphScrolled += 10;
	}

	if (xphScrolled < 0) {
		xphScrolled = 0;
	}

	if (xphScrolled > 270 - Renderer.screen.getHeight()) {
		xphScrolled = 270 - Renderer.screen.getHeight();
	}
}

function xphGuiStep() {
	if (xphSettings.gui.bgfadein) {
		if (xphGui.isOpen()) {
			if (bgalpha < 150) {
				bgalpha += 5;
			}
		} else {
			bgalpha = 50;
		}
	}

  if (xphGui.isOpen() && xphCurrentMenu.getType() == "Settings") {
		xphCurrentMenu.update();
  }
}

function xphGuiDraw(mouseX, mouseY) {

  if (Renderer.screen.getHeight() > 300) {
	  xphScrolled = 0;
  }

  var y = 20 - xphScrolled;
  var x = Renderer.screen.getWidth() / 2;

	if (xphSettings.gui.bgfadein) {
		Renderer.drawRect(Renderer.color(0, 0, 0, bgalpha), 0, 0, Renderer.screen.getWidth(), Renderer.screen.getHeight());
	} else {
		Renderer.drawRect(Renderer.color(0, 0, 0, 150), 0, 0, Renderer.screen.getWidth(), Renderer.screen.getHeight());
	}

	xphCurrentMenu.draw(x, y, mouseX, mouseY);

  xphUpdateSettings();
}

function xphUpdateSettings() {
  var updateSettings = false;

	if (xphCurrentMenu.getType() == "Stats") return;

	for (var i = 0; i < xphCurrentMenu.settings.length; i++) {
		if (xphCurrentMenu.settings[i].getType() == "Button") return;
		var getSetting = xphCurrentMenu.settings[i].getSelected();
		if (xphSettings[xphCurrentMenu.settings[i].getVariable().split('.')[1]][xphCurrentMenu.settings[i].getVariable().split('.')[2]] != getSetting) {
			xphSettings[xphCurrentMenu.settings[i].getVariable().split('.')[1]][xphCurrentMenu.settings[i].getVariable().split('.')[2]] = getSetting;
			updateSettings = true;
		}
	}

  if (updateSettings) {
    xphSaveSettings();
  }
}

// Menu objects

function xphGuiMenu(title) {

	this.title = title;

	this.settings = [];

	this.addSetting = function(setting) {
		this.settings.push(setting);
	}

	this.update = function() {
		for (var i = 0; i < this.settings.length; i++) {
			this.settings[i].update();
		}
	}

	this.draw = function(x, y, mouseX, mouseY) {

		titleWidth = Renderer.getStringWidth(ChatLib.removeFormatting(this.title));

		Renderer.drawStringWithShadow(
		ChatLib.addColor(this.title),
		x - titleWidth / 2,
	    y
	  );

		y += 30;

		for (var i = 0; i < this.settings.length; i++) {
			if (this.settings[i] instanceof xphBackButton) y += 15;
			this.settings[i].draw(x, y, mouseX, mouseY);
			if (this.settings[i].getType() == "Button") {
			 	y += 40;
			} else {
			 	y += 50;
			}
		}
	}

	this.click = function() {
		for (var i = 0; i < this.settings.length; i++) {
			this.settings[i].click();
		}
	}

	this.getType = function() {
		return "Settings";
	}

}

function xphStatsMenu(title) {

	this.title = title;

	this.strings = [];

	this.addString = function(string, value) {
		this.strings.push(string + value);
	}

	this.addButton = function(button) {
		this.strings.push(button);
	}

	this.draw = function(x, y, mouseX, mouseY) {

		Renderer.drawStringWithShadow(
		ChatLib.addColor(this.title),
		x - Renderer.getStringWidth(ChatLib.removeFormatting(this.title)) / 2,
	    y
	  );

		y += 30;

		for (var i = 0; i < this.strings.length; i++) {
			if (this.strings[i] instanceof xphButton || this.strings[i] instanceof xphBackButton) {
				if (this.strings[i] instanceof xphBackButton) y += 15;
				this.strings[i].draw(x, y, mouseX, mouseY);
				y += 30;
			} else {
				Renderer.drawStringWithShadow(
				ChatLib.addColor(this.strings[i]),
				x - Renderer.getStringWidth(ChatLib.removeFormatting(this.strings[i])) / 2,
					y
				);
				y += 15;
			}
		}
	}

	this.click = function() {
		for (var i = 0; i < this.strings.length; i++) {
			if (this.strings[i] instanceof xphButton || this.strings[i] instanceof xphBackButton) {
				this.strings[i].click();
			}
		}
	}

	this.getType = function() {
		return "Stats";
	}

}

// Selectors

/*function xphGuiString(text, variable) {
	this.text = text;

	this.x = 0;
	this.y = 0;
	this.mouseX = 0;
	this.mouseY = 0;



}*/

function xphOnOffToggleSelector(text, variable) {
	this.text = text;

	this.x = 0;
	this.y = 0;
	this.mouseX = 0;
	this.mouseY = 0;

	this.hovered = -1;

	this.selected = xphSettings[variable.split('.')[1]][variable.split('.')[2]];

	this.update = function() {

	}

	this.draw = function(x, y, mouseX, mouseY) {
		this.mouseX = mouseX;
		this.mouseY = mouseY;
		this.x = x;
		this.y = y;

		this.hover();

		Renderer.drawStringWithShadow(
			text,
			this.x - Renderer.getStringWidth(text) / 2,
			y
		);

		var greenColorDeselected = Renderer.color(85, 255, 85, 100);
		var greenColorHovered = Renderer.color(85, 255, 85, 150);
		var greenColorSelected = Renderer.GREEN;

		var redColorDeselected = Renderer.color(255, 85, 85, 100);
		var redColorHovered = Renderer.color(255, 85, 85, 150);
		var redColorSelected = Renderer.RED;

		var greenColor;
		var redColor;

		if (this.selected == true) {
			greenColor = greenColorSelected;
			if (this.hovered == 0) {
				redColor = redColorHovered;
			} else {
				redColor = redColorDeselected;
			}
		} else {
			redColor = redColorSelected;
			if (this.hovered == 1) {
				greenColor = greenColorHovered;
			} else {
				greenColor = greenColorDeselected;
			}
		}

		if (this.selected == true) {
			Renderer.drawRect(
				Renderer.WHITE,
				this.x - (Renderer.getStringWidth("Off") / 2) - 25,
				this.y + 19 - (9 / 2),
				Renderer.getStringWidth("Off") + 12,
				21
			)
		} else {
			Renderer.drawRect(
				Renderer.WHITE,
				this.x - (Renderer.getStringWidth("Off") / 2) + 15,
				this.y + 19 - (9 / 2),
				Renderer.getStringWidth("Off") + 12,
				21
			)
		}

		Renderer.drawRect(
			greenColor,
			this.x - (Renderer.getStringWidth("Off") / 2) - 24,
			this.y + 20 - (9 / 2),
			Renderer.getStringWidth("Off") + 10,
			19
		)

		Renderer.drawStringWithShadow(
			"On",
			this.x - (Renderer.getStringWidth("On") / 2) - 19,
			this.y + 20
		)

		Renderer.drawRect(
			redColor,
			this.x - (Renderer.getStringWidth("Off") / 2) + 16,
			this.y + 20 - (9 / 2),
			Renderer.getStringWidth("Off") + 10,
			19
		)

		Renderer.drawStringWithShadow(
			"Off",
			this.x - (Renderer.getStringWidth("Off") / 2) + 21,
			this.y + 20
		)

	}

	this.hover = function() {
		var isHovered = false;

		var truex1 = this.x - (Renderer.getStringWidth("Off") / 2) - 24;
		var truex2 = truex1 + Renderer.getStringWidth("Off") + 10;
		var falsex1 = this.x - (Renderer.getStringWidth("Off") / 2) + 16;
		var falsex2 = falsex1 + Renderer.getStringWidth("Off") + 10;
		var y1 = this.y + 20 - (9 / 2);
		var y2 = y1 + 19;

		if (this.mouseX > truex1 && this.mouseX < truex2
		&& this.mouseY > y1 && this.mouseY < y2) {
			this.hovered = 1;
			isHovered = true;
		}

		if (this.mouseX > falsex1 && this.mouseX < falsex2
		&& this.mouseY > y1 && this.mouseY < y2) {
			this.hovered = 0;
			isHovered = true;
		}

    if (!isHovered) {
      this.hovered = -1;
    }
	}

	this.click = function() {
    if (this.hovered == 1) {
      this.selected = true;
    }

		if (this.hovered == 0) {
			this.selected = false;
		}
	}

	this.getSelected = function() {
		return this.selected;
	}

	this.getVariable = function() {
		return variable;
	}

	this.getType = function() {
		return "Selector";
	}
}

function xphSliderSelector(text, variable, min, max) {

}

function xphIntIncrementSelector(text, variable, min, max) {

}

// credit for this one goes to FalseHonesty, I'm just using it for testing right now lol
function xphColorSelector(text, variable) {
  this.text = text;

  this.x = 0;
  this.y = 0;
  this.mouseX = 0;
  this.mouseY = 0;

  this.hovered = -1;
  this.xOffsets = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.zOffsets = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  this.selected = parseInt("0x" + xphSettings[variable.split('.')[1]][variable.split('.')[2]].replace("&", ""));

  this.update = function() {
    for (var i = 0; i < 16; i++) {
      if (i == this.selected) {
        this.xOffsets[i] = easeOut(this.xOffsets[i], 0, 5, 0.1);
        this.zOffsets[i] = easeOut(this.zOffsets[i], 0, 5, 0.1);
      } else if (i < this.selected) {
        this.xOffsets[i] = easeOut(this.xOffsets[i], -10, 5, 0.1);
        this.zOffsets[i] = easeOut(this.zOffsets[i], 10, 5, 0.1);
      } else {
        this.xOffsets[i] = easeOut(this.xOffsets[i], 10, 5, 0.1);
        this.zOffsets[i] = easeOut(this.zOffsets[i], 10, 5, 0.1);
      }
    }
  }

  this.draw = function(x, y, mouseX, mouseY) {
    this.mouseX = mouseX;
    this.mouseY = mouseY;
    this.x = x;
    this.y = y;

    this.hover();

    Renderer.drawStringWithShadow(
      text,
      this.x - Renderer.getStringWidth(text) / 2,
      y
    );

    for (var i = 0; i < 16; i++) {
      Renderer.drawRect(
        Renderer.getColor(i),
        this.x - 160 + i * 20 + this.xOffsets[i] + Math.abs(this.xOffsets[i] / 2),
        this.y + 10 + Math.abs(this.zOffsets[i] / 2),
        30 - this.zOffsets[i],
        30 - this.zOffsets[i]
      );
    }

    for (var i = 0; i < 16; i++) {
      if (i == this.selected) {
        Renderer.drawRect(Renderer.WHITE, this.x - 162 + i * 20, this.y + 40, 34, 2);
        Renderer.drawRect(Renderer.WHITE, this.x - 162 + i * 20, this.y + 8, 2, 34);
        Renderer.drawRect(Renderer.WHITE, this.x - 162 + i * 20, this.y + 8, 34, 2);
        Renderer.drawRect(Renderer.WHITE, this.x - 130 + i * 20, this.y + 8, 2, 34);
      }
    }
  }

  this.hover = function() {
    var isHovered = false;
    for (var i = 0; i < 16; i++) {
      var x1 = this.x - 160 + i * 20 + this.xOffsets[i] + Math.abs(this.xOffsets[i] / 2);
      var x2 = x1 + (30 - Math.abs(this.xOffsets[i]));
      var y1 = this.y + 10 + this.zOffsets[i] / 2;
      var y2 = y1 + (30 - this.zOffsets[i])

      if (this.mouseX > x1 && this.mouseX < x2
      && this.mouseY > y1 && this.mouseY < y2) {
        this.hovered = i;
        isHovered = true;
      }
    }
    if (!isHovered) {
      this.hovered = -1;
    }
  }

  this.click = function() {
    for (var i = 0; i < 16; i++) {
      if (i == this.hovered) {
        this.selected = this.hovered;
      }
    }
  }

  this.getSelected = function() {
    return "&" + this.selected.toString(16).toLowerCase();
  }

	this.getVariable = function() {
		return variable;
	}

	this.getType = function() {
		return "Selector";
	}
}

// Buttons

function xphButton(text, color, hovercolor, textcolor, menu) {
	this.text = text;

	this.x = 0;
	this.y = 0;
	this.mouseX = 0;
	this.mouseY = 0;

	this.hovered = false;

	this.color = color;
	this.hovercolor = hovercolor;
	this.textcolor = textcolor;

	this.menu = menu;

	this.update = function() {

	}

	this.draw = function(x, y, mouseX, mouseY) {
		this.mouseX = mouseX;
		this.mouseY = mouseY;
		this.x = x;
		this.y = y;

		this.hover();

		var buttonColor;

		if (this.hovered) {
			buttonColor = this.hovercolor;
		} else {
			buttonColor = this.color;
		}

		if (Renderer.getStringWidth("eeeeeee") < Renderer.getStringWidth(this.text)) {
			Renderer.drawRect(
				buttonColor,
				this.x - (Renderer.getStringWidth(this.text) / 2) - 5,
				this.y - (9 / 2),
				Renderer.getStringWidth(this.text) + 10,
				19
			);
		} else {
			Renderer.drawRect(
				buttonColor,
				this.x - (Renderer.getStringWidth("eeeeeee") / 2) - 5,
				this.y - (9 / 2),
				Renderer.getStringWidth("eeeeeee") + 10,
				19
			);
		}

		Renderer.drawStringWithShadow(
			this.text,
			this.x - Renderer.getStringWidth(text) / 2,
			y
		);

	}

	this.hover = function() {
		this.hovered = false;

		if (Renderer.getStringWidth("eeeeeee") < Renderer.getStringWidth(this.text)) {
			var x1 = this.x - (Renderer.getStringWidth(this.text) / 2) - 5;
			var x2 = x1 + Renderer.getStringWidth(this.text) + 10;
			var y1 = this.y - (9 / 2);
			var y2 = y1 + 19;
		} else {
			var x1 = this.x - (Renderer.getStringWidth("eeeeeee") / 2) - 5;
			var x2 = x1 + Renderer.getStringWidth("eeeeeee") + 10;
			var y1 = this.y - (9 / 2);
			var y2 = y1 + 19;
		}

		if (this.mouseX > x1 && this.mouseX < x2 && this.mouseY > y1 && this.mouseY < y2) {
			this.hovered = true;
		}
	}

	this.click = function() {
		if (this.hovered) {
			xphCurrentMenu = this.menu;
		}
	}

	this.getType = function() {
		return "Button";
	}
}

function xphBackButton(menu) {
	this.text = "Back";

	this.x = 0;
	this.y = 0;
	this.mouseX = 0;
	this.mouseY = 0;

	this.hovered = false;

	this.color = Renderer.color(255, 85, 85, 150);
	this.hovercolor = Renderer.color(255, 85, 85, 255);
	this.textcolor = Renderer.WHITE;

	this.menu = menu;

	this.update = function() {

	}

	this.draw = function(x, y, mouseX, mouseY) {
		this.mouseX = mouseX;
		this.mouseY = mouseY;
		this.x = x;
		this.y = y;

		this.hover();

		var buttonColor;

		if (this.hovered) {
			buttonColor = this.hovercolor;
		} else {
			buttonColor = this.color;
		}

		Renderer.drawRect(
			buttonColor,
			this.x - (Renderer.getStringWidth("Back") / 2) - 5,
			this.y - (9 / 2),
			Renderer.getStringWidth("Back") + 10,
			19
		);

		Renderer.drawStringWithShadow(
			this.text,
			this.x - Renderer.getStringWidth("Back") / 2,
			y
		);

	}

	this.hover = function() {
		this.hovered = false;

		var x1 = this.x - (Renderer.getStringWidth("Back") / 2) - 5;
		var x2 = x1 + Renderer.getStringWidth("Back") + 10;
		var y1 = this.y - (9 / 2);
		var y2 = y1 + 19;

		if (this.mouseX > x1 && this.mouseX < x2 && this.mouseY > y1 && this.mouseY < y2) {
			this.hovered = true;
		}
	}

	this.click = function() {
		if (this.hovered) {
			xphCurrentMenu = this.menu;
		}
	}

	this.getType = function() {
		return "Button";
	}
}
