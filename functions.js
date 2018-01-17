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
		for (x in json) {
			for (x2 in json[x]) {
				for (y in tempSettings) {
		      for (y2 in tempSettings[y]) {
		        //Debug: print("x: " + x + " = " + json[x] + "   Y: " + y + " = " + tempSettings[y])
		        if (x2 == y2) {
		          json[x][x2] = tempSettings[y][y2];
							// ChatLib.chat(JSON.stringify(json[a]) + " ");
		          break;
		        }
		      }
				}
	    }
		}
		/*for (x in json) {
			for (x2 in x) {
				for (e in tempSettings) {
					ChatLib.chat(JSON.stringify(json[x][x2]));
				}
			}
		}*/
  //////////////////////////////////////////////////////////////////
  }
  return json;
}

function xphLoadSettings1D(json, fileLocation, fileName) {
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
    for (x in json) {
      for (y in tempSettings) {
        //Debug: print("x: " + x + " = " + json[x] + "   Y: " + y + " = " + tempSettings[y])
        if (x == y) {
          json[x] = tempSettings[y];
          //Debug: print("Works: new json[x] = " + json[x]);
          break;
        }

      }
    }
  //////////////////////////////////////////////////////////////////
  }
  return json;
}
