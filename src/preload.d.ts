export interface IElectronAPI {
  send: (channel: string, data: any) => void;
  receive: (channel: string, func: (...args: any[]) => void) => void;
}

declare global {
  interface Window {
    api: IElectronAPI
  }
} 