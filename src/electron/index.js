const { app, BrowserWindow } = require('electron');
const is = require('electron-is');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
  });

  if (is.dev()) win.loadURL('http://localhost:8100');
  else win.loadFile('./dist/index.html');
}

app.whenReady().then(() => {
  createWindow();

  console.log('electron has started');

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
