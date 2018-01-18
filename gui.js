// I'm absolute trash at GUIs so credit for most of the base code goes to FalseHonesty and kerbybit

var xphGui = new Gui();
var xphScrolled = 0;

var xphTestSelector;

var titleString;
var titleWidth;

var xphCurrentMenu;

xphGui.registerClicked("xphGuiClicked");
TriggerRegister.registerStep("xphGuiStep");
xphGui.registerDraw("xphGuiDraw");

function xphOpenGui() {

	xphDeliveryManMenu = new xphGuiMenu("&6Delivery Man Settings");

	xphSettingsMenu = new xphGuiMenu("&bSettings");
	xphMainMenu = new xphGuiMenu("&aXP&bHelper");

	xphDailyStatsMenu = new xphStatsMenu("&2Stats");

	xphComingSoonMenu = new xphGuiMenu("&cComing soon!");

	xphDeliveryOpenToggle = new xphOnOffToggleSelector("Automatically open Delivery Man links", "xphSettings.deliveryman.autoOpen");
	xphDeliveryWarnToggle = new xphOnOffToggleSelector("Warning if you haven't claimed daily rewards when you switch lobbies", "xphSettings.deliveryman.warnOnSwitch");
	// xphTestSetting = new xphColorSelector("Test", "xphSettings.testing.testVar");

	xphDeliveryManSettingsButton = new xphButton("Delivery Man", RenderLib.color(255, 170, 0, 150), RenderLib.color(255, 170, 0, 255), RenderLib.WHITE, xphDeliveryManMenu);
	xphSettingsButton = new xphButton("Settings", RenderLib.color(85, 255, 255, 150), RenderLib.color(85, 255, 255, 255), RenderLib.WHITE, xphSettingsMenu);
	xphStatsButton = new xphButton("Stats", RenderLib.color(85, 255, 85, 150), RenderLib.color(85, 255, 85, 255), RenderLib.WHITE, xphDailyStatsMenu);
	xphInfoButton = new xphButton("Info", RenderLib.color(255, 170, 0, 150), RenderLib.color(255, 170, 0, 255), RenderLib.WHITE, xphComingSoonMenu);
	xphGoalsButton = new xphButton("Goals", RenderLib.color(255, 85, 85, 150), RenderLib.color(255, 85, 85, 255), RenderLib.WHITE, xphComingSoonMenu);
	xphQuestsButton = new xphButton("Quests", RenderLib.color(0, 170, 0, 150), RenderLib.color(0, 170, 0, 255), RenderLib.WHITE, xphComingSoonMenu);

	xphMainMenu.addSetting(xphSettingsButton);
	xphMainMenu.addSetting(xphStatsButton);
	xphMainMenu.addSetting(xphInfoButton);
	xphMainMenu.addSetting(xphGoalsButton);
	xphMainMenu.addSetting(xphQuestsButton);

	xphSettingsMenu.addSetting(xphDeliveryManSettingsButton);

	xphDeliveryManMenu.addSetting(xphDeliveryOpenToggle);
	xphDeliveryManMenu.addSetting(xphDeliveryWarnToggle);
	// xphDeliveryManMenu.addSetting(xphTestSetting);

	xphDailyStatsMenu.addString("&aTotal XP gained today: &1", xphDailyStats.xp);
	xphDailyStatsMenu.addString("&aTotal coins gained today: &6", xphDailyStats.coins);

	xphCurrentMenu = xphMainMenu;

	xphGui.open();
	ChatLib.chat(JSON.stringify(xphSettings));
}

function xphSaveSettings() {
  FileLib.write("XPHelper/Data", "settings.json", JSON.stringify(xphSettings));
}

