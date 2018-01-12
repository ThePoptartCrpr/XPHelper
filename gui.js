// I'm absolute trash at GUIs so credit for most of the base code goes to FalseHonesty and kerbybit

var xphGui = new Gui();
var xphScrolled = 0;

var xphTestSelector;

var titleString;
var titleWidth;

xphGui.registerClicked("xphGuiClicked");
TriggerRegister.registerStep("xphGuiStep");
xphGui.registerDraw("xphGuiDraw");

function xphOpenGui() {
	// xphTestSelector = new xphColorSelector("Test Selector", xphSettings.testVar);
	xphTestColorSelector = new xphColorSelector("Test Selector", xphSettings.testVar);
	xphDeliveryOpenToggle = new xphOnOffToggleSelector("Automatically open Delivery Man links", xphSettings.deliveryman.autoOpen);

	xphGui.open();
	ChatLib.chat(JSON.stringify(xphSettings));
}

function xphSaveSettings() {
  FileLib.write("XPHelper/Data", "settings.json", JSON.stringify(xphSettings));
}

function xphGuiClicked(mouseX, mouseY, button) {
	if (button == 0) {
		// xphTestSelector.click();
		xphTestColorSelector.click();
		xphDeliveryOpenToggle.click();
	}

	if (button == -1) {
		xphScrolled -= 10;
	} else if (button == -2) {
		xphScrolled += 10;
	}

	if (xphScrolled < 0) {
		xphScrolled = 0;
	}

	if (xphScrolled > 300 - RenderLib.getRenderHeight()) {
		xphScrolled = 300 - RenderLib.getRenderHeight();
	}
}

function xphGuiStep() {
  if (xphGui.isOpen()) {
    // xphTestSelector.update();
		xphTestColorSelector.update();
		xphDeliveryOpenToggle.update();
  }
}

function xphGuiDraw(mouseX, mouseY) {

  // setup
  if (RenderLib.getRenderHeight() > 300) {
	  xphScrolled = 0;
  }

  var y = 20 - ircScrolled;
  var x = RenderLib.getRenderWidth() / 2;

  titleString = "&aXP&bHelper";

  titleWidth = RenderLib.getStringWidth(ChatLib.removeFormatting(titleString));

  // draw background
  RenderLib.drawRectangle(0xa0000000, 0, 0, RenderLib.getRenderWidth(), RenderLib.getRenderHeight());

  // draw examples
  RenderLib.drawStringWithShadow(
	ChatLib.addColor(titleString),
	x - titleWidth / 2,
    y,
    0xffffffff
  );

	xphTestColorSelector.draw(x, y + 30, mouseX, mouseY);
	xphDeliveryOpenToggle.draw(x, y + 80, mouseX, mouseY);

  xphUpdateSettings();
}

function xphUpdateSettings() {
  var updateSettings = false;

  var getSetting = xphTestColorSelector.getSelected();
  if (xphSettings.testVar != getSetting) {
    xphSettings.testVar = getSetting;
    updateSettings = true;
  }

  if (updateSettings) {
    xphSaveSettings();
  }
}

// Selectors

