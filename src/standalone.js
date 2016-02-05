

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on("window-all-closed", function() {
		app.quit();
});



app.on("ready", function() {
	mainWindow = new BrowserWindow({
        width: 1080, 
        height: 600,
        icon: __dirname + "/icons/glc_icon.png"
    });
	mainWindow.loadURL("file://" + __dirname + "/index_standalone.html");

	// mainWindow.webContents.openDevTools();

	mainWindow.on("closed", function() {
		mainWindow = null;
	});

	if(process.platform === "darwin") {
		var Menu = electron.Menu;
		console.log("Menu: " + Menu);

		var template = [{
			label: "Application",
			submenu: [
				{ label: "About Application", selector: "orderFrontStandardAboutPanel:" },
				{ type: "separator" },
				{ label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
			]}, {
			label: "Edit",
			submenu: [
				{ label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
				{ label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
				{ type: "separator" },
				{ label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
				{ label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
				{ label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
				{ label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
			]}
		];

	  var menu = Menu.buildFromTemplate(template);
	  Menu.setApplicationMenu(menu);

	}


});