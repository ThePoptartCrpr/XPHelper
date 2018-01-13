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
	// xphTestColorSelector = new xphColorSelector("Test Selector", xphSettings.testVar);
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
		// xphTestColorSelector.click();
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
		// xphTestColorSelector.update();
		xphDeliveryOpenToggle.update();
  }
}

function xphGuiDraw(mouseX, mouseY) {

  // setup
  if (RenderLib.getRenderHeight() > 300) {
	  xphScrolled = 0;
  }

  var y = 20 - xphScrolled;
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

	// xphTestColorSelector.draw(x, y + 30, mouseX, mouseY);
	xphDeliveryOpenToggle.draw(x, y + 30, mouseX, mouseY);

  xphUpdateSettings();
}

function xphUpdateSettings() {
  var updateSettings = false;

  /*var getSetting = xphTestColorSelector.getSelected();
  if (xphSettings.testVar != getSetting) {
    xphSettings.testVar = getSetting;
    updateSettings = true;
  }*/

	var getSetting = xphDeliveryOpenToggle.getSelected();
	if (xphSettings.deliveryman.autoOpen != getSetting) {
		xphSettings.deliveryman.autoOpen = getSetting;
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
	this.selected = JSON.parse(JSON.stringify(variable));

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
