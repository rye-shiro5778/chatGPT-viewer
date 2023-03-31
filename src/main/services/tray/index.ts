import { Menu, shell, Tray } from 'electron';
import { BrowserWindow } from 'electron/main';
import { iconPath, sourceUrl } from '../../constant';

export class TrayService {
  tray: Tray | undefined = undefined;

  public createTray() {
    this.tray = new Tray(iconPath);
    this.tray.setContextMenu(
      Menu.buildFromTemplate([
        {
          type: 'separator',
        },
        {
          label: 'Github',
          click: () => shell.openExternal(sourceUrl),
        },
        {
          label: 'Exit',
          role: 'quit',
        },
      ]),
    );
  }
}