function xphOnOffToggleSelector(text, variable) {
	this.text = text;

	this.x = 0;
	this.y = 0;
	this.mouseX = 0;
	this.mouseY = 0;

	this.hovered = -1;

	this.selected = variable;

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

		/*for (var i = 0; i < 2; i++) {
			RenderLib.drawRectangle(
				RenderLib.getColor(i),
				this.x - 160 + i * 20 + this.xOffsets[i] + Math.abs(this.xOffsets[i] / 2),
				this.y + 10 + Math.abs(this.zOffsets[i] / 2),
				30 - this.zOffsets[i],
				30 - this.zOffsets[i]
			);
		}

		for (var i = 0; i < 2; i++) {
			if (i == this.selected) {
				RenderLib.drawRectangle(RenderLib.WHITE, this.x - 162 + i * 20, this.y + 40, 34, 2);
				RenderLib.drawRectangle(RenderLib.WHITE, this.x - 162 + i * 20, this.y + 8, 2, 34);
				RenderLib.drawRectangle(RenderLib.WHITE, this.x - 162 + i * 20, this.y + 8, 34, 2);
				RenderLib.drawRectangle(RenderLib.WHITE, this.x - 130 + i * 20, this.y + 8, 2, 34);
			}
		}*/

		/*RenderLib.drawRectangle(
			RenderLib.LIME,
			this.x - 160 + 20,
			this.y + 10,
			30,
			30
		)*/

		if (this.selected = true) {
			RenderLib.drawRectangle(
				RenderLib.GREEN,
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
				RenderLib.color(255, 85, 85, 150),
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
		} else {
			RenderLib.drawRectangle(
				RenderLib.color(85, 255, 85, 150),
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
				RenderLib.RED,
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

	}

	this.hover = function() {
		/*var isHovered = false;
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
		}*/
	}

	this.click = function() {

	}

	this.getSelected = function() {
		return this.selected;
	}
}

function xphSliderSelector(text, variable, min, max) {

}

function xphIntIncrementSelector(text, variable, min, max) {

}

function xphColorSelector(text, variable) {
  this.text = text;

  this.x = 0;
  this.y = 0;
  this.mouseX = 0;
  this.mouseY = 0;

  this.hovered = -1;
  this.xOffsets = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.zOffsets = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  this.selected = parseInt("0x" + variable.replace("&", ""));

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
}

// Buttons

function xphButtonSelector(text, page) {

}

/*function xphSelector(text, selected) {
  this.text = text;

  this.x = 0;
  this.y = 0;
  this.mouseX = 0;
  this.mouseY = 0;

  this.hovered = -1;
  this.xOffsets = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.zOffsets = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  // this.selected = parseInt("0x" + selected.replace("&", ""));

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
    return this.selected;
  }
}*/

/*
function ircOpenGui() {
  ircBaseSelector = new ircColorSelector("Base Color", ircSettings.baseColor);
  ircMessageSelector = new ircColorSelector("Message Color", ircSettings.messageColor);
  ircMessageTextSelector = new ircColorSelector("Message Text color", ircSettings.messageTextColor);
  ircPmSelector = new ircColorSelector("PM Color", ircSettings.pmColor);
  ircPmTextSelector = new ircColorSelector("PM Text Color", ircSettings.pmTextColor);

  ircGui.open();
}

function ircSaveSettings() {
  FileLib.write("irc", "settings.json", JSON.stringify(ircSettings));
}

ircGui.registerClicked("ircGuiClicked");
function ircGuiClicked(mouseX, mouseY, button) {
  if (button == 0) {
    ircBaseSelector.click();
    ircMessageSelector.click();
    ircMessageTextSelector.click();
    ircPmSelector.click();
    ircPmTextSelector.click();
  }

  if (button == -1) {
    ircScrolled -= 10;
  } else if (button == -2) {
    ircScrolled += 10;
  }

  if (ircScrolled < 0) {
    ircScrolled = 0;
  }
  if (ircScrolled > 300 - RenderLib.getRenderHeight()) {
    ircScrolled = 300 - RenderLib.getRenderHeight();
  }
}

TriggerRegister.registerStep("ircStep");
function ircStep() {
  if (ircGui.isOpen()) {
    ircBaseSelector.update();
    ircMessageSelector.update();
    ircMessageTextSelector.update();
    ircPmSelector.update();
    ircPmTextSelector.update();
  }
}

ircGui.registerDraw("ircGuiDraw");
function ircGuiDraw(mouseX, mouseY) {
  // setup
  if (RenderLib.getRenderHeight() > 300) {ircScrolled = 0;}
  var y = 20 - ircScrolled;
  var x = RenderLib.getRenderWidth() / 2;

  var exampleNormal;

  if (ircSettings.messageStyle == 0) {
    exampleNormal = ircSettings.baseColor + "[IRC] "
              + ircSettings.messageColor + "<User> "
              + ircSettings.messageTextColor + "I really like irc";
  } else if (ircSettings.messageStyle == 1) {
    exampleNormal = ircSettings.baseColor + "[IRC] "
              + ircSettings.messageColor + "User: "
              + ircSettings.messageTextColor + "I really like irc";
  }


  var exampleNormalWidth = RenderLib.getStringWidth(ChatLib.removeFormatting(exampleNormal));

  var examplePm;

  if (ircSettings.pmStyle == 0) {
    examplePm = ircSettings.baseColor + "[IRC] "
              + ircSettings.messageColor + "<"
              + ircSettings.pmColor + "PM "
              + ircSettings.messageColor + "from user> "
              + ircSettings.pmTextColor + "I secretly don't like irc";
  } else if (ircSettings.pmStyle == 1) {
    examplePm = ircSettings.baseColor + "[IRC] "
              + ircSettings.pmColor + "PM"
              + ircSettings.messageColor + " > User: "
              + ircSettings.pmTextColor + "I secretly don't like irc";
  }


  var examplePmWidth = RenderLib.getStringWidth(ChatLib.removeFormatting(examplePm));

  // draw background
  RenderLib.drawRectangle(0xa0000000, 0, 0, RenderLib.getRenderWidth(), RenderLib.getRenderHeight());

  // draw examples
  RenderLib.drawStringWithShadow(
    ChatLib.addColor(exampleNormal),
    x - exampleNormalWidth / 2,
    y,
    0xffffffff
  );
  RenderLib.drawStringWithShadow(
    ChatLib.addColor(examplePm),
    x - examplePmWidth / 2,
    y + 10,
    0xffffffff
  );

  ircBaseSelector.draw(x, y + 30, mouseX, mouseY);
  ircMessageSelector.draw(x, y + 80, mouseX, mouseY);
  ircMessageTextSelector.draw(x, y + 130, mouseX, mouseY);
  ircPmSelector.draw(x, y + 180, mouseX, mouseY);
  ircPmTextSelector.draw(x, y + 230, mouseX, mouseY);

  ircUpdateSettings();
}

function ircUpdateSettings() {
  var updateSettings = false;

  var getSetting = ircBaseSelector.getSelected();
  if (ircSettings.baseColor != getSetting) {
    ircSettings.baseColor = getSetting;
    updateSettings = true
  }

  getSetting = ircMessageSelector.getSelected();
  if (ircSettings.messageColor != getSetting) {
    ircSettings.messageColor = getSetting;
    updateSettings = true;
  }

  getSetting = ircMessageTextSelector.getSelected();
  if (ircSettings.messageTextColor != getSetting) {
    ircSettings.messageTextColor = getSetting;
    updateSettings = true;
  }

  getSetting = ircPmSelector.getSelected();
  if (ircSettings.pmColor != getSetting) {
    ircSettings.pmColor = getSetting;
    updateSettings = true;
  }

  getSetting = ircPmTextSelector.getSelected();
  if (ircSettings.pmTextColor != getSetting) {
    ircSettings.pmTextColor = getSetting;
    updateSettings = true;
  }

  if (updateSettings) {
    ircSaveSettings();
  }
}

function ircColorSelector(text, selected) {
  this.text = text;

  this.x = 0;
  this.y = 0;
  this.mouseX = 0;
  this.mouseY = 0;

  this.hovered = -1;
  this.xOffsets = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.zOffsets = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  this.selected = parseInt("0x" + selected.replace("&", ""));

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
}
*/
