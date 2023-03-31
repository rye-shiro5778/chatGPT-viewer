import { app, screen } from 'electron';
import Store from 'electron-store';

type WindowConfig = {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
};

export class WindowConfigStore {
  constructor() {
    this.store = new Store<WindowConfig>({
      cwd: app.getPath('userData'),
      name: 'windowConfig',
      fileExtension: 'json',
    });
  }

  private store: Store<WindowConfig>;

  private defaultWidth = 300;
  private defaultHeight = 450;

  public getWindowConfig() {
    const { x, y } = this.getCenterPosition();
    return {
      width: this.store.get('width') || this.defaultWidth,
      height: this.store.get('height') || this.defaultHeight,
      x: this.store.get('x') || x,
      y: this.store.get('y') || y,
    };
  }

  public setWindowConfig({ width, height, x, y }: WindowConfig) {
    this.store.set('width', width);
    this.store.set('height', height);
    this.store.set('x', x);
    this.store.set('y', y);
  }

  private getCenterPosition() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const x = Math.floor((width - this.defaultWidth) / 2);
    const y = Math.floor((height - this.defaultHeight) / 2);
    return { x, y };
  }
}
