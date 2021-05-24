import { app, BrowserWindow } from 'electron';
import is from 'electron-is';
import Koa from 'koa';
import history from 'koa2-connect-history-api-fallback';
import serve from 'koa-static';
import path from 'path';

const koaApp = new Koa();
koaApp.use(history({ index: 'index.html' }));
koaApp.use(serve(path.resolve(__dirname, '../dist')));
koaApp.listen(8989);

function createWindow() {
  const reader = new BrowserWindow({
    width: 1440,
    height: 900,
  });
  if (is.dev()) reader.loadURL('http://localhost:8100');
  else reader.loadURL('http://localhost:8989');

  const bookList = new BrowserWindow({
    width: 1440,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  if (is.dev()) bookList.loadURL('http://localhost:8100/bookList');
  else bookList.loadURL('http://localhost:8989/bookList');
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
