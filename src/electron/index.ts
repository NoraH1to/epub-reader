import { app, BrowserWindow } from 'electron';
import is from 'electron-is';
import KoaService from './services';
import webDAVService from './services/webDAV';
import validate from './middleware/validate';

const KoaServiceInstance = new KoaService();
KoaServiceInstance.koaApp.use(validate());
KoaServiceInstance.useRouter(webDAVService);

function createWindow() {
  const reader = new BrowserWindow({
    width: 1440,
    height: 900,
  });
  if (is.dev()) reader.loadURL('http://localhost:8100');
  else reader.loadURL('http://localhost:8989');
  KoaServiceInstance.windows.push(reader);

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
  KoaServiceInstance.windows.push(bookList);
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
