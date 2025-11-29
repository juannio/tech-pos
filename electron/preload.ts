import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  send: (channel: string, data: unknown) => {
    ipcRenderer.send(channel, data);
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (event, ...args) => callback(...args));
  },
});
