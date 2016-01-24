

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

console.log("args: " + process.argv.slice(2));


app.on("window-all-closed", function() {
	if(process.platform != "darwin") {
		app.quit();
	}
});

app.on("ready", function() {
	mainWindow = new BrowserWindow({width: 1080, height: 600});
	mainWindow.loadURL("file://" + __dirname + "/index_standalone.html");

	// mainWindow.webContents.openDevTools();

	mainWindow.on("closed", function() {
		mainWindow = null;
	});
});