import { BrowserWindow, globalShortcut } from 'electron';
import path from 'path';
import { WindowConfigStore } from '../store/windowConfigStore';
import localShortcut from 'electron-localshortcut';

export class AppWindow {
  constructor() {}
  browserWindow: BrowserWindow | undefined;

  private loadUrl = 'https://chat.openai.com/chat';

  public createAppWindow = () => {
    const windowConfigStore = new WindowConfigStore();
    const { width, height, x, y } = windowConfigStore.getWindowConfig();

    const appWindow = new BrowserWindow({
      width: width,
      height: height,
      x: x,
      y: y,
      frame: true,
      alwaysOnTop: true,
      movable: true,
      webPreferences: {
        preload: path.resolve(__dirname, 'preload.js'),
      },
    });

    appWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
    appWindow.loadURL(this.loadUrl);

    appWindow.on('close', () => {
      const [width, height] = appWindow.getSize();
      const [x, y] = appWindow.getPosition();
      windowConfigStore.setWindowConfig({
        width,
        height,
        x,
        y,
      });
    });

    this.registerGlobalShortcut(appWindow);
    this.registerLocalShortcut(appWindow);

    return appWindow;
  };

  private registerGlobalShortcut(window: BrowserWindow) {
    globalShortcut.register('CommandOrControl+Shift+F', () => {
      if (window.isVisible()) {
        window.hide();
      } else {
        window.show();
        window.focus();
      }
    });
  }

  private registerLocalShortcut(window: BrowserWindow) {
    localShortcut.register(window, 'CommandOrControl+Enter', async () => {
      const webContents = window.webContents;
      try {
        await webContents.executeJavaScript(`
            (function() {
              const button = document.querySelector("textarea + button");
              if (button) {
                button.click();
              }
            })();
          `);
      } catch (error) {
        console.error('Error executing script:', error);
      }
    });
  }
}
