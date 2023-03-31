import { app, BrowserWindow, globalShortcut, ipcMain, powerMonitor, Tray } from 'electron';
import { AppWindow } from './services/app/appWindow';
import { TrayService } from './services/tray';
import { addData, Data, getAlldata } from './services/store/store';
const isDev = process.env.NODE_ENV === 'development';

let trayService = new TrayService();
let appWindow = new AppWindow();

// 二重起動の防止
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
}

app.once('ready', async () => {
  appWindow.createAppWindow();
  trayService.createTray();

  if (process.platform !== 'win32') {
    powerMonitor.once('shutdown', () => {
      app.quit();
    });
  }
});

app.on('browser-window-blur', () => {});

app.once('window-all-closed', () => {
  globalShortcut.unregisterAll();
  app.quit();
});

process.once('exit', () => {
  globalShortcut.unregisterAll();
  app.quit();
});

// IPC通信
// ipcMain.handle('', event => {
//   return
// });
