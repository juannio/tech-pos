export interface IElectronAPI {
  send: (channel: string, data: unknown) => void;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  on: (channel: string, callback: Function) => void;
}

declare global {
  interface Window {
    electron: IElectronAPI;
  }
}
