import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  //sample: // getAllData: async () => await ipcRenderer.invoke('getAllData'),
  on: (channel: string, callback: (event: any) => void) => ipcRenderer.on(channel, (event: any) => callback(event)),
});
