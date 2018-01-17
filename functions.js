var xphBreak;

function br() {
	if (!arguments[0]) {
		return ChatLib.getChatBreak("-");
	} else {
		return ChatLib.getChatBreak(arguments[0]);
	}
}

function xphCenter(text) {
	return ChatLib.getCenteredText(text);
}

function xphChat(text) {
	if (!arguments[0]) {
		return ChatLib.chat("");
	}
	return ChatLib.chat(text);
}

//Settings Tools - Written by SylentButDedly

function xphSaveSettings(json, fileLocaton, fileName) {
  /***
  json: the settings json you want saved.
  fileLocation: the folder in which the file will be saved to.
  fileName: the name of the file, must also include ".json" at the end.

  Usage:
  saveSettings(yourSettings, folderName, fileName);
  ***/
  FileLib.write(fileLocation, fileName, JSON.stringify(json));
}

function xphLoadSettings(json, fileLocation, fileName) {
  /***
  json: the settings json you want saved.
  fileLocation: the folder in which the file will be saved to.
  fileName: the name of the file, must also include ".json" at the end.

  Usage:
  yourSettings = loadSettings(yourSettings, folderName, fileName);
  ***/
  var tempSettings = JSON.parse(FileLib.read(fileLocation, fileName));

  if (tempSettings != null && tempSettings != "" && tempSettings != undefined) {
  //////////////////////////////////////////////////////////////////
		for (a in json) {
			for (x in a) {
				for (e in tempSettings) {
		      for (y in e) {
		        //Debug: print("x: " + x + " = " + json[x] + "   Y: " + y + " = " + tempSettings[y])
		        if (x == y) {
		          json[a][x] = tempSettings[e][y];
		          //Debug: print("Works: new json[x] = " + json[x]);
		          break;
		        }
		      }
				}
	    }
		}
  //////////////////////////////////////////////////////////////////
  }
  return json;
}
