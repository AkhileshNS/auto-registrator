const { app, BrowserWindow } = require("electron"); // eslint-disable-line

function createWindow() {
  win = new BrowserWindow({
    width: 1366,
    height: 768,
    show: false
  });

  win.loadURL("http://202.129.209.50/ug_ie");

  win.once("ready-to-show", () => {
    win.show();
  });

  win.on("closed", () => {
    app.quit();
  });
}

app.on("ready", () => {
  createWindow();
});