function xphGuiClicked(mouseX, mouseY, button) {
	if (button == 0 && xphCurrentMenu.getType() == "Settings") {
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

	if (xphScrolled > 270 - RenderLib.getRenderHeight()) {
		xphScrolled = 270 - RenderLib.getRenderHeight();
	}
}

function xphGuiStep() {
  if (xphGui.isOpen() && xphCurrentMenu.getType() == "Settings") {
		xphCurrentMenu.update();
  }
}

function xphGuiDraw(mouseX, mouseY) {

  if (RenderLib.getRenderHeight() > 300) {
	  xphScrolled = 0;
  }

  var y = 20 - xphScrolled;
  var x = RenderLib.getRenderWidth() / 2;

  RenderLib.drawRectangle(0xa0000000, 0, 0, RenderLib.getRenderWidth(), RenderLib.getRenderHeight());

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

		titleWidth = RenderLib.getStringWidth(ChatLib.removeFormatting(this.title));

		RenderLib.drawStringWithShadow(
		ChatLib.addColor(this.title),
		x - titleWidth / 2,
	    y,
	    0xffffffff
	  );

		y += 30;

		for (var i = 0; i < this.settings.length; i++) {
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

	this.draw = function(x, y, mouseX, mouseY) {

		RenderLib.drawStringWithShadow(
		ChatLib.addColor(this.title),
		x - RenderLib.getStringWidth(ChatLib.removeFormatting(this.title)) / 2,
	    y,
	    0xffffffff
	  );

		y += 30;

		for (var i = 0; i < this.strings.length; i++) {
			RenderLib.drawStringWithShadow(
			ChatLib.addColor(this.strings[i]),
			x - RenderLib.getStringWidth(ChatLib.removeFormatting(this.strings[i])) / 2,
				y,
				0xffffffff
			);
			y += 15;
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

		RenderLib.drawStringWithShadow(
			text,
			this.x - RenderLib.getStringWidth(text) / 2,
			y,
			0xffffffff
		);

		var greenColorDeselected = RenderLib.color(85, 255, 85, 100);
		var greenColorHovered = RenderLib.color(85, 255, 85, 150);
		var greenColorSelected = RenderLib.GREEN;

		var redColorDeselected = RenderLib.color(255, 85, 85, 100);
		var redColorHovered = RenderLib.color(255, 85, 85, 150);
		var redColorSelected = RenderLib.RED;

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
			RenderLib.drawRectangle(
				RenderLib.WHITE,
				this.x - (RenderLib.getStringWidth("Off") / 2) - 25,
				this.y + 19 - (9 / 2),
				RenderLib.getStringWidth("Off") + 12,
				21
			)
		} else {
			RenderLib.drawRectangle(
				RenderLib.WHITE,
				this.x - (RenderLib.getStringWidth("Off") / 2) + 15,
				this.y + 19 - (9 / 2),
				RenderLib.getStringWidth("Off") + 12,
				21
			)
		}

		RenderLib.drawRectangle(
			greenColor,
			this.x - (RenderLib.getStringWidth("Off") / 2) - 24,
			this.y + 20 - (9 / 2),
			RenderLib.getStringWidth("Off") + 10,
			19
		)

		RenderLib.drawStringWithShadow(
			"On",
			this.x - (RenderLib.getStringWidth("On") / 2) - 19,
			this.y + 20,
			0xffffffff
		)

		RenderLib.drawRectangle(
			redColor,
			this.x - (RenderLib.getStringWidth("Off") / 2) + 16,
			this.y + 20 - (9 / 2),
			RenderLib.getStringWidth("Off") + 10,
			19
		)

		RenderLib.drawStringWithShadow(
			"Off",
			this.x - (RenderLib.getStringWidth("Off") / 2) + 21,
			this.y + 20,
			0xffffffff
		)

	}

	this.hover = function() {
		var isHovered = false;

		var truex1 = this.x - (RenderLib.getStringWidth("Off") / 2) - 24;
		var truex2 = truex1 + RenderLib.getStringWidth("Off") + 10;
		var falsex1 = this.x - (RenderLib.getStringWidth("Off") / 2) + 16;
		var falsex2 = falsex1 + RenderLib.getStringWidth("Off") + 10;
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

    RenderLib.drawStringWithShadow(
      text,
      this.x - RenderLib.getStringWidth(text) / 2,
      y,
      0xffffffff
    );

    for (var i = 0; i < 16; i++) {
      RenderLib.drawRectangle(
        RenderLib.getColor(i),
        this.x - 160 + i * 20 + this.xOffsets[i] + Math.abs(this.xOffsets[i] / 2),
        this.y + 10 + Math.abs(this.zOffsets[i] / 2),
        30 - this.zOffsets[i],
        30 - this.zOffsets[i]
      );
    }

    for (var i = 0; i < 16; i++) {
      if (i == this.selected) {
        RenderLib.drawRectangle(RenderLib.WHITE, this.x - 162 + i * 20, this.y + 40, 34, 2);
        RenderLib.drawRectangle(RenderLib.WHITE, this.x - 162 + i * 20, this.y + 8, 2, 34);
        RenderLib.drawRectangle(RenderLib.WHITE, this.x - 162 + i * 20, this.y + 8, 34, 2);
        RenderLib.drawRectangle(RenderLib.WHITE, this.x - 130 + i * 20, this.y + 8, 2, 34);
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

		if (RenderLib.getStringWidth("eeeeeee") < RenderLib.getStringWidth(this.text)) {
			RenderLib.drawRectangle(
				buttonColor,
				this.x - (RenderLib.getStringWidth(this.text) / 2) - 5,
				this.y - (9 / 2),
				RenderLib.getStringWidth(this.text) + 10,
				19
			);
		} else {
			RenderLib.drawRectangle(
				buttonColor,
				this.x - (RenderLib.getStringWidth("eeeeeee") / 2) - 5,
				this.y - (9 / 2),
				RenderLib.getStringWidth("eeeeeee") + 10,
				19
			);
		}

		RenderLib.drawStringWithShadow(
			this.text,
			this.x - RenderLib.getStringWidth(text) / 2,
			y,
			this.textcolor
		);

	}

	this.hover = function() {
		this.hovered = false;

		var x1 = this.x - (RenderLib.getStringWidth(this.text) / 2) - 5;
		var x2 = x1 + RenderLib.getStringWidth(this.text) + 10;
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
